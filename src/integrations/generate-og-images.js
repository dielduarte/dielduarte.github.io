import fs from 'node:fs';
import path from 'node:path';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter';
import puppeteer from 'puppeteer';

const GEIST = path.resolve(
  'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2',
);
const GEIST_MONO = path.resolve(
  'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2',
);

function toDataUrl(file) {
  const buf = fs.readFileSync(file);
  return `data:font/woff2;base64,${buf.toString('base64')}`;
}

function nodeLabel(componentPath) {
  return componentPath.includes('/case-studies/') ? 'cases' : 'writing';
}

function escape(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml({ title, node, geistData, monoData }) {
  const label = `the ${node} node · dielduarte.dev`;
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: 'Geist';
    src: url('${geistData}') format('woff2-variations');
    font-weight: 100 900;
    font-display: block;
  }
  @font-face {
    font-family: 'Geist Mono';
    src: url('${monoData}') format('woff2-variations');
    font-weight: 100 900;
    font-display: block;
  }
  html, body { margin: 0; padding: 0; background: #0A0A0A; }
  body {
    width: 1200px;
    height: 630px;
    font-family: 'Geist', -apple-system, sans-serif;
    color: #F5F5F5;
    position: relative;
    overflow: hidden;
  }
  .frame {
    position: absolute;
    inset: 0;
    padding: 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .mono-note {
    font-family: 'Geist Mono', monospace;
    font-size: 17px;
    font-weight: 500;
    color: #3B82F6;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .title {
    font-size: 78px;
    line-height: 1.02;
    font-weight: 600;
    letter-spacing: -0.035em;
    color: #F5F5F5;
    margin: 0;
    max-width: 1000px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    padding: 56px 0;
  }
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .author {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: 'Geist Mono', monospace;
    font-size: 18px;
    font-weight: 500;
    color: #8A8A8A;
    letter-spacing: 0.04em;
  }
  .author .dash {
    width: 28px;
    height: 1px;
    background: #2A2A2A;
    display: inline-block;
  }
  .domain {
    font-family: 'Geist Mono', monospace;
    font-size: 15px;
    color: #555555;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  svg .edge { stroke: #2A2A2A; stroke-width: 1; fill: none; }
  svg .edge.lit { stroke: #3B82F6; stroke-width: 1.5; }
  svg .dot { fill: #0A0A0A; stroke: #2A2A2A; stroke-width: 1.5; }
  svg .dot.active { fill: #3B82F6; stroke: #3B82F6; }
  svg .label {
    font-family: 'Geist Mono', monospace;
    font-size: 11px;
    fill: #8A8A8A;
    letter-spacing: 0.02em;
  }
  svg .label.active { fill: #3B82F6; }
</style>
</head>
<body>
  <div class="frame">
    <div class="top">
      <div class="mono-note">${escape(label)}</div>
      <svg width="220" height="100" viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
        <line class="edge ${node === 'writing' ? 'lit' : ''}" x1="22" y1="50" x2="116" y2="16" />
        <line class="edge ${node === 'cases' ? 'lit' : ''}" x1="22" y1="50" x2="116" y2="50" />
        <line class="edge" x1="22" y1="50" x2="116" y2="84" />
        <circle class="dot" cx="16" cy="50" r="5" />
        <circle class="dot ${node === 'writing' ? 'active' : ''}" cx="122" cy="16" r="5" />
        <circle class="dot ${node === 'cases' ? 'active' : ''}" cx="122" cy="50" r="5" />
        <circle class="dot" cx="122" cy="84" r="5" />
        <text class="label" x="16" y="70" text-anchor="middle">home</text>
        <text class="label ${node === 'writing' ? 'active' : ''}" x="134" y="20" text-anchor="start">writing</text>
        <text class="label ${node === 'cases' ? 'active' : ''}" x="134" y="54" text-anchor="start">cases</text>
        <text class="label" x="134" y="88" text-anchor="start">about</text>
      </svg>
    </div>

    <div class="body">
      <h1 class="title">${escape(title)}</h1>
    </div>

    <div class="foot">
      <div class="author"><span class="dash"></span>Diel Duarte</div>
      <div class="domain">dielduarte.dev</div>
    </div>
  </div>
</body>
</html>`;
}

export default ({ filterRoutes, getImagePath }) => ({
  name: 'generate-og-images',
  hooks: {
    'astro:build:done': async (options) => {
      const articles = options.routes.filter(filterRoutes);
      if (articles.length === 0) return;

      const geistData = toDataUrl(GEIST);
      const monoData = toDataUrl(GEIST_MONO);

      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      try {
        for (const article of articles) {
          const raw = fs.readFileSync(article.component, 'utf-8');
          const { attributes } = fm(raw);

          const { url, base } = getImagePath(attributes, options);
          const filePath = fileURLToPath(new URL(url, base));
          await mkdir(path.dirname(filePath), { recursive: true });

          const html = buildHtml({
            title: attributes.title ?? '',
            node: nodeLabel(article.component),
            geistData,
            monoData,
          });

          const page = await browser.newPage();
          await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
          await page.setContent(html, { waitUntil: 'networkidle0' });
          const png = await page.screenshot({ type: 'png', omitBackground: false });
          await page.close();

          await writeFile(filePath, png);
        }
      } finally {
        await browser.close();
      }
    },
  },
});
