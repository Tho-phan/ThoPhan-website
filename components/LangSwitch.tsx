import { locales, type Locale } from "@/lib/i18n";

const names: Record<Locale, string> = { en: "English", vi: "Tiếng Việt" };

// Plain links to /en and /vi: each language is its own page, so a link can be sent to someone.
export default function LangSwitch({ lang, label, path = "" }: { lang: Locale; label: string; path?: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center gap-4 font-[family-name:var(--font-display)] text-sm font-medium">
      {locales.map((l) =>
        l === lang ? (
          <span key={l} lang={l} aria-current="true" className="font-bold">
            {names[l]}
          </span>
        ) : (
          <a key={l} href={`/${l}${path}`} lang={l} hrefLang={l} className="py-3 underline decoration-1 underline-offset-4">
            {names[l]}
          </a>
        ),
      )}
    </div>
  );
}
