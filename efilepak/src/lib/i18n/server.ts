import { cookies } from "next/headers";
import { dirFor, type Lang } from "./dictionary";
import { translate } from "./shared";

export const LANG_COOKIE = "efp_lang";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const v = store.get(LANG_COOKIE)?.value;
  return v === "ur" ? "ur" : "en";
}

/** Server-side translator bound to the current request's language. */
export async function getT() {
  const lang = await getLang();
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);
  return { lang, dir: dirFor(lang), t };
}
