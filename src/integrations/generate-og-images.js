import satori from 'satori';
import fs from 'node:fs';
import worker from 'node:worker_threads';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import fm from 'front-matter'
import svg2png from "svg2png"

export default ({getSatoriConfig, filterRoutes, getImagePath}) => ({
  name: 'generate-og-images',
  hooks: {
    'astro:build:done': async (options) => {
      const articles = options.routes.filter(filterRoutes)

      await Promise.all(articles.map((article) => {
        return new Promise(async (resolve) => {
          const content = fs.readFileSync(article.component, 'utf-8')
          const {attributes} = fm(content)
          const config = getSatoriConfig(attributes)

          const svg = await satori(config.content, config.options)
          const img = await svg2png.sync(svg)
          const {url, base} = getImagePath(attributes, options)
          const filePath = fileURLToPath(new URL(url, base));
          await writeFile(filePath, img);
          resolve()
        })
      }))
    }
  }
})