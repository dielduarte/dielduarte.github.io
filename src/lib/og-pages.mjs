// Share-card copy for the top-level pages. Plain .mjs so both astro.config (which renders
// the images at build time) and the pages (which link to them) can import it.

/** @typedef {'en' | 'pt-br'} Lang */
/** @typedef {{ kicker: string, headline: string, highlight?: string }} CardCopy */
/** @typedef {{ key: string, copy: Record<Lang, CardCopy> }} OgPage */

/** @type {OgPage[]} */
export const OG_PAGES = [
  {
    key: 'home',
    copy: {
      en: { kicker: 'Software engineer, devtools at Resend', headline: 'I build web software', highlight: 'web' },
      'pt-br': { kicker: 'Engenheiro de software, devtools na Resend', headline: 'Eu construo software para a web', highlight: 'web' },
    },
  },
  {
    key: 'writing',
    copy: {
      en: { kicker: 'Writing', headline: 'I write about web software', highlight: 'write' },
      'pt-br': { kicker: 'Textos', headline: 'Eu escrevo sobre software para a web', highlight: 'escrevo' },
    },
  },
  {
    key: 'photos',
    copy: {
      en: { kicker: 'Photos', headline: "I'm learning street photography", highlight: 'street' },
      'pt-br': { kicker: 'Fotos', headline: 'Estou aprendendo fotografia de rua', highlight: 'rua' },
    },
  },
  {
    key: 'about',
    copy: {
      en: { kicker: 'About', headline: 'I live in Belo Horizonte', highlight: 'Horizonte' },
      'pt-br': { kicker: 'Sobre', headline: 'Eu moro em Belo Horizonte', highlight: 'Horizonte' },
    },
  },
  {
    key: 'contact',
    copy: {
      en: { kicker: 'Contact', headline: 'Email me about anything', highlight: 'Email' },
      'pt-br': { kicker: 'Contato', headline: 'Me escreva sobre qualquer coisa', highlight: 'escreva' },
    },
  },
];

/** Site-relative path of a page's share image, e.g. images/og/home-en.png */
export const ogImagePath = (/** @type {string} */ key, /** @type {Lang} */ lang) => `images/og/${key}-${lang}.png`;
