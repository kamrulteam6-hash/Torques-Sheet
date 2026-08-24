import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { CamberCalculator } from "./ui";

const tool = toolBySlug("camber-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Camber is the wheel's lean, seen from the front of the vehicle, and it can be measured with nothing more than a level and a tape measure — the same trigonometry a digital camber gauge automates internally. This turns a top-to-bottom offset measurement into a camber angle in degrees."
      steps={[
        {
          title: "Hold a level vertically against the tire",
          detail: "Placed against the sidewall, oriented true vertical using the level's bubble — this becomes the reference line camber is measured against.",
        },
        {
          title: "Measure the gap between the level and the tire, top and bottom",
          detail: "The difference between these two gap measurements is the horizontal offset — how far the tire leans away from vertical over the span you measured.",
        },
        {
          title: "Note the vertical distance between your two measurement points",
          detail: "This is the span the offset was measured over — a larger span gives a more precise angle for a given measurement error, since the same absolute error represents a smaller angular error over a longer span.",
        },
        {
          title: "Enter both figures for the angle",
          detail: "The result is camber angle in degrees — the same units alignment specifications and gauges use.",
        },
      ]}
      formula={[
        {
          label: "Camber from a level measurement",
          expression: "camber angle = arctan(horizontal offset ÷ vertical span)",
          note: "Straightforward trigonometry — the same relationship a bubble or digital camber gauge calculates internally from its own sensors.",
        },
      ]}
      sections={[
        {
          heading: "Why this method works without a dedicated gauge",
          paragraphs: [
            "A camber gauge is, at its core, exactly this measurement automated — a bubble level or digital sensor referencing true vertical, combined with a known measuring span built into the tool's geometry.",
            "The DIY version does the same job with equipment most people already have: a torpedo level or a smartphone level app for the vertical reference, and a tape measure for the offset and span. The trigonometry is identical either way, which is why this calculator produces the same result a purpose-built gauge would.",
            "Accuracy comes down to measurement care rather than equipment sophistication — a longer vertical span reduces the effect of small measurement errors on the calculated angle, and a genuinely level reference line matters more than the precision of the ruler.",
          ],
        },
        {
          heading: "Why negative camber is the usual performance target",
          bullets: [
            "Negative camber means the top of the tire leans in toward the engine, relative to the bottom",
            "Under cornering load, the outside tire's contact patch tends to roll toward its outer edge as the suspension compresses and the body rolls",
            "Some built-in negative camber compensates for that roll, keeping more of the tread flat against the road during hard cornering",
            "Too much negative camber, however, reduces straight-line contact patch and accelerates inner-edge tire wear",
            "The right amount is a specific target for a given vehicle and use case, not simply 'more is better'",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I measure camber without a gauge?",
          answer: "Hold a level vertically against the tire and measure the horizontal gap at the top and bottom over a known vertical span. The camber angle is the arctangent of that offset divided by the span.",
        },
        {
          question: "What is negative vs positive camber?",
          answer: "Negative camber means the top of the tire leans inward, toward the engine, relative to the bottom — the usual performance alignment target. Positive camber leans the top outward, away from the vehicle.",
        },
        {
          question: "How accurate is measuring camber with a level and tape measure?",
          answer: "It uses the same trigonometry a dedicated gauge does, so accuracy depends mainly on measurement care — a longer vertical span and a genuinely true vertical reference both improve precision.",
        },
        {
          question: "Why do performance cars run negative camber?",
          answer: "Body roll during cornering rolls the tire's contact patch toward its outer edge. Some built-in negative camber compensates, keeping more tread flat against the road under hard cornering load.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <CamberCalculator />
    </ToolPage>
  );
}
