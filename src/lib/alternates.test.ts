import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alternateLinks } from './alternates.ts';

const site = 'https://dielduarte.dev';

test('an english page links itself, its translation and the english default, all absolute', () => {
  assert.deepEqual(alternateLinks({ lang: 'en', pathname: '/about/en/', langSwitchHref: '/about/pt-br/', site }), [
    { hreflang: 'en', href: 'https://dielduarte.dev/about/en/' },
    { hreflang: 'pt-br', href: 'https://dielduarte.dev/about/pt-br/' },
    { hreflang: 'x-default', href: 'https://dielduarte.dev/about/en/' },
  ]);
});

test('a portuguese page points x-default at its english translation', () => {
  assert.deepEqual(alternateLinks({ lang: 'pt-br', pathname: '/pt-br/', langSwitchHref: '/', site }), [
    { hreflang: 'pt-br', href: 'https://dielduarte.dev/pt-br/' },
    { hreflang: 'en', href: 'https://dielduarte.dev/' },
    { hreflang: 'x-default', href: 'https://dielduarte.dev/' },
  ]);
});
