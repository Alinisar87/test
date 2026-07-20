import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Page copy: structured frontmatter per page — shapes vary, so the schema stays permissive.
// The constraint that matters (tech-stack.md): copy edits never touch .astro components.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({}).passthrough(),
});

// Case studies: frontmatter = meta + metric tiles, markdown body = the narrative.
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string(),
    dek: z.string(),
    draft: z.boolean().default(true),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    cta: z.object({ heading: z.string(), label: z.string() }),
  }),
});

// Blog: publish = drop a .md with draft:false. Zero posts is a valid state.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(true),
  }),
});

// Service lines: one .md per service, rendered by src/pages/services/[slug].astro
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    color: z.string(),
    order: z.number(),
    title: z.string(),
    description: z.string(),
    hero: z.object({ kicker: z.string(), heading: z.string(), lead: z.string() }),
    deliverables: z.object({ heading: z.string(), items: z.array(z.object({ title: z.string(), body: z.string() })) }),
    curve: z.object({ heading: z.string(), body: z.string() }),
    fit: z.object({ heading: z.string(), body: z.string(), package: z.string() }),
  }),
});

export const collections = { pages, caseStudies, blog, services };
