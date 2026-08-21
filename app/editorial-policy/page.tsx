import Link from "next/link";
import { pageMetadata } from "../seo";
import { StaticPage } from "../ui";

export const metadata = pageMetadata({
  title: "Editorial and Technical Review Policy",
  description:
    "How TorqueSheet researches vehicle specifications, uses automation, labels source coverage, verifies references, and corrects errors.",
  path: "/editorial-policy",
});

export default function Page() {
  return (
    <StaticPage eyebrow="Trust & methodology" title="Editorial and technical review policy">
      <p>
        TorqueSheet is a focused mechanical-reference project. Its purpose is to
        help readers identify the correct application, find a useful starting
        specification, and reach the underlying technical source. It is not a
        replacement for the current service information attached to a vehicle
        identification number, engine code, installed component, or recall.
      </p>

      <h2>Who prepares the pages</h2>
      <p>
        Pages are prepared by the TorqueSheet Research Desk. Research and
        drafting use software-assisted tools, including generative AI, to organize
        tables, compare model-year distinctions, and produce consistent diagrams.
        Automation is not treated as evidence. A numerical specification needs a
        traceable manufacturer, vehicle, engine, or component document.
      </p>

      <h2>What “direct source linked” means</h2>
      <p>
        A page receives this label when it links to at least one
        application-specific manufacturer or component document, such as an owner
        manual page, service document, installation sheet, or technical PDF. The
        label does not mean every possible build has the same value, and it does
        not claim that a licensed technician has physically inspected the reader’s
        vehicle.
      </p>

      <h2>How source status is labeled</h2>
      <p>
        A manual-library homepage or service-information portal helps readers find
        documentation, but it is not a precise citation. Every published page remains
        crawlable and appears in the public XML sitemap. Pages without a direct
        application-specific document are visibly labeled as reference pages so a
        reader can distinguish them from pages with a stronger source trail.
      </p>

      <h2>How specifications are checked</h2>
      <ol>
        <li>Identify model year, platform, engine family, engine code, and relevant hardware.</li>
        <li>Prefer manufacturer owner manuals, service information, installation sheets, and component instructions.</li>
        <li>Keep units, lubricant condition, fastener type, filter inclusion, and sequence stages attached to the value.</li>
        <li>Separate generation changes instead of averaging or merging incompatible specifications.</li>
        <li>Label uncertainty and require the exact manual where a universal answer would be unsafe.</li>
      </ol>

      <h2>AI assistance and human responsibility</h2>
      <p>
        AI-assisted text can be incomplete or wrong. TorqueSheet therefore shows
        citations and review status and avoids claiming that reference pages are expert
        verified. Every published route is indexable, while its visible source label and
        application boundaries tell readers what still requires direct verification.
        Before safety-critical work, a qualified technician or careful owner must
        confirm the vehicle and current manufacturer procedure.
      </p>

      <h2>Corrections</h2>
      <p>
        When a specification appears incorrect, include the page URL, model year,
        engine or trim, disputed value, and a manual or service-document reference.
        Use the <Link href="/contact">contact page</Link>. A corrected page receives
        a new source-check date only when its technical content or source trail has
        materially changed.
      </p>
    </StaticPage>
  );
}
