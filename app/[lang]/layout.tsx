import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dictionaries } from "@/lib/dict";
import { hasLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

// The vietnamese subset is needed for the Vietnamese pages' diacritics.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin", "vietnamese"] });
const body = Source_Serif_4({ variable: "--font-body", subsets: ["latin", "vietnamese"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#2b2119" }; // the dark bark hero fills the first screen

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, description } = dictionaries[lang].meta;
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", vi: "/vi", "x-default": "/en" },
    },
    openGraph: { title, description, url: `/${lang}`, siteName: "Tho Phan", locale: lang === "vi" ? "vi_VN" : "en_US", type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} data-tenant="vn" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:font-[family-name:var(--font-display)] focus:font-semibold focus:text-bark"
        >
          {dictionaries[lang].nav.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
