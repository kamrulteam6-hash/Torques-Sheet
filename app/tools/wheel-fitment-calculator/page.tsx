import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { rimWidthRange, tireRimAssociation } from "../tool-sources";
import { WheelFitmentCalculator } from "./ui";

const tool = toolBySlug("wheel-fitment-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="The wheel offset calculator tells you where the rim sits. It deliberately stops there, because the tire is what actually contacts the fender and the strut, and a tire wider than the wheel bulges beyond the rim's own edges on both sides. This finishes the calculation, adding that bulge to the wheel's position."
      steps={[
        {
          title: "Enter wheel width and offset",
          detail: "The same figures the wheel offset calculator uses — width in inches, offset in millimetres.",
        },
        {
          title: "Enter the tire's section width",
          detail: "In millimetres, from the tire's size designation. A tire wider than the wheel bulges beyond the rim edges; a tire narrower than the wheel does not.",
        },
        {
          title: "Read both edge positions from the hub mounting face",
          detail: "These are the figures that matter for clearance — not the wheel's position alone, but where the tire's rubber actually ends up.",
        },
        {
          title: "Feed these figures into the clearance calculators",
          detail: "The outer edge figure is what the fender clearance calculator needs; the inner edge figure is what the suspension clearance calculator needs.",
        },
      ]}
      formula={[
        {
          label: "Tire bulge per side",
          expression: "bulge = max(0, (tire width − wheel width) ÷ 2)",
          note: "Split evenly across both sides when the tire is wider than the wheel it's mounted on — zero when the wheel is as wide or wider than the tire.",
        },
        {
          label: "Outer and inner edge position",
          expression: "edge = wheel edge position (from offset/backspacing) + bulge",
          note: "Starts from the same backspacing calculation the wheel offset and backspacing calculators use, then adds the tire's own contribution.",
        },
      ]}
      sections={[
        {
          heading: "Why a wheel calculation alone understates the real fitment",
          paragraphs: [
            "This is the gap the wheel offset calculator's own content flags explicitly but does not close: a tire mounted on a wheel narrower than its section width bulges outward on both sides, and that bulge is exactly what a wheel-only calculation misses.",
            "Fit a 285-section tire on a 9-inch wheel and the tire measures roughly 11.2 inches at its widest — about an inch of rubber sitting proud of the wheel's edges on each side. A fitment check that stops at the wheel's position alone will say a setup clears when the tire itself does not.",
            "This tool closes that gap by combining both calculations into one figure — the actual position of the rubber that will contact the fender and the strut, not just the metal that sits inside it.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Why isn't the wheel offset calculator enough on its own?",
          answer: "It calculates where the rim sits, but the tire mounted on it can extend beyond the rim's edges if it's wider than the wheel. This tool adds that tire bulge to give the actual edge position.",
        },
        {
          question: "How much does a tire bulge beyond the wheel?",
          answer: "Half the difference between tire section width and wheel width, on each side. A 285mm tire on a 9-inch (228.6mm) wheel bulges about 1.1 inches per side.",
        },
        {
          question: "What if the wheel is wider than the tire?",
          answer: "There's no bulge in that case — the tire sits within the wheel's own width, so the fitment matches the plain wheel offset calculation.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange]}
    >
      <WheelFitmentCalculator />
    </ToolPage>
  );
}
