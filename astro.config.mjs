import { defineConfig } from 'astro/config';
import slugify from 'slugify';

import tailwind from "@astrojs/tailwind";
import generateOgImages from './src/integrations/generate-og-images.js';
import react from '@astrojs/react';
import codeTheme from './src/styles/code-theme.mjs';
import { OG_PAGES, ogImagePath } from './src/lib/og-pages.mjs';

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
      pages: OG_PAGES,
      pagePath: ogImagePath,
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
      theme: codeTheme,
    }
  }
});
