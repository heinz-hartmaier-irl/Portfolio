export type Locale = "fr" | "en";

export const defaultLocale: Locale = "fr";
export const localeCookieName = "portfolio-locale";

export function normalizeLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : defaultLocale;
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

