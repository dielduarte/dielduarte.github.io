import satori from 'satori';
import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter'
import svg2png from "svg2png"
import slugify from 'slugify';

export default () => ({
  name: 'generate-og-images',
  hooks: {
    'astro:build:done': async (options) => {
      // TODO make it an option
      const articles = options.routes.filter((route) => route.component.endsWith('.md'))

      
      //@TODO make it an option
      const robotoArrayBuffer = fs.readFileSync('./public/PressStart2P-Regular.ttf')

      const getSvg = (title) => satori(
        {
          type: 'div',
              props: {
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      alignItems: 'center',
                    },
                    children: [
                      {
                        type: 'p',
                        props: {
                          style: { fontSize: 24 },
                          children: 'Diel Duarte',
                        },
                      },
                      {
                        type: 'p',
                        props: {
                          style: { fontSize: 30, lineHeight: 1.5 },
                          children: title,
                        },
                      },
                    ],
                  },
                },
              ],
              style: {
                background: 'black',
                width: '100%',
                height: '100%',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'white',
                backgroundSize: '100px 100px',
                padding: '30px'
              },
            },
        },
        {
          width: 1200,
          height: 600,
          fonts: [
            {
              name: 'pressStart',
              data: robotoArrayBuffer,
              weight: 400,
              style: 'normal',
            },
          ],
        },
      )

      for (const article of articles) {
        const content = fs.readFileSync(article.component, 'utf-8')
        const {attributes} = fm(content)

        const svg = await getSvg(attributes.title)
        const img = await svg2png.sync(svg)
        // TODO make it an option
        const outFile = fileURLToPath(new URL(`./${slugify(attributes.slug.replace('/', '-'))}.png`, options.dir + 'images/'));
        await writeFile(outFile, img);
      }
    }
  }
})