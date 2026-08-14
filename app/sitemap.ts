import type { MetadataRoute } from "next";
import { categories, makes, specs, slugify } from "./data";

const origin = "https://torquesheet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-14T00:00:00Z");
  return [
    {
      url: origin,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["about", "contact", "diagrams", "privacy", "search", "terms"].map(
      (path) => ({
        url: `${origin}/${path}`,
        lastModified: updated,
        changeFrequency: "monthly" as const,
        priority: path === "diagrams" || path === "search" ? 0.7 : 0.4,
      }),
    ),
    ...makes.map((make) => ({
      url: `${origin}/makes/${slugify(make)}`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...categories.map((category) => ({
      url: `${origin}/category/${category.slug}`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...specs.map((spec) => ({
      url: `${origin}/specs/${spec.slug}`,
      lastModified: new Date(`${spec.reviewed}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
