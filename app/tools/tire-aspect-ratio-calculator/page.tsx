import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { tireRimAssociation, yokohamaSidewall } from "../tool-sources";
import { TireAspectRatioCalculator } from "./ui";

const tool = toolBySlug("tire-aspect-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Aspect ratio is normally read straight off a size designation, but this works it out from a real measurement instead — useful when checking an unmarked tire, verifying a worn or damaged sidewall reading, or working out what sidewall height a target aspect ratio would actually produce on a given width."
      steps={[
        {
          title: "Measure the section width",
          detail: "The tire's widest point, sidewall to sidewall, typically close to the middle of the tire's height rather than at the tread or bead.",
        },
        {
          title: "Measure the sidewall height",
          detail: "From the rim edge to the outer edge of the tread — this is the dimension aspect ratio expresses as a percentage of width.",
        },
        {
          title: "Read the calculated aspect ratio",
          detail: "Compare it against a nearby standard value (usually a multiple of 5) to sanity-check the measurement — real aspect ratios cluster around round numbers.",
        },
        {
          title: "Or solve the other direction",
          detail: "Given a target aspect ratio and a width, find the sidewall height it implies — useful when comparing tire options before a purchase.",
        },
      ]}
      formula={[
        {
          label: "Aspect ratio from measurement",
          expression: "aspect ratio (%) = sidewall height ÷ section width × 100",
          note: "The definition itself — aspect ratio is simply sidewall height expressed as a percentage of section width.",
        },
        {
          label: "Sidewall from aspect ratio",
          expression: "sidewall height = section width × aspect ratio ÷ 100",
          note: "The same relationship rearranged to solve for sidewall instead.",
        },
      ]}
      sections={[
        {
          heading: "Why aspect ratio is a percentage, not a fixed measurement",
          paragraphs: [
            "This is the detail that catches people out when comparing tire sizes: aspect ratio is not a sidewall height in millimetres, it is a percentage of whatever the section width happens to be. The same aspect ratio number means a completely different physical sidewall height depending on the width it is paired with.",
            "A 55-series tire at 225mm width has a sidewall of about 123.75mm. The same 55-series aspect ratio at 275mm width produces a sidewall of about 151.25mm — nearly 28mm taller, despite an identical aspect ratio figure. This is exactly why widening a tire without also lowering the aspect ratio makes it taller, not just wider.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate aspect ratio from a measurement?",
          answer: "Divide the measured sidewall height by the section width and multiply by 100. A 146.25mm sidewall on a 225mm width gives an aspect ratio of 65.",
        },
        {
          question: "Why do two tires with the same aspect ratio have different sidewall heights?",
          answer: "Because aspect ratio is a percentage of section width, not a fixed dimension. A wider tire at the same aspect ratio has a taller sidewall in absolute terms.",
        },
        {
          question: "What is a low aspect ratio tire?",
          answer: "Generally anything at or below about 45 is considered low-profile — a shorter sidewall relative to width, which sharpens steering response at the cost of ride comfort and rim protection.",
        },
      ]}
      sources={[tireRimAssociation, yokohamaSidewall]}
    >
      <TireAspectRatioCalculator />
    </ToolPage>
  );
}
