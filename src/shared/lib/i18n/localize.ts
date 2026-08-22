import type { Locale } from "./dictionaries";

/** Resuelve una cadena o lista traducible al locale activo */
export function L<T extends Record<Locale, unknown>>(value: T, locale: Locale): T[Locale] {
  return value[locale];
}
