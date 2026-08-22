import type { MetadataRoute } from "next";
import { categories, makes, specs, slugify } from "./data";
import { buildDiagramSvg } from "./diagram-svg";
import { guidePath, guides } from "./guides-data";
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
    // /search is noindex and excluded on purpose.
    ...["about", "compare", "contact", "diagrams", "editorial-policy", "guides", "privacy", "terms", "trouble-codes"].map(
      (path) => ({
        url: `${origin}/${path}`,
        lastModified: updated,
        changeFrequency: "monthly" as const,
        priority: path === "diagrams" ? 0.7 : 0.4,
      }),
    ),
    {
      url: `${origin}/makes/chevrolet/350`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...guides.map((guide) => ({
      url: `${origin}${guidePath(guide.slug)}`,
      lastModified: new Date(`${guide.reviewed}T00:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...makes.map((make) => ({
      url: `${origin}/makes/${slugify(make)}`,
      lastModified: updated,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    // /category/diagrams redirects to /diagrams, so it is not listed here.
    ...categories.filter((category) => category.slug !== "diagrams").map((category) => ({
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
      // Image sitemap entry for the static diagram, where one exists.
      ...(buildDiagramSvg(spec) ? { images: [`${origin}/diagram/${spec.slug}.svg`] } : {}),
    })),
  ];
}
