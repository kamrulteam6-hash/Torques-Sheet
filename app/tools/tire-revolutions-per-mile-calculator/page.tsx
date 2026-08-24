import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { tireRimAssociation, uneceR39 } from "../tool-sources";
import { TireRevolutionsPerMileCalculator } from "./ui";

const tool = toolBySlug("tire-revolutions-per-mile-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Revolutions per mile is the figure hiding behind every speedometer and odometer reading — the vehicle counts wheel rotations and multiplies by an assumed distance per rotation to arrive at both. This works that figure out directly from a tire size."
      steps={[
        {
          title: "Enter the tire size",
          detail: "Any metric or flotation size works — the calculation runs from overall diameter, which both notations resolve to identically.",
        },
        {
          title: "Read revolutions per mile as the reference figure",
          detail: "This is what a speedometer and odometer are calibrated against for that specific tire size.",
        },
        {
          title: "Compare against a different size before changing tires",
          detail: "Two sizes with different revs-per-mile figures will produce different speedometer and odometer readings for the same actual speed and distance.",
        },
      ]}
      formula={[
        {
          label: "Revolutions per mile",
          expression: "revs per mile = 63,360 ÷ circumference (in)",
          note: "63,360 is the number of inches in a mile. Circumference comes from overall diameter times π.",
        },
        {
          label: "Revolutions per kilometre",
          expression: "revs per km = revs per mile ÷ 1.60934",
          note: "A straightforward unit conversion of the same underlying figure.",
        },
      ]}
      sections={[
        {
          heading: "Why this single number underlies both readings",
          paragraphs: [
            "A speedometer does not measure road speed directly — it counts how fast the wheels (or a shaft geared to them) are turning, and converts that into a speed using the revs-per-mile figure the vehicle was calibrated with. The odometer does the same thing over time, accumulating distance from the same rotation count.",
            "That is why changing tire size shifts both readings by the same proportion. A taller tire has a lower revs-per-mile figure — it covers more ground per rotation — so the same wheel speed now represents a higher actual road speed than the calibration assumes, and the speedometer under-reads.",
            "Knowing this figure precisely is the starting point for any conversation about speedometer accuracy after a tire change, which is exactly what the speedometer error calculator uses it for.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate tire revolutions per mile?",
          answer: "Divide 63,360 (inches in a mile) by the tire's rolling circumference in inches. Circumference is the overall diameter multiplied by π.",
        },
        {
          question: "Why does a taller tire have fewer revolutions per mile?",
          answer: "Because it covers more distance per rotation — a larger circumference means fewer rotations are needed to cover the same mile.",
        },
        {
          question: "Is revolutions per mile the same for the speedometer and odometer?",
          answer: "Yes — both derive from the same wheel rotation count and the same calibrated distance-per-rotation figure, which is why a tire size change affects both readings by the same proportion.",
        },
      ]}
      sources={[tireRimAssociation, uneceR39]}
    >
      <TireRevolutionsPerMileCalculator />
    </ToolPage>
  );
}
