import type { Lang } from '../components/nav/navMachine.ts';

interface Alternate {
  hreflang: Lang | 'x-default';
  href: string;
}

export function alternateLinks({
  lang,
  pathname,
  langSwitchHref,
  site,
}: {
  lang: Lang;
  pathname: string;
  langSwitchHref: string;
  site: string | URL;
}): Alternate[] {
  const self = new URL(pathname, site).href;
  const other = new URL(langSwitchHref, site).href;
  const english = lang === 'en' ? self : other;
  return [
    { hreflang: lang, href: self },
    { hreflang: lang === 'en' ? 'pt-br' : 'en', href: other },
    { hreflang: 'x-default', href: english },
  ];
}
