import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { RegearCalculator } from "./ui";

const tool = toolBySlug("regear-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Most gear ratio tools answer 'what does this ratio produce?'. This one answers the opposite question: 'what ratio produces the RPM I want?' — useful when planning a build around a target cruising speed, choosing gears to suit a large tire before ordering them, or matching a specific highway RPM rather than checking one after the fact."
      steps={[
        {
          title: "Decide on a target engine speed",
          detail: "This is usually a comfortable cruising RPM, or an RPM that keeps a torque converter or a camshaft in its efficient range. There is no universal right answer — it depends on the engine and the goal.",
        },
        {
          title: "Set the road speed that target applies at",
          detail: "70 mph is a common highway reference in the US, but use whatever speed actually matters for the build — a tow rig's cruising speed differs from a daily driver's.",
        },
        {
          title: "Enter the top gear ratio",
          detail: "Whichever gear the vehicle spends the most time in at that speed — usually the highest gear, often an overdrive below 1.00.",
        },
        {
          title: "Enter the tire size that will actually be fitted",
          detail: "This has to be the final tire size, not the current one — the whole point of a regear calculation is usually to compensate for a size that has changed or is about to.",
        },
        {
          title: "Compare the exact answer against what is actually available",
          detail: "Ring and pinion sets come in a fixed set of ratios. The table shows how each standard option performs against your target, so the choice is made with numbers rather than a guess.",
        },
      ]}
      formula={[
        {
          label: "Axle ratio for a target RPM",
          expression: "axle ratio = (target RPM × π × tire diameter) ÷ (mph × gear ratio × 1056)",
          note: "The standard RPM formula solved for axle ratio instead of RPM — the same relationship, rearranged for the question being asked.",
        },
      ]}
      sections={[
        {
          heading: "Why start from a target instead of checking a result",
          paragraphs: [
            "The gear ratio calculator answers a forward question: given this axle ratio and this tire, what RPM results? That is the right tool when a ratio is already fixed and you want to know its consequence.",
            "This tool exists for the opposite situation — planning before anything is bought. Someone building a tow vehicle, fitting a significantly larger tire, or simply wanting the engine to sit at a specific RPM on the highway does not yet have a ratio to check. They have a target, and the practical question is which ratio gets them there.",
            "Both tools solve the identical underlying relationship between RPM, road speed, gear ratio, axle ratio and tire diameter — they simply solve it for a different unknown, which is why either can be used to check the other's answer.",
          ],
        },
        {
          heading: "Why the exact answer usually isn't for sale",
          paragraphs: [
            "Ring and pinion sets are manufactured in a fixed set of tooth-count combinations, which means the ratios available in the real world cluster around familiar numbers — 3.55, 3.73, 4.10, 4.56 and similar — rather than forming a continuous range.",
            "Solve for a target RPM and the exact figure that comes out will almost never be one of those numbers. The practical decision is which side of it to land on: a numerically higher ratio than calculated slightly over-corrects, giving marginally more RPM and torque than the target asked for; a numerically lower ratio under-corrects, leaving some of the shortfall in place.",
            "For a vehicle that tows or works for a living, over-correcting is usually the safer error — extra torque is rarely unwelcome. For a vehicle built mainly to cruise efficiently, under-correcting keeps the engine a little quieter and more relaxed. The table above shows exactly how far off each standard option leaves you, so that choice is made deliberately.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate the axle ratio I need?",
          answer: "Multiply your target RPM by π and the tire diameter, then divide by road speed, the transmission gear ratio and 1056. This tool does that calculation directly from the numbers you enter.",
        },
        {
          question: "What RPM should I target when regearing?",
          answer: "There's no universal figure — it depends on the engine and the goal. A common approach is choosing a comfortable, efficient cruising RPM at a typical highway speed, often somewhere between 1,800 and 2,500 rpm on a modern engine.",
        },
        {
          question: "Why doesn't my calculated ratio match anything I can buy?",
          answer: "Ring and pinion sets are manufactured in a fixed set of tooth-count combinations, so the calculated figure almost never lands exactly on a real option. Choose the nearest available ratio and check how far off it leaves you.",
        },
        {
          question: "Should I round up or down to the nearest available ratio?",
          answer: "For towing or heavy use, rounding up (numerically higher) usually suits better, trading slightly more RPM for more torque. For a vehicle mainly cruising, rounding down keeps the engine quieter.",
        },
        {
          question: "Do I need to know my current gear ratio to use this?",
          answer: "No — this tool works from a target RPM forward to the ratio needed, not from your current setup. If you want to compare against what you have now, the gear ratio calculator checks a known ratio's result instead.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <RegearCalculator />
    </ToolPage>
  );
}
