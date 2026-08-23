import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { PowerCalculator } from "./ui";

const tool = toolBySlug("horsepower-torque-rpm-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Horsepower, torque and engine speed are not three independent things. They are one relationship written three ways, which is why a horsepower calculator, a torque calculator and an RPM calculator are all the same tool with a different unknown. Give this any two figures and it returns the third, in both imperial and metric units."
      steps={[
        {
          title: "Decide which figure you are missing",
          detail:
            "Choose horsepower, torque or RPM at the top. The calculator hides whichever one it is solving for so there is no ambiguity about which numbers are inputs.",
        },
        {
          title: "Enter the two figures you have",
          detail:
            "They must describe the same instant. Peak torque and peak horsepower almost never occur at the same engine speed, so pairing a peak torque figure with a peak power RPM produces a number that means nothing.",
        },
        {
          title: "Read the metric equivalents alongside",
          detail:
            "kW, Nm and PS are shown for every result. European and Japanese specifications are usually quoted in kW or PS, and PS is about 1.4% larger than a mechanical horsepower.",
        },
        {
          title: "Use the table to see the shape of it",
          detail:
            "The table shows what a fixed torque figure produces across the rev range, and what torque would be needed at each speed to hold a fixed horsepower. That is the relationship made visible.",
        },
        {
          title: "Check where 5,252 falls",
          detail:
            "Below that speed torque exceeds horsepower numerically; above it, horsepower exceeds torque. Any dyno graph where the two curves fail to cross at 5,252 has an axis problem rather than an engine one.",
        },
      ]}
      formula={[
        {
          label: "Horsepower",
          expression: "hp = torque (lb·ft) × rpm ÷ 5252",
          note: "The standard relationship. Torque is the twisting effort; multiplying by speed turns it into a rate of work.",
        },
        {
          label: "Torque",
          expression: "torque (lb·ft) = hp × 5252 ÷ rpm",
          note: "The same equation rearranged. This is what a torque calculator does.",
        },
        {
          label: "Engine speed",
          expression: "rpm = hp × 5252 ÷ torque (lb·ft)",
          note: "Rearranged again — useful for finding the speed at which a claimed pair of figures could both be true.",
        },
        {
          label: "Where 5252 comes from",
          expression: "5252 = 33,000 ÷ (2 × π)",
          note: "One horsepower was defined as 33,000 foot-pounds of work per minute. Dividing by 2π converts rotational travel into linear distance.",
        },
      ]}
      sections={[
        {
          heading: "Torque is force, horsepower is force over time",
          paragraphs: [
            "The clearest way to separate them is this: torque is how hard the engine twists the crankshaft at a given moment. Horsepower is how quickly it can keep doing that.",
            "An engine producing 400 lb·ft at 2,000 rpm and an engine producing 400 lb·ft at 6,000 rpm are twisting exactly as hard. The second one is doing it three times as often, so it is performing three times as much work per minute — 457 hp against 152 hp.",
            "That is why horsepower is what determines how fast a vehicle can accelerate a given mass, and why torque alone tells you very little without knowing where in the rev range it arrives.",
            "It is also why gearing matters so much. A transmission multiplies torque at the cost of speed, so an engine that makes its torque high in the range can be geared to deliver the same effort at the wheels as a lower-revving engine. The engine that makes more power will always win that exchange, whatever the torque figures say.",
          ],
        },
        {
          heading: "Why every dyno graph crosses at 5,252",
          paragraphs: [
            "Put a horsepower curve and a torque curve on the same axes and they will always intersect at 5,252 rpm. Every time, on every engine. It looks like a coincidence and it is not.",
            "The reason is in the formula. Horsepower equals torque multiplied by rpm divided by 5,252. When rpm is exactly 5,252, that division cancels the multiplication and horsepower equals torque numerically.",
            "Below 5,252 the torque figure is numerically larger. Above it, the horsepower figure is. This has nothing to do with the engine and everything to do with the units — it is an artefact of how the horsepower was defined in the first place.",
            "It is genuinely useful as a sanity check. If someone shows you a dyno sheet where the curves cross somewhere else, the graph is mislabelled, the axes are scaled differently, or the figures are not what they claim to be.",
          ],
        },
        {
          heading: "Which horsepower is being quoted",
          bullets: [
            "Mechanical (imperial) horsepower — 745.7 watts, the figure this calculator uses",
            "Metric horsepower, or PS — 735.5 watts, so about 1.4% larger a number for the same engine",
            "Kilowatts — the SI unit, and the least ambiguous of the three",
            "Crank horsepower — measured at the flywheel, before any drivetrain losses",
            "Wheel horsepower — measured at the tires, typically 15% lower on rear-wheel drive and more on all-wheel drive",
            "A 300 PS engine and a 300 hp engine are not the same engine, and neither is a 300 whp one",
          ],
        },
        {
          heading: "Reading a claim critically",
          paragraphs: [
            "Because the three figures are locked together, any two of them imply the third. That makes this arithmetic a useful check on numbers that sound impressive.",
            "If a claim gives peak power and the speed it occurs at, the torque at that point follows exactly. An engine advertised at 500 hp at 6,500 rpm is producing 404 lb·ft at that moment — regardless of what its peak torque figure says lower down.",
            "That last distinction is where most confusion lives. Peak torque and peak power occur at different engine speeds on essentially every engine, so pairing a peak torque number with a peak power engine speed describes a point the engine never actually reaches.",
            "It is also worth asking where a figure was measured. Crank and wheel horsepower differ by drivetrain losses, and the gap widens with all-wheel drive and automatic transmissions. Two numbers measured in different places are not comparable, however precisely each was recorded.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do you calculate horsepower from torque?",
          answer:
            "Multiply torque in pound-feet by engine speed in RPM, then divide by 5,252. So 400 lb·ft at 5,000 rpm gives about 381 hp.",
        },
        {
          question: "How do you calculate torque from horsepower?",
          answer:
            "Multiply horsepower by 5,252 and divide by RPM. It is the same equation rearranged — there is no separate torque formula.",
        },
        {
          question: "Why is 5252 used in the horsepower formula?",
          answer:
            "Because one horsepower was defined as 33,000 foot-pounds of work per minute, and converting rotation into linear distance divides by 2π. 33,000 divided by 2π is 5,252.",
        },
        {
          question: "Why do horsepower and torque curves cross at 5252 RPM?",
          answer:
            "At exactly 5,252 rpm the multiplication and division in the formula cancel out, so the two figures are numerically equal. It is a property of the units, not of any particular engine.",
        },
        {
          question: "What is more important, horsepower or torque?",
          answer:
            "Horsepower, for how quickly a vehicle accelerates, because it already accounts for how fast the torque is being delivered. Torque matters for how the engine feels and how much gearing it needs.",
        },
        {
          question: "Is PS the same as horsepower?",
          answer:
            "No. Metric horsepower, or PS, is 735.5 watts against 745.7 for mechanical horsepower, so a PS figure is about 1.4% higher for the same engine.",
        },
        {
          question: "What is the difference between crank and wheel horsepower?",
          answer:
            "Crank horsepower is measured at the flywheel before drivetrain losses. Wheel horsepower is measured at the tires and is typically around 15% lower on rear-wheel drive, more on all-wheel drive.",
        },
        {
          question: "Can I calculate horsepower without knowing RPM?",
          answer:
            "Not from torque alone. Torque without engine speed describes effort with no rate attached, and horsepower is fundamentally a rate of doing work.",
        },
      ]}
    >
      <PowerCalculator />
    </ToolPage>
  );
}
