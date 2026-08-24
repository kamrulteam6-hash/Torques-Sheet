import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { RideHeightCalculator } from "./ui";

const tool = toolBySlug("ride-height-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Adjusting a coilover's spring perch or changing a spring's free length moves ride height, but not by a one-to-one amount — the suspension's motion ratio scales that change before it reaches the wheel. This works out the actual ride height change a given spring length adjustment produces."
      steps={[
        {
          title: "Determine the spring length change being made",
          detail: "The distance the spring's compressed length changes — from moving a threaded perch, swapping spring free lengths, or any other adjustment at the spring itself.",
        },
        {
          title: "Establish the suspension's motion ratio",
          detail: "The same figure used for spring rate and wheel travel calculations — wheel travel divided by spring travel, usually below 1.0 on most suspension designs.",
        },
        {
          title: "Read the actual ride height change at the wheel",
          detail: "Below a motion ratio of 1.0, this is larger than the spring adjustment itself — the leverage that amplifies wheel travel amplifies ride height change by the same factor.",
        },
      ]}
      formula={[
        {
          label: "Ride height change",
          expression: "ride height change = spring length change ÷ motion ratio",
          note: "Below a motion ratio of 1.0, dividing by a fraction amplifies the result — a small spring adjustment produces a larger ride height change.",
        },
      ]}
      sections={[
        {
          heading: "Why a small perch adjustment can move ride height more than expected",
          paragraphs: [
            "This surprises people setting up coilovers for the first time: a quarter-inch turn on a threaded perch often moves ride height by more than a quarter inch at the fender.",
            "The mechanism is the same leverage relationship behind wheel rate and wheel travel — motion ratio describes how suspension geometry translates movement between the spring and the wheel, and on a design where the spring sits inboard of the wheel's actual pivot point, that geometry amplifies movement rather than transmitting it one-to-one.",
            "This is worth knowing before making large adjustments in one step. A suspension with a 0.7 motion ratio amplifies every spring adjustment by about 1.43 times at the wheel — a half-inch perch adjustment intended to lower the car produces about 0.71 inches of actual ride height change, which can be considerably more than intended if the motion ratio wasn't accounted for.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How much does ride height change when I adjust a coilover perch?",
          answer: "Divide the spring length change by the suspension's motion ratio. With a typical 0.7 motion ratio, a half-inch spring adjustment produces about 0.71 inches of ride height change at the wheel.",
        },
        {
          question: "Why is ride height change different from the spring adjustment I made?",
          answer: "Suspension motion ratio scales movement between the spring and the wheel. Below a motion ratio of 1.0, the wheel moves more than the spring, so ride height changes by more than the raw spring adjustment.",
        },
        {
          question: "What motion ratio do most cars have?",
          answer: "It varies by design, but commonly somewhere between 0.6 and 0.9 on strut and double-wishbone suspensions — meaning the wheel typically moves somewhat more than the spring itself does.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <RideHeightCalculator />
    </ToolPage>
  );
}
