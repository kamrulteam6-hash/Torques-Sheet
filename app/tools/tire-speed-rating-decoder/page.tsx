import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { tireRimAssociation, uneceR39 } from "../tool-sources";
import { TireSpeedRatingDecoder } from "./ui";

const tool = toolBySlug("tire-speed-rating-decoder")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="The letter after a tire's load index — the H in 98H — is its speed rating: the maximum speed the tire is certified to sustain under its rated load, defined originally in km/h with the familiar mph figures derived from that. This decodes any rating letter, from L through Y."
      steps={[
        {
          title: "Find the letter after the load index",
          detail: "In a size like 225/65R17 98H, the H is the speed rating — the last character before the end of the designation.",
        },
        {
          title: "Decode it against the published table",
          detail: "Each letter maps to a specific sustained speed capability, not an approximate range.",
        },
        {
          title: "Never fit a lower rating than the vehicle specifies",
          detail: "The rating on the vehicle's placard reflects what the vehicle was engineered around, particularly relevant on anything with genuine high-speed capability.",
        },
        {
          title: "Understand what 'sustained' means here",
          detail: "The rating describes a speed the tire can hold continuously under laboratory test conditions, not a hard cutoff — but it is also not a rating to casually exceed.",
        },
      ]}
      sections={[
        {
          heading: "Why the ratings are defined in km/h, not mph",
          paragraphs: [
            "Tire speed ratings originate from an international standard (ISO/ETRTO) written in km/h, in round 10 km/h increments — 120, 130, 140 and so on. The mph figures published everywhere are conversions from those defining values, which is exactly why they land on numbers like 149 and 168 rather than clean round figures.",
            "This also explains a detail that surprises people: an H rating (210 km/h, 130 mph) sits between U (200 km/h) and V (240 km/h) alphabetically out of order — H was assigned later, after the alphabetical sequence up to U was already established, to fill a gap in the middle of the range as tire capability evolved.",
          ],
        },
        {
          heading: "What speed rating actually certifies",
          bullets: [
            "The maximum speed a tire can sustain continuously, at its rated load, under standardised test conditions",
            "It says nothing about handling, grip or braking performance at that speed — only structural integrity",
            "Higher-rated tires generally use stiffer, more heat-resistant constructions, which is a separate and real handling benefit",
            "A tire rated below the vehicle's actual top speed is a genuine limitation, not just a technicality",
            "All four tires on a vehicle should carry the same speed rating unless the manufacturer specifically permits otherwise",
          ],
        },
      ]}
      faqs={[
        {
          question: "What does the H rating mean on a tire?",
          answer: "H-rated tires are certified to sustain up to 130 mph (210 km/h) continuously at their rated load, under standardised test conditions.",
        },
        {
          question: "What is the highest tire speed rating?",
          answer: "Y is the highest standard letter, certified to 186 mph (300 km/h). Some tires with capability beyond that carry a (Y) rating in parentheses alongside a ZR designation.",
        },
        {
          question: "Can I mix tires with different speed ratings?",
          answer: "Not recommended without manufacturer guidance — mismatched speed ratings on the same vehicle can create uneven handling characteristics, particularly under hard driving.",
        },
        {
          question: "Why is H out of alphabetical order in the speed rating sequence?",
          answer: "H was added later to fill a gap between U (200 km/h) and V (240 km/h) as tire capability at that specific speed became common enough to warrant its own rating.",
        },
        {
          question: "What speed rating do I need?",
          answer: "At minimum, match the rating specified on the vehicle's tire placard. That figure reflects what the vehicle was engineered around, particularly relevant for anything with genuine high-speed capability.",
        },
      ]}
      sources={[uneceR39, tireRimAssociation]}
    >
      <TireSpeedRatingDecoder />
    </ToolPage>
  );
}
