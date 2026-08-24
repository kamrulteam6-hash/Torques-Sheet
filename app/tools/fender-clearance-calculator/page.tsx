import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { rimWidthRange, tireRimAssociation } from "../tool-sources";
import { FenderClearanceCalculator } from "./ui";

const tool = toolBySlug("fender-clearance-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Calculated clearance and measured clearance are different things, and this tool is explicit about which one it gives you: a starting-point figure built from a real measurement you take yourself, not a prediction from vehicle specifications alone. Measure the current gap, add however far a change moves the tire outward, and see what's left."
      steps={[
        {
          title: "Measure the current gap yourself",
          detail: "Between the tire's outer edge and the fender lip, with the vehicle sitting at normal ride height and the wheel pointed straight ahead. This baseline is the entire foundation of the calculation.",
        },
        {
          title: "Get the outward movement figure",
          detail: "From the wheel fitment calculator (a wheel or tire change) or the tire size comparison tool (a tire size change alone) — whichever change you're evaluating.",
        },
        {
          title: "Read the remaining clearance",
          detail: "This is the static figure — what's left with the vehicle standing still, wheel straight.",
        },
        {
          title: "Always verify dynamically before finalising",
          detail: "Turn the wheel to full lock in both directions and, if possible, check under suspension compression. Static clearance is always the most generous number you'll see.",
        },
      ]}
      formula={[
        {
          label: "Remaining clearance",
          expression: "remaining = baseline measurement − outward movement",
          note: "Simple subtraction — the value of this tool is in being explicit about what the baseline requires (a real measurement) rather than in the arithmetic itself.",
        },
      ]}
      sections={[
        {
          heading: "Why this tool insists on a measured baseline",
          paragraphs: [
            "Predicting absolute fender clearance from vehicle specifications alone is unreliable — factory tolerances, aftermarket suspension modifications, and even small variations in how a vehicle sits from side to side all mean the only trustworthy starting point is a measurement taken on the actual vehicle in front of you.",
            "That is why this tool asks for a baseline rather than trying to calculate one. The value it adds is turning 'how much clearance is left after this change' into a straightforward subtraction, once you supply the one number that genuinely needs measuring.",
            "The output is deliberately labelled as a static, at-rest figure. Real clearance is always tighter at full steering lock and under suspension compression than the standing measurement suggests, which is why the calculation here is a planning tool rather than a final verification.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I measure baseline fender clearance?",
          answer: "With the vehicle at normal ride height and the wheel pointed straight ahead, measure the gap between the tire's outer sidewall and the fender lip directly.",
        },
        {
          question: "Why does this need a measured baseline instead of calculating from scratch?",
          answer: "Factory tolerances, suspension modifications and side-to-side variation make absolute clearance unreliable to predict from specifications alone — a real measurement on the actual vehicle is the only trustworthy starting point.",
        },
        {
          question: "Is the calculated remaining clearance the real minimum?",
          answer: "No — it's the static figure with the vehicle standing still and the wheel straight. Real clearance is always tighter at full steering lock and under suspension compression, so always verify physically before finalising a tight fitment.",
        },
      ]}
      sources={[tireRimAssociation, rimWidthRange]}
    >
      <FenderClearanceCalculator />
    </ToolPage>
  );
}
