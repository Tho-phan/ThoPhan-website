export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
