import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { TorqueAngleCalculator } from "./ui";

const tool = toolBySlug("torque-angle-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Torque-to-yield fasteners — common on cylinder head bolts and many structural connections — are tightened to a modest snug torque, then rotated a further specified angle rather than tightened to a final torque figure. This turns that angle into the actual linear distance the fastener travels, which is what makes the method make physical sense."
      steps={[
        {
          title: "Get the thread pitch for the fastener",
          detail: "From the bolt's specification or a size chart — this determines how far one full turn actually advances the fastener.",
        },
        {
          title: "Enter the specified additional turn angle",
          detail: "From the torque-to-yield specification — commonly 90 degrees, but check the actual service manual figure for the specific application.",
        },
        {
          title: "Read the additional clamp travel",
          detail: "This is the real physical distance the fastener advances during that angle turn — the number the torque-angle method is actually targeting.",
        },
      ]}
      formula={[
        {
          label: "Additional clamp travel",
          expression: "travel = pitch × (angle ÷ 360)",
          note: "A turn angle is simply a fraction of a full revolution, and a full revolution advances the fastener by exactly one pitch.",
        },
      ]}
      sections={[
        {
          heading: "Why torque-to-yield uses angle instead of a final torque figure",
          paragraphs: [
            "A torque-to-yield fastener is designed to be tightened past its elastic limit — into the range where it permanently, slightly stretches. That stretch is what produces a very consistent, precisely known clamp load, but it also means the relationship between torque and clamp load stops being predictable once yield begins, because the bolt is no longer behaving elastically.",
            "Torque cannot reliably control the outcome in that regime, which is exactly why the method switches to angle instead. Once yield starts, further rotation produces a known, repeatable amount of additional stretch regardless of the torque required to produce it — which is precisely the property this calculator makes concrete by converting that angle into an actual travel distance.",
            "This is also why torque-to-yield fasteners are generally single-use: the permanent stretch that gives the method its precision means the bolt has already been taken past its elastic range, and reusing it risks yielding further on a second installation with much less predictable results.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate torque-to-yield clamp travel?",
          answer: "Multiply the thread pitch by the turn angle divided by 360. A 1.5mm pitch bolt turned an additional 90 degrees advances about 0.375mm.",
        },
        {
          question: "Why does torque-to-yield use an angle instead of a final torque?",
          answer: "Because the fastener is tightened past its elastic limit, where torque no longer predictably relates to clamp load. Angle produces a known, repeatable amount of stretch regardless of the torque needed to achieve it.",
        },
        {
          question: "Can I reuse a torque-to-yield bolt?",
          answer: "Generally not recommended. The method relies on permanently stretching the fastener past its elastic range, and reusing it risks yielding further with much less predictable clamp load on a second installation.",
        },
        {
          question: "What is a typical torque-to-yield angle specification?",
          answer: "It varies by application, but 90 degrees is common on many cylinder head bolt specifications. Always use the specific figure from the service manual for the application at hand.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <TorqueAngleCalculator />
    </ToolPage>
  );
}
