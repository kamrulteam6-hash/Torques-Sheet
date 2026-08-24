import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { rimWidthRange, tireRimAssociation } from "../tool-sources";
import { WheelWidthCalculator } from "./ui";

const tool = toolBySlug("wheel-width-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Every tire section width has an approved rim-width band, published by TRA and ETRTO, rather than one single correct wheel. Mounting a tire outside its approved band pulls the sidewall into a shape it was not designed to hold — this finds that band for any section width."
      steps={[
        {
          title: "Enter the tire's section width",
          detail: "The three-digit number in a metric size, in millimetres — 245 in 245/45R18.",
        },
        {
          title: "Read the ideal and the approved range",
          detail: "The ideal figure is a good default; the range shows how far either side you can go while staying within standard practice.",
        },
        {
          title: "Choose a wheel width inside the range",
          detail: "A wheel at the narrow end of the range gives a slightly rounder tire profile; at the wide end, a slightly flatter, more square profile with better sidewall support at the cost of some ride comfort.",
        },
      ]}
      formula={[
        {
          label: "Ideal rim width",
          expression: "ideal (in) = section width (mm) ÷ 25.4 × 0.85",
          note: "Roughly 85% of section width converted to inches — the TRA/ETRTO convention for a well-matched wheel.",
        },
        {
          label: "Approved range",
          expression: "range = ideal ± 1 inch",
          note: "The band tire manufacturers generally consider acceptable, though check a specific tire's own published range where precision matters.",
        },
      ]}
      sections={[
        {
          heading: "What happens outside the approved range",
          paragraphs: [
            "A wheel too narrow for the tire pinches the sidewalls inward near the bead, reducing the tire's effective width at the road and rounding the tread profile more than intended — reducing contact patch and changing handling characteristics from what the tire was designed to deliver.",
            "A wheel too wide stretches the tire, pulling the sidewalls outward and flattening the tread profile. This can improve steering response and sidewall stability, which is why 'wheel too wide' is a common deliberate performance modification within reason — but taken too far it also increases stress on the bead area and can compromise the tire's structural margins.",
            "The approved range exists because tire manufacturers test and validate performance within it. Going outside it is not automatically catastrophic, but it is departing from validated behaviour, and the tire's handling, wear pattern and structural margins are no longer guaranteed to match what the tire was designed and tested for.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What wheel width should I use for a 245mm tire?",
          answer: "The ideal is roughly 8.2 inches, with an approved range of about 7.2 to 9.2 inches according to standard TRA/ETRTO guidance.",
        },
        {
          question: "What happens if my wheel is too narrow for the tire?",
          answer: "The sidewalls get pinched inward near the bead, rounding the tread profile more than intended and reducing effective contact patch width at the road.",
        },
        {
          question: "What happens if my wheel is too wide for the tire?",
          answer: "The tire stretches, flattening the tread profile and improving steering response, but increasing stress on the bead area — a common but deliberate performance modification within the approved range.",
        },
        {
          question: "How is the ideal rim width calculated?",
          answer: "Roughly 85% of the tire's section width, converted from millimetres to inches — the standard TRA/ETRTO convention.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange]}
    >
      <WheelWidthCalculator />
    </ToolPage>
  );
}
