import "server-only";

import en from "../../message/en.json";
import pl from "../../message/pl.json";
import uk from "../../message/uk.json";

const dictionaries = {
  en: () => (en as any).default || en,
  uk: () => (uk as any).default || uk,
  pl: () => (pl as any).default || pl,
};

export type Dictionary = typeof en;

export async function getDictionary(locale: string): Promise<Dictionary> {
    const loadFn = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
    return loadFn();
}