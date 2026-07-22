// Pure translation helpers — safe to import on client or server.
import { messages, type Lang } from "./dictionary";

export function translate(
  lang: Lang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const entry = messages[key];
  let text = entry ? entry[lang] : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return text;
}

export type { Lang };
