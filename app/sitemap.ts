import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// The four real pages: two languages x (home, family). Each lists its language alternates for hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/family"].flatMap((path) =>
    (["en", "vi"] as const).map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { en: `${siteUrl}/en${path}`, vi: `${siteUrl}/vi${path}` } },
    })),
  );
}
