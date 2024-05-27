import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
  const posts = 
    await import.meta.glob('./**/*.{md,mdx}', { eager: true })

  const items = Object.values(posts).map((post) => ({
      link: post.url,
      content: sanitizeHtml(post.compiledContent()),
      ...post.frontmatter,
    }))

  return rss({
    // `<title>` field in output xml
    title: 'Diel Duarte Blog',
    // `<description>` field in output xml
    description: 'Diel\'s random and humble thoughts on web technology',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}