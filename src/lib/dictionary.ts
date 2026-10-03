import "server-only";

import en from "../../message/en.json";
import pl from "../../message/pl.json";
import uk from "../../message/uk.json";

export type Dictionary = typeof en;

const dictionaries: Record<string, () => Dictionary> = {
  en: () => en,
  uk: () => uk as Dictionary,
  pl: () => pl as Dictionary,
};


export async function getDictionary(locale: string): Promise<Dictionary> {
    const loadFn = dictionaries[locale as keyof typeof dictionaries] || dictionaries.en;
    return loadFn();
}