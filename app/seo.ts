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
