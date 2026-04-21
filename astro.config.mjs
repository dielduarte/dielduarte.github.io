import { defineConfig } from 'astro/config';
import slugify from 'slugify';

import tailwind from "@astrojs/tailwind";
import generateOgImages from './src/integrations/generate-og-images.js';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    generateOgImages({
      filterRoutes: (route) => route.component.endsWith('.md'),
      getImagePath: (attributes, options) => ({
        url: `./${slugify(attributes.slug.replace('/', '-'))}.png`,
        base: options.dir + 'images/',
      }),
    }),
  ],
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
