// Loads every markdown file in src/content/news, newest first.
export type Post = {
  slug: string;
  title: string;
  date: Date;
  summary: string;
  tag?: string;
  image?: string;
  Content: any;
};

const files = import.meta.glob('../content/news/*.md', { eager: true }) as Record<string, any>;

export const posts: Post[] = Object.entries(files)
  .map(([path, mod]) => ({
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    date: new Date(mod.frontmatter.date),
    summary: mod.frontmatter.summary ?? '',
    tag: mod.frontmatter.tag,
    image: mod.frontmatter.image,
    Content: mod.Content,
  }))
  .filter((p) => !files[`../content/news/${p.slug}.md`].frontmatter.draft)
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
