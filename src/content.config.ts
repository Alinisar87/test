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

export const collections = { pages, caseStudies };
