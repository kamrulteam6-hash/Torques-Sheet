import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { PowerToWeightCalculator } from "./ui";

const tool = toolBySlug("power-to-weight-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Horsepower on its own tells you almost nothing about how a vehicle actually performs, because a powerful engine hauling a heavy vehicle can feel slower than a modest engine in something light. Power to weight fixes that by expressing power per unit of mass — and it gets quoted in several different units depending on where you read it, all converted here at once."
      steps={[
        {
          title: "Use weight with a driver, not the brochure figure",
          detail:
            "Manufacturer curb weight is usually measured without a driver or fuel. Add roughly 180 to 200 pounds for a driver, plus a full tank, for a figure that reflects the vehicle as it is actually driven.",
        },
        {
          title: "Use crank horsepower, not wheel horsepower",
          detail:
            "Specification sheets and most quoted power-to-weight figures use power at the engine. If you have a dyno figure measured at the wheels, it already excludes drivetrain loss and will understate the ratio if used directly.",
        },
        {
          title: "Read the unit that matches your source",
          detail:
            "hp per ton dominates American road tests; kW per tonne is standard on European specification sheets; W per kg is the underlying SI figure. All four update from the same two inputs.",
        },
        {
          title: "Use the reference table for context",
          detail:
            "A raw number means little without a comparison. The table places your figure against broad categories, from family sedan to supercar, so you know roughly where it sits.",
        },
        {
          title: "Treat it as a starting point for acceleration, not a finished answer",
          detail:
            "Power to weight predicts acceleration potential well. It says nothing about how much of that potential the vehicle can put to the road, which depends on traction and gearing.",
        },
      ]}
      formula={[
        {
          label: "Horsepower per ton",
          expression: "hp/ton = hp ÷ (weight (lb) ÷ 2000)",
          note: "A US ton is 2000 pounds. This is the figure most commonly quoted in American road tests.",
        },
        {
          label: "Pounds per horsepower",
          expression: "lb/hp = weight (lb) ÷ hp",
          note: "The inverse figure — lower means quicker, which some people find more intuitive than hp/ton.",
        },
        {
          label: "Watts per kilogram",
          expression: "W/kg = (hp × 745.7) ÷ (weight (lb) × 0.4536)",
          note: "The underlying SI figure everything else derives from.",
        },
        {
          label: "kW per tonne",
          expression: "kW/tonne = W/kg",
          note: "Numerically identical to W/kg — a kilowatt per 1000 kg is the same ratio as a watt per kg.",
        },
      ]}
      sections={[
        {
          heading: "Why power to weight predicts acceleration better than power alone",
          paragraphs: [
            "Acceleration is force divided by mass, and the force an engine can apply is directly related to its power output at a given speed. A heavier vehicle needs more force to achieve the same acceleration, which is exactly what dividing power by weight captures.",
            "That is why a 200 hp car at 2,500 pounds outaccelerates a 300 hp car at 4,500 pounds despite having a third less power — 160 hp/ton against 133 hp/ton. Weight is working against the heavier car faster than its extra power can work for it.",
            "It is not a perfect predictor, because it says nothing about where in the rev range the power arrives, how well the drivetrain can put it down, or how the gearing is arranged. But as a single number for comparing vehicles at a glance, it outperforms horsepower alone by a wide margin.",
          ],
        },
        {
          heading: "Why the unit changes depending on where you read it",
          paragraphs: [
            "Horsepower per ton is the dominant unit in American road-test journalism, largely because both horsepower and pounds are already the customary units those publications use for everything else.",
            "European and most international manufacturers publish kW per tonne instead, following the same logic in metric units. Watts per kilogram is the same figure at SI base-unit scale, more common in engineering and physics contexts than in consumer material.",
            "None of them is more correct than another — they are the same physical ratio scaled differently, which is exactly why converting between them is worth doing rather than trying to compare a European kW/tonne figure against an American hp/ton one by eye.",
          ],
        },
        {
          heading: "What the ratio does not tell you",
          bullets: [
            "Nothing about traction — a powerful rear-wheel-drive car often cannot use its full power-to-weight advantage from a standing start",
            "Nothing about where the power arrives in the rev range, which affects how usable it feels on the road",
            "Nothing about aerodynamic drag, which increasingly limits acceleration as speed rises",
            "Nothing about gearing, which decides how effectively that power reaches the wheels at any given speed",
            "Nothing about sustained performance — a figure can be high at peak and still fall away quickly under load",
            "It is the right tool for a first comparison between vehicles, and the wrong tool for predicting an exact lap time or elapsed time",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is a good power-to-weight ratio?",
          answer:
            "Context-dependent, but roughly: 100 hp/ton is a typical family sedan, 150–180 is a quick sports sedan, 250 or more is a serious sports car, and supercars run 350 and up.",
        },
        {
          question: "How do I calculate power-to-weight ratio?",
          answer:
            "Divide horsepower by weight in tons — weight in pounds divided by 2000. A 3,500 lb car with 300 hp is 300 ÷ 1.75, or about 171 hp/ton.",
        },
        {
          question: "Should I use curb weight or weight with a driver?",
          answer:
            "Weight with a driver and fuel gives the more realistic figure, since that is the mass actually being accelerated. Add roughly 180–200 lb to the brochure curb weight for a driver.",
        },
        {
          question: "Is power-to-weight the same as horsepower per liter?",
          answer:
            "No — those are different ratios entirely. Horsepower per liter measures how much power an engine extracts from its displacement. Power-to-weight measures how much power is available to move the vehicle's mass.",
        },
        {
          question: "How do I convert hp/ton to kW/tonne?",
          answer:
            "Multiply hp/ton by 0.7457, since one horsepower is 0.7457 kW and a ton and a tonne are close enough (2000 lb vs 2205 lb) that this calculator handles the small difference for you automatically.",
        },
        {
          question: "Does power-to-weight predict 0-60 time accurately?",
          answer:
            "It predicts the general range well but not an exact figure, because traction, gearing and where the power arrives in the rev range all matter too. Two vehicles with identical power-to-weight can have noticeably different 0–60 times.",
        },
        {
          question: "Why does my heavy truck feel slow despite decent horsepower?",
          answer:
            "Because horsepower alone does not account for mass. A 400 hp truck at 6,000 lb is only 133 hp/ton — similar to a modest family sedan — despite a horsepower figure that sounds much larger.",
        },
        {
          question: "Is wheel horsepower or crank horsepower used for this ratio?",
          answer:
            "Crank horsepower, which is what specification sheets quote. Using a wheel-measured dyno figure directly will understate the ratio, since it already excludes drivetrain losses.",
        },
      ]}
      sources={[fordDynoTips, saeCorrection]}
    >
      <PowerToWeightCalculator />
    </ToolPage>
  );
}
