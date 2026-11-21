import fs from 'node:fs';
import path from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

function resolveChromeExecutable() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  if (process.platform === 'darwin') {
    const systemChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    if (fs.existsSync(systemChrome)) return systemChrome;
  }
  return undefined;
}

const BRICOLAGE = path.resolve(
  'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2',
);
const PORTRAIT = path.resolve('public/images/diel.jpeg');

function escape(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Same four inks as the portrait on the site, so the card matches the page it links to.
async function posterizedPortrait() {
  const inks = [
    [0.3, [0, 0, 0]],
    [0.56, [255, 196, 0]],
    [0.82, [30, 59, 216]],
    [Infinity, [236, 236, 231]],
  ];
  const { data, info } = await sharp(PORTRAIT)
    .resize(600, 760, { fit: 'cover' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const lum = (0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]) / 255;
    const [, rgb] = inks.find(([max]) => lum < max);
    [data[i], data[i + 1], data[i + 2]] = rgb;
  }
  const png = await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toBuffer();
  return `data:image/png;base64,${png.toString('base64')}`;
}

function headlineHtml(headline, highlight) {
  const key = (w) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  return headline
    .split(' ')
    .map((word) => (highlight && key(word) === key(highlight) ? `<span class="hl">${escape(word)}</span>` : escape(word)))
    .join(' ');
}

function buildHtml({ kicker, headline, highlight, fontData, portraitData }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Bricolage';
    src: url('${fontData}') format('woff2-variations');
    font-weight: 200 800;
    font-stretch: 75% 100%;
    font-display: block;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
    position: relative;
    background: #ECECE7;
    color: #000;
    font-family: 'Bricolage', sans-serif;
  }
  /* 12-column hairlines, same grid as the site */
  .lines {
    position: absolute;
    inset: 0 40px;
    border-right: 1px solid rgba(0, 0, 0, 0.18);
    background: repeating-linear-gradient(to right, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px calc(100% / 12));
  }
  .page {
    position: absolute;
    inset: 0 40px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr 72px;
  }
  .main {
    grid-column: 1 / 11;
    padding: 56px 12px 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    overflow: hidden;
  }
  .kicker { font-size: 26px; color: rgba(0, 0, 0, 0.6); }
  .headline {
    font-weight: 700;
    font-stretch: 75%;
    line-height: 0.92;
    letter-spacing: -0.01em;
  }
  .hl { background: #FFC400; padding: 0 0.06em; }
  .portrait {
    grid-column: 11 / 13;
    grid-row: 1 / 3;
    background: #1E3BD8 url('${portraitData}') center / cover no-repeat;
  }
  .foot {
    grid-column: 1 / 11;
    grid-row: 2;
    border-top: 1px solid rgba(0, 0, 0, 0.18);
    padding: 24px 12px;
    font-size: 17px;
  }
</style>
</head>
<body>
  <div class="lines"></div>
  <div class="page">
    <div class="main">
      <p class="kicker">${escape(kicker)}</p>
      <h1 class="headline">${headlineHtml(headline, highlight)}</h1>
    </div>
    <div class="portrait"></div>
    <div class="foot">dielduarte.dev</div>
  </div>
  <script>
    // Largest headline that still fits: short page headlines go big, long post titles shrink.
    document.fonts.ready.then(() => {
      const main = document.querySelector('.main');
      const headline = document.querySelector('.headline');
      let size = 150;
      headline.style.fontSize = size + 'px';
      while (size > 40 && (main.scrollHeight > main.clientHeight || headline.scrollWidth > headline.clientWidth)) {
        size -= 4;
        headline.style.fontSize = size + 'px';
      }
      document.body.dataset.ready = 'true';
    });
  </script>
</body>
</html>`;
}

async function render(browser, html, filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForSelector('body[data-ready]');
  await writeFile(filePath, await page.screenshot({ type: 'png' }));
  await page.close();
}

/**
 * Renders a share image for every markdown post (from its frontmatter) and for each
 * top-level page in `pages`, in both languages.
 */
export default ({ filterRoutes, getImagePath, pages = [], pagePath }) => ({
  name: 'generate-og-images',
  hooks: {
    'astro:build:done': async (options) => {
      const articles = options.routes.filter(filterRoutes);
      const fontData = `data:font/woff2;base64,${fs.readFileSync(BRICOLAGE).toString('base64')}`;
      const portraitData = await posterizedPortrait();
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: resolveChromeExecutable(),
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const card = (fields) => buildHtml({ ...fields, fontData, portraitData });

      try {
        for (const article of articles) {
          const { attributes } = fm(fs.readFileSync(article.component, 'utf-8'));
          const lang = attributes.languageKey === 'pt-br' ? 'pt-br' : 'en';
          const { url, base } = getImagePath(attributes, options);
          await render(
            browser,
            card({
              kicker: lang === 'en' ? 'Writing' : 'Textos',
              headline: attributes.title ?? '',
            }),
            fileURLToPath(new URL(url, base)),
          );
        }

        for (const page of pages) {
          for (const lang of ['en', 'pt-br']) {
            await render(
              browser,
              card(page.copy[lang]),
              fileURLToPath(new URL(pagePath(page.key, lang), options.dir)),
            );
          }
        }
      } finally {
        await browser.close();
      }
    },
  },
});
