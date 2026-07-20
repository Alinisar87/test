import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Page copy: structured frontmatter per page — shapes vary, so the schema stays permissive.
// The constraint that matters (tech-stack.md): copy edits never touch .astro components.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({}).passthrough(),
});

export const collections = { pages };
