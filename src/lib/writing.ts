import type { Lang } from '../components/nav/navMachine';
import type { PostSummary } from '../components/grid/PostRow.astro';

interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  languageKey: string;
  slug: string;
}

export interface CaseStudyFrontmatter extends PostFrontmatter {
  company: string;
  role: string;
  duration?: string;
  impact: string;
  techStack: string[];
}

interface MarkdownPage<F> {
  frontmatter: F;
  url: string;
}

const posts = import.meta.glob<MarkdownPage<PostFrontmatter>>('../pages/blog/*/*/index.md', { eager: true });
const caseStudies = import.meta.glob<MarkdownPage<CaseStudyFrontmatter>>('../pages/_case-studies/*/*/index.md', {
  eager: true,
});

const withSlash = (url: string) => (url.endsWith('/') ? url : `${url}/`);
const byNewest = (a: { date: string }, b: { date: string }) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();
const languageKey = (lang: Lang) => (lang === 'en' ? 'en' : 'pt-br');

export function postsFor(lang: Lang): PostSummary[] {
  return Object.values(posts)
    .filter((p) => p.frontmatter.languageKey === languageKey(lang))
    .map(({ frontmatter: f, url }) => ({
      title: f.title,
      description: f.description,
      date: f.date,
      slug: f.slug,
      href: withSlash(url),
    }))
    .sort(byNewest);
}

export function caseStudiesFor(lang: Lang): Array<CaseStudyFrontmatter & { href: string }> {
  return Object.values(caseStudies)
    .filter((c) => c.frontmatter.languageKey === languageKey(lang))
    .map(({ frontmatter, url }) => ({ ...frontmatter, href: withSlash(url) }))
    .sort(byNewest);
}
