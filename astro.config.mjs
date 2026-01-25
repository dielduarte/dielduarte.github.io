import { defineConfig } from 'astro/config';
import slugify from 'slugify';

import tailwind from "@astrojs/tailwind";
import generateOgImages from './src/integrations/generate-og-images'
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react(),tailwind(), generateOgImages({
    filterRoutes: (route) => route.component.endsWith('.md'),
    getImagePath: (attributes, options) => ({
      url: `./${slugify(attributes.slug.replace('/', '-'))}.png`,
      base: options.dir + 'images/'
    }),
    getSatoriConfig: ({title}) => {
      //@TODO make it an option
      const robotoArrayBuffer = fs.readFileSync('./public/PressStart2P-Regular.ttf')

      return {
        content: {
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
        options:{
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
        }
      }
    }
  })],
  site: 'https://dielduarte.dev',
  trailingSlash: 'always',
  build: {
    assets: '_astro',
  },
  redirects: {
    '/blog': '/',
  },
  compressHTML: true,
  markdown: {
    gfm: false,
    smartypants: false,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord',
    }
  }
});