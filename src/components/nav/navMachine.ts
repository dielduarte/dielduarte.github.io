import { setup, assign } from 'xstate';

export type Lang = 'en' | 'pt-br';

export type NavStateId =
  | 'home'
  | 'writing'
  | 'cases'
  | 'lab'
  | 'about'
  | 'contact';

export type NavEvent =
  | { type: 'GO_HOME' }
  | { type: 'GO_WRITING' }
  | { type: 'GO_CASES' }
  | { type: 'GO_LAB' }
  | { type: 'GO_ABOUT' }
  | { type: 'GO_CONTACT' }
  | { type: 'SET_LANG'; lang: Lang };

export interface NavContext {
  lang: Lang;
}

export interface NavNode {
  id: NavStateId;
  label: string;
  x: number;
  y: number;
  href: Record<Lang, string> | null;
  event: Exclude<NavEvent, { type: 'SET_LANG' }>['type'];
  hidden?: boolean;
}

export const NODES: NavNode[] = [
  {
    id: 'home',
    label: 'home',
    x: 120,
    y: 200,
    href: { en: '/', 'pt-br': '/pt-br/' },
    event: 'GO_HOME',
  },
  {
    id: 'writing',
    label: 'writing',
    x: 360,
    y: 110,
    href: { en: '/blog/en/', 'pt-br': '/blog/pt-br/' },
    event: 'GO_WRITING',
  },
  {
    id: 'about',
    label: 'about',
    x: 360,
    y: 200,
    href: { en: '/about/en/', 'pt-br': '/about/pt-br/' },
    event: 'GO_ABOUT',
  },
  {
    id: 'contact',
    label: 'contact',
    x: 360,
    y: 290,
    href: { en: '/contact/en/', 'pt-br': '/contact/pt-br/' },
    event: 'GO_CONTACT',
  },
  {
    id: 'cases',
    label: 'cases',
    x: 0,
    y: 0,
    href: { en: '/case-studies/en/', 'pt-br': '/case-studies/pt-br/' },
    event: 'GO_CASES',
    hidden: true,
  },
  {
    id: 'lab',
    label: 'lab',
    x: 0,
    y: 0,
    href: null,
    event: 'GO_LAB',
    hidden: true,
  },
];

export const visibleNodes = NODES.filter((n) => !n.hidden);

export const EDGES: Array<[NavStateId, NavStateId]> = [
  ['home', 'writing'],
  ['home', 'about'],
  ['home', 'contact'],
];

const transitions = {
  GO_HOME: 'home',
  GO_WRITING: 'writing',
  GO_CASES: 'cases',
  GO_LAB: 'lab',
  GO_ABOUT: 'about',
  GO_CONTACT: 'contact',
} as const;

export const navMachine = setup({
  types: {
    context: {} as NavContext,
    events: {} as NavEvent,
  },
  actions: {
    setLang: assign({
      lang: ({ event }) =>
        event.type === 'SET_LANG' ? event.lang : 'en',
    }),
  },
}).createMachine({
  id: 'nav',
  initial: 'home',
  context: { lang: 'en' },
  on: {
    SET_LANG: { actions: 'setLang' },
  },
  states: {
    home: { on: buildTransitions('home') },
    writing: { on: buildTransitions('writing') },
    cases: { on: buildTransitions('cases') },
    lab: { on: buildTransitions('lab') },
    about: { on: buildTransitions('about') },
    contact: { on: buildTransitions('contact') },
  },
});

function buildTransitions(self: NavStateId) {
  const out: Record<string, { target: NavStateId }> = {};
  for (const [eventType, target] of Object.entries(transitions)) {
    if (target === self) continue;
    out[eventType] = { target };
  }
  return out;
}

export function pathToState(pathname: string): NavStateId {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '' || p === '/' || p === '/pt-br') return 'home';
  if (p.startsWith('/blog')) return 'writing';
  if (p.startsWith('/case-studies')) return 'cases';
  if (p.startsWith('/lab')) return 'lab';
  if (p.startsWith('/about')) return 'about';
  if (p.startsWith('/contact')) return 'contact';
  return 'home';
}

export function langFromPath(pathname: string): Lang {
  return pathname.includes('/pt-br') ? 'pt-br' : 'en';
}

export function eventForState(id: NavStateId): NavEvent['type'] {
  const node = NODES.find((n) => n.id === id);
  return node ? node.event : 'GO_HOME';
}
