// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Keep noindex pages out of the sitemap: /thanks always, plus any draft content entry.
// Scans frontmatter directly so adding a study/post never requires touching this file.
function draftPaths(dir, urlPrefix) {
  try {
    return readdirSync(`./src/content/${dir}`)
      .filter((f) => f.endsWith('.md'))
      .filter((f) => /^draft:\s*true/m.test(readFileSync(`./src/content/${dir}/${f}`, 'utf8')))
      .map((f) => `${urlPrefix}/${f.replace(/\.md$/, '')}/`);
  } catch {
    return [];
  }
}
const excluded = new Set(['/thanks/', ...draftPaths('case-studies', '/case-studies'), ...draftPaths('blog', '/blog')]);

export default defineConfig({
  site: 'https://sevenfigureslab.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !excluded.has(new URL(page).pathname),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
