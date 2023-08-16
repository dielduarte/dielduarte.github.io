import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import generateOgImages from './src/integrations/generate-og-images'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), generateOgImages()],
  site: 'https://dielduarte.dev',
  redirects: {
    '/': '/blog/en',
    '/blog': '/blog/en',
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