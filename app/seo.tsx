import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const url = `https://torquesheet.com${path === "/" ? "" : path}`;
  const socialTitle = title.includes("TorqueSheet") ? title : `${title} | TorqueSheet`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "TorqueSheet",
      title: socialTitle,
      description,
      url,
      images: [
        {
          url: "https://torquesheet.com/og.png",
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["https://torquesheet.com/og.png"],
    },
  };
}

export const ORIGIN = "https://torquesheet.com";

type Crumb = { name: string; path: string };

export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${ORIGIN}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

/** JSON-LD for a hub/listing page: CollectionPage + ItemList + breadcrumbs. */
export function collectionSchema({
  name,
  description,
  path,
  trail,
  items,
}: {
  name: string;
  description: string;
  path: string;
  trail: Crumb[];
  items: { name: string; path: string }[];
}) {
  const url = `${ORIGIN}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        name,
        description,
        url,
        isPartOf: { "@type": "WebSite", name: "TorqueSheet", url: ORIGIN },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            url: `${ORIGIN}${item.path}`,
          })),
        },
      },
      breadcrumbSchema(trail),
    ],
  };
}

export function pageSchema({
  type,
  name,
  description,
  path,
  trail,
}: {
  type: "AboutPage" | "ContactPage" | "WebPage";
  name: string;
  description: string;
  path: string;
  trail: Crumb[];
}) {
  const url = `${ORIGIN}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#page`,
        name,
        description,
        url,
        isPartOf: { "@type": "WebSite", name: "TorqueSheet", url: ORIGIN },
        publisher: { "@type": "Organization", name: "TorqueSheet", url: ORIGIN },
      },
      breadcrumbSchema(trail),
    ],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
