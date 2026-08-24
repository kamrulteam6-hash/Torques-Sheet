import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { WheelTravelCalculator } from "./ui";

const tool = toolBySlug("wheel-travel-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A shock absorber's stroke — the distance its shaft actually travels — is rarely the same number as how far the wheel moves, because the suspension's motion ratio scales one into the other. This solves either direction: wheel travel from a known shock stroke, or the shock stroke a target wheel travel requires."
      steps={[
        {
          title: "Choose which direction to solve",
          detail: "Checking how much wheel travel a shock you already have provides points at solving for wheel travel. Specifying a shock for a target amount of wheel travel points the other way.",
        },
        {
          title: "Enter the known figure",
          detail: "Shock stroke from the manufacturer's specification, or your target wheel travel from suspension geometry or ground clearance requirements.",
        },
        {
          title: "Enter the suspension's motion ratio",
          detail: "The same figure used throughout the suspension calculators here — wheel travel divided by shock travel, typically below 1.0.",
        },
        {
          title: "Read the amplification factor alongside the result",
          detail: "This is simply 1 divided by the motion ratio, and it shows directly how much more the wheel moves per unit of shock movement — useful for sanity-checking whether a shock's stroke is adequate.",
        },
      ]}
      formula={[
        {
          label: "Wheel travel from shock travel",
          expression: "wheel travel = shock travel ÷ motion ratio",
          note: "Below a motion ratio of 1.0, wheel travel exceeds shock travel by the amplification the geometry provides.",
        },
        {
          label: "Shock travel for a target wheel travel",
          expression: "shock travel = wheel travel × motion ratio",
          note: "The same relationship reversed, for specifying a shock to hit a target.",
        },
      ]}
      sections={[
        {
          heading: "Why checking this matters before buying a shock",
          paragraphs: [
            "A shock's stroke is a fixed mechanical limit — run out of travel and the shock either bottoms out internally or the suspension's other components take the impact instead, neither of which is a good outcome.",
            "Because motion ratio scales shock stroke into wheel travel, the same physical shock provides completely different amounts of usable wheel travel depending on where it's mounted in the suspension geometry. A shock that's perfectly adequate on one motion ratio can be genuinely undersized on another, even with an identical stroke rating.",
            "This is exactly why aftermarket coilover and shock specifications matter more than they might seem to at first — a shock swap that changes the mounting geometry, and with it the motion ratio, changes how much wheel travel the same physical shock actually delivers, sometimes in a direction that catches people out.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate wheel travel from shock stroke?",
          answer: "Divide shock travel by the suspension's motion ratio. A 3-inch shock stroke at a 0.6 motion ratio provides 5 inches of wheel travel.",
        },
        {
          question: "What shock stroke do I need for a target wheel travel?",
          answer: "Multiply the target wheel travel by the motion ratio. For 6 inches of wheel travel at a 0.6 motion ratio, you need a shock with at least 3.6 inches of stroke.",
        },
        {
          question: "Why does wheel travel exceed shock travel?",
          answer: "Because most suspension geometries have a motion ratio below 1.0, meaning the wheel is positioned with more mechanical leverage than the shock — the wheel moves further than the shock shaft does for the same suspension motion.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <WheelTravelCalculator />
    </ToolPage>
  );
}
