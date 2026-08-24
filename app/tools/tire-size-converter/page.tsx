import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { iso5775, tireRimAssociation } from "../tool-sources";
import { TireSizeConverter } from "./ui";

const tool = toolBySlug("tire-size-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A tire's dimensions are physical facts; the way they get written down is a choice between two competing notations. This converts a size given in either metric or flotation notation into the other, plus a plain-inches breakdown, so you can compare a catalogue quoted one way against a specification written the other."
      steps={[
        {
          title: "Enter the size in whatever notation you have it",
          detail: "Metric (225/65R17) and flotation (33x12.50R15) both work — the tool recognises either.",
        },
        {
          title: "Read the equivalent in the other notation",
          detail: "Both describe the same physical tire; converting between them makes a metric catalogue and a flotation spec directly comparable.",
        },
        {
          title: "Check the plain-inches breakdown for a tape-measure comparison",
          detail: "Width, sidewall and rim diameter in inches — useful when checking a size against a physical clearance measurement.",
        },
      ]}
      formula={[
        {
          label: "Metric to flotation",
          expression: "flotation = diameter(in) X width(in) R rim",
          note: "Flotation notation states overall diameter and width directly in inches, rather than deriving them from a percentage.",
        },
        {
          label: "Flotation to metric",
          expression: "metric = width(mm) / aspect-ratio R rim",
          note: "The reverse direction, deriving an implied aspect ratio from the flotation size's stated diameter and width.",
        },
      ]}
      sections={[
        {
          heading: "Two notations, one underlying set of dimensions",
          paragraphs: [
            "Metric notation states section width in millimetres and aspect ratio as a percentage, leaving overall diameter to be calculated. Flotation notation states overall diameter and width directly in inches, leaving aspect ratio implied rather than stated.",
            "Neither is more correct — they are simply different starting points for describing the same three physical dimensions. This tool moves in whichever direction is needed, so a size read off one tire can be compared directly against a specification, catalogue listing or clearance measurement given in the other notation.",
            "The conversion is exact geometry, not an approximation — both notations describe overall diameter, section width and rim diameter, and once any two of the underlying figures are known the third follows directly.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert a metric tire size to flotation?",
          answer: "Calculate the overall diameter and section width in inches from the metric size, then write them as diameter X width R rim — for example, 225/65R17 converts to approximately 28.5X8.9R17.",
        },
        {
          question: "How do I convert a flotation tire size to metric?",
          answer: "The flotation size already states diameter and width in inches; convert width to millimetres and derive the implied aspect ratio, then write as width/aspect-ratio R rim.",
        },
        {
          question: "Is 285/70R17 the same as 33x12.50R17?",
          answer: "Very close — 285/70R17 works out to about 32.7 inches overall diameter, within half an inch of a nominal 33. They are commonly cross-shopped for this reason, though the flotation size is usually slightly wider.",
        },
        {
          question: "Which notation is more accurate?",
          answer: "Neither — both describe the same physical dimensions from different starting points. Metric derives diameter from width and aspect ratio; flotation states diameter and width directly and leaves aspect ratio implied.",
        },
      ]}
      sources={[tireRimAssociation, iso5775]}
    >
      <TireSizeConverter />
    </ToolPage>
  );
}
