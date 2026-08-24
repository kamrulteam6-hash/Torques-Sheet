import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { BrakeRotorSizeCalculator } from "./ui";

const tool = toolBySlug("brake-rotor-size-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A rotor's job is converting kinetic energy into heat, once, every stop — and how much energy a single stop represents is exact physics from weight and speed alone. What rotor diameter actually copes with that heat load depends on far more than this page can calculate precisely, which is why it pairs the energy figure with rule-of-thumb sizing guidance rather than pretending to a false precision."
      steps={[
        {
          title: "Enter weight and the speed a stop starts from",
          detail: "Kinetic energy scales with the square of speed, so a stop from 100 mph represents far more than twice the energy of a stop from 50 mph — worth checking against the highest realistic speed the vehicle actually sees.",
        },
        {
          title: "Enter wheel diameter",
          detail: "Rotor sizing guidance is conventionally expressed as a fraction of overall wheel diameter, since the rotor has to physically fit inside the wheel with clearance for the caliper.",
        },
        {
          title: "Read energy per stop as the real physics",
          detail: "This figure is exact — it doesn't depend on assumptions about the brake hardware, only on the vehicle's mass and speed.",
        },
        {
          title: "Read the sizing guidance as a starting point, not a specification",
          detail: "Rotor selection in practice also depends on caliper choice, pad compound, cooling ducting and how repeatedly the vehicle needs to absorb this energy without excessive heat buildup — factors this page cannot see.",
        },
      ]}
      formula={[
        {
          label: "Kinetic energy per stop",
          expression: "KE (ft·lb) = 0.5 × mass (slugs) × speed (ft/s)²",
          note: "Standard kinetic energy, converted into the units a brake system's heat capacity is usually discussed in — mass in slugs comes from weight in pounds divided by gravitational acceleration.",
        },
        {
          label: "Converting to BTU",
          expression: "BTU = ft·lb ÷ 778.169",
          note: "The mechanical equivalent of heat, letting the energy figure be compared directly against a rotor and pad's thermal capacity.",
        },
      ]}
      sections={[
        {
          heading: "Why speed matters more than weight for stopping energy",
          paragraphs: [
            "Kinetic energy scales linearly with mass but with the square of speed, which means the speed a stop starts from dominates the energy calculation far more than the vehicle's weight does.",
            "A stop from 100 mph represents roughly 2.8 times the energy of a stop from 60 mph — not 67% more, which a linear intuition might suggest, but nearly triple. This is the physical reason track-oriented vehicles need dramatically more brake capacity than their street-driven weight alone would suggest: it is the repeated high-speed stops, not the mass, that drives the real heat load.",
            "It's also why a genuinely honest rotor sizing conversation starts with the highest realistic speed the vehicle sees, repeated as many times as the actual use case demands, rather than a single low-speed stop calculation.",
          ],
        },
        {
          heading: "Why sizing guidance stays a range rather than a single number",
          paragraphs: [
            "The rule-of-thumb figures here — rotor diameter as a fraction of wheel diameter — reflect broad industry practice rather than a calculated physical requirement, because the actual thermal capacity a rotor provides depends on more than just its diameter.",
            "Rotor thickness, vane design on a vented rotor, mass, and how effectively air actually reaches the rotor through the wheel and any ducting all affect real thermal capacity independent of diameter alone. Two rotors of identical diameter can have meaningfully different heat capacity depending on these factors.",
            "That is why this page gives energy per stop as an exact figure — a genuine physical quantity the rotor and pads have to absorb — paired with sizing guidance as a starting range, rather than pretending to calculate a specific rotor diameter from first principles.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate the energy a brake rotor needs to dissipate?",
          answer: "Kinetic energy equals half the vehicle's mass (in slugs, weight divided by 32.174) times speed squared (in feet per second), converted to BTU by dividing by 778.169.",
        },
        {
          question: "What size brake rotor do I need?",
          answer: "As a rough guide, street driving suits a rotor at roughly 60% of wheel diameter, spirited street or occasional track use around 65%, and dedicated track use around 70% — but actual capacity also depends on rotor thickness, design and cooling.",
        },
        {
          question: "Why does speed matter more than weight for rotor sizing?",
          answer: "Kinetic energy scales with the square of speed but only linearly with mass, so a stop from a higher speed represents disproportionately more energy than the same increase in weight would.",
        },
        {
          question: "Does bigger rotor diameter always mean better braking?",
          answer: "It increases the leverage effective radius provides for torque at a given clamp force, and generally adds thermal mass — but rotor thickness, vane design and actual airflow to the rotor all affect real capacity too.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <BrakeRotorSizeCalculator />
    </ToolPage>
  );
}
