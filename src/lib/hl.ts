// Content convention: *phrase* in a heading becomes an amber marker highlight.
// Only ever applied to our own repo-authored content (safe for set:html).
export const hl = (s: string): string =>
  s.replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
