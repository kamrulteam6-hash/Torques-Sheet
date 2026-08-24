import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { OverallGearRatioCalculator } from "./ui";

const tool = toolBySlug("overall-gear-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Neither the transmission gear ratio nor the final drive ratio alone relates engine speed to road speed — they have to be multiplied together, and on a four-wheel-drive vehicle in low range, a transfer case ratio joins them too. This calculates the single overall number that chain actually produces."
      steps={[
        {
          title: "Enter the transmission gear ratio",
          detail: "Whichever gear you're examining — first for maximum torque multiplication, top gear for cruising. Get this from the transmission gear ratio calculator if you don't already have it.",
        },
        {
          title: "Enter the final drive (axle) ratio",
          detail: "This is fixed regardless of which transmission gear is selected. Get it from the differential tag, or work it out from tooth counts.",
        },
        {
          title: "Set the transfer case ratio if the vehicle has one",
          detail: "Leave it at 1.00 for any two-wheel-drive vehicle, or a four-wheel-drive vehicle in high range. Switch it for low range, where the transfer case adds its own multiplication.",
        },
        {
          title: "Read the overall ratio as the figure that matters",
          detail: "This is what actually relates engine RPM to road speed and to torque at the wheels — the individual gear and axle numbers are only useful once combined.",
        },
      ]}
      formula={[
        {
          label: "Overall ratio (2WD or high range)",
          expression: "overall ratio = gear ratio × final drive ratio",
          note: "The everyday case for the vast majority of driving.",
        },
        {
          label: "Overall ratio (4WD low range)",
          expression: "overall ratio = gear ratio × final drive ratio × transfer case ratio",
          note: "Low range adds a third multiplier, often 2:1 to 4:1, for situations needing maximum torque at low speed.",
        },
      ]}
      sections={[
        {
          heading: "Why nothing in the chain works alone",
          paragraphs: [
            "Engine speed and road speed are related by every stage of gear reduction between them, multiplied together — not by any single stage in isolation.",
            "That is why a 3.5:1 first gear paired with a 3.08:1 axle behaves differently from the same 3.5:1 first gear paired with a 4.10:1 axle, even though the transmission is identical in both cases. The overall ratio — 10.78:1 against 14.35:1 — is what the engine and the road actually experience, and it differs by more than a third between those two axle options.",
            "This is also why comparing two vehicles by axle ratio alone, or by transmission alone, tells you less than it seems to. A numerically higher axle paired with a taller overdrive can land at a similar overall ratio to a lower axle paired with a shorter top gear — same result, different components getting there.",
          ],
        },
        {
          heading: "What low range actually adds",
          paragraphs: [
            "A transfer case's low range is a further fixed reduction inserted between the transmission and the axles, used when maximum torque multiplication matters more than road speed — technical off-road terrain, or heavy pulling at low speed.",
            "Because it multiplies into the existing chain rather than replacing anything, its effect is straightforward: an overall ratio that might be 10.6:1 in high range can become 28 or 30:1 in low range with a typical 2.72:1 transfer case, or considerably higher with the deeper cases — sometimes over 4:1 — found on dedicated off-road vehicles.",
            "That is an enormous amount of torque multiplication and a correspondingly low top speed in the gear, which is exactly the trade low range exists to make.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate overall gear ratio?",
          answer: "Multiply the transmission gear ratio by the final drive (axle) ratio. On a four-wheel-drive vehicle in low range, multiply by the transfer case ratio as well.",
        },
        {
          question: "What is a typical overall ratio in first gear?",
          answer: "Commonly somewhere between 8:1 and 14:1 on a passenger vehicle, depending on the transmission's first gear ratio and the axle ratio fitted.",
        },
        {
          question: "Does transfer case ratio apply in every gear?",
          answer: "Yes — when low range is selected, the transfer case's reduction multiplies into whichever transmission gear is also engaged, on top of the axle ratio.",
        },
        {
          question: "Why do two vehicles with different axle ratios feel similar?",
          answer: "Because overall ratio, not axle ratio alone, determines feel. A numerically higher axle paired with a taller top gear can land at a similar overall ratio to a lower axle with a shorter top gear.",
        },
        {
          question: "What is the overall ratio used for?",
          answer: "It is the single number that actually relates engine speed to road speed and torque at the wheels — used directly by the RPM/speed calculator and the wheel torque calculator.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <OverallGearRatioCalculator />
    </ToolPage>
  );
}
