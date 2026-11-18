import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { dictionaries } from "@/lib/dict";
import { hasLocale, locales } from "@/lib/i18n";

// The vietnamese subset is needed for the Vietnamese pages' diacritics.
const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin", "vietnamese"] });
const body = Source_Serif_4({ variable: "--font-body", subsets: ["latin", "vietnamese"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, description } = dictionaries[lang].meta;
  return { title, description, alternates: { languages: { en: "/en", vi: "/vi" } } };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={lang} data-tenant="vn" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
