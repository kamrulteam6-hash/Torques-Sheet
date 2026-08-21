import type { Metadata } from "next";
import { HomePage } from "./ui";

export const metadata: Metadata = {
  title: { absolute: "TorqueSheet — Exact Vehicle Specs" },
  description: "Find exact vehicle torque specifications, firing orders, oil capacities, spark plug gaps, bolt sequences, and downloadable mechanical diagrams.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://torquesheet.com/#website",
        name: "TorqueSheet",
        url: "https://torquesheet.com/",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://torquesheet.com/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://torquesheet.com/#organization",
        name: "TorqueSheet",
        url: "https://torquesheet.com/",
        logo: "https://torquesheet.com/og.png",
      },
    ],
  };
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
