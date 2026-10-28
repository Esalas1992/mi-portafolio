import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { langs } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...langs.map((lang) => ({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? 1 : 0.9,
    })),
  ];
}
