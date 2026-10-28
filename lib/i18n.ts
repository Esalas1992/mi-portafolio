export const langs = ["es", "en"] as const;
export type Lang = (typeof langs)[number];

export const defaultLang: Lang = "en";
export const xDefaultLang: Lang = "en";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "es" || value === "en";
}

export function getLangFromHeader(acceptLanguage: string | null): Lang {
  if (!acceptLanguage) return defaultLang;
  const first = acceptLanguage.split(",")[0]?.trim().toLowerCase() ?? "";
  if (first.startsWith("es")) return "es";
  if (first.startsWith("en")) return "en";
  if (acceptLanguage.toLowerCase().includes("es")) return "es";
  return defaultLang;
}
