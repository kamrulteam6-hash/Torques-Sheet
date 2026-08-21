import type { MetadataRoute } from "next";
import { categories, makes, specs, slugify } from "./data";
import { comparisons, comparisonPath } from "./compare-data";
import { troubleCodeGuides, troubleCodePath } from "./trouble-code-data";

const origin = "https://torquesheet.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-21T00:00:00Z");
  return [
    {
      url: origin,
      lastModified: updated,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["about", "compare", "contact", "diagrams", "editorial-policy", "privacy", "search", "terms", "trouble-codes"].map(
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
    ...comparisons.map((comparison) => ({
      url: `${origin}${comparisonPath(comparison)}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...troubleCodeGuides.map((guide) => ({
      url: `${origin}${troubleCodePath(guide)}`,
      lastModified: updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...specs.map((spec) => ({
      url: `${origin}/specs/${spec.slug}`,
      lastModified: new Date(`${spec.reviewed}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
