import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { QuarterMileCalculator } from "./ui";

const tool = toolBySlug("quarter-mile-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="There is no exact formula for how fast a specific car accelerates — that depends on the driver, the tires, the surface and the gearing, none of which a weight and a horsepower figure can describe. What exists instead are empirical formulas, fitted to decades of real drag-strip results, that predict what a car in that weight and power class typically runs. This uses the Hale formula for the quarter mile and an energy-based estimate for 0–60, and is honest about which of the two numbers to trust more."
      steps={[
        {
          title: "Use weight with a driver aboard",
          detail:
            "Racing weight includes the driver. Add roughly 180 to 200 pounds to a curb weight figure, and use a full tank rather than the lighter dry weight some spec sheets quote.",
        },
        {
          title: "Use crank horsepower, and be honest about which figure you have",
          detail:
            "These formulas were fitted using crank power. A wheel-measured dyno figure is already lower due to drivetrain loss, and plugging it in as though it were crank power will understate performance further than the formula already does.",
        },
        {
          title: "Set the drivetrain and traction category",
          detail:
            "This only changes the 0–60 estimate, because that figure depends heavily on how well power reaches the road from a standstill. Quarter-mile ET and trap speed do not use this setting.",
        },
        {
          title: "Trust trap speed more than elapsed time",
          detail:
            "Trap speed is measured at the end of a full acceleration run, so a poor launch has less time to distort it. Elapsed time is affected by the first sixty feet more than any other part of the run, which is exactly the part these formulas cannot see.",
        },
        {
          title: "Treat every result as a range to expect, not a time to quote",
          detail:
            "Two cars with identical weight and power figures can run times a full second apart depending on tires, gearing and driver skill. Use this to compare configurations against each other, not to predict an exact number.",
        },
      ]}
      formula={[
        {
          label: "Elapsed time (Hale)",
          expression: "ET = 5.825 × (weight ÷ hp)^(1/3)",
          note: "The current standard, fitted against a large modern dataset of real time-slips by Patrick Hale in the 1980s.",
        },
        {
          label: "Trap speed",
          expression: "speed = 234 × (hp ÷ weight)^(1/3)",
          note: "The companion formula to Hale's ET figure, and the more reliable of the two outputs.",
        },
        {
          label: "0-60 (energy method)",
          expression: "time ≈ kinetic energy at 60 mph ÷ (power × efficiency)",
          note: "Not an industry-standard formula — there isn't one. This treats available power as constant and lets an efficiency factor absorb everything the formula cannot see: traction, drivetrain loss and time away from peak power.",
        },
        {
          label: "Elapsed time (Fox, historical)",
          expression: "ET = 6.29 × (weight ÷ hp)^(1/3)",
          note: "An earlier constant, shown for comparison. Hale's is the one fitted to a larger and more recent dataset.",
        },
      ]}
      sections={[
        {
          heading: "Where these formulas actually come from",
          paragraphs: [
            "None of this is derived from first-principles physics, and it does not claim to be. It is curve-fitting: take a large number of real quarter-mile results — weight, power and the elapsed time and trap speed each car actually ran — and find the constant that best predicts the pattern.",
            "The lineage runs through three names. Roger Huntington produced the first empirical relationship in the 1950s from observed drag-strip data. Geoffrey Fox refined it in the 1960s with a more physics-grounded approach, arriving at the 6.29 constant still shown here for comparison. Patrick Hale re-fitted the constant in the 1980s against a substantially larger and more modern set of results, producing the 5.825 figure that is now the standard reference — cars generally run a little quicker than Fox's era predicted, which the Hale constant reflects.",
            "That history matters for how you should read the output. This is not a simulation of your car's physics. It is a statement about what cars sharing this weight and power figure have tended to run, historically, on a prepared surface, with a reasonable driver. Individual results vary around that prediction, sometimes by a lot.",
          ],
        },
        {
          heading: "Why trap speed deserves more trust than elapsed time",
          paragraphs: [
            "The two figures are not equally reliable, and the difference comes down to when in the run each one is fixed.",
            "Elapsed time is set from the moment the car leaves the line, which means the first sixty feet — dominated entirely by traction and launch technique rather than by the engine — has an outsized effect on the final number. A car that spins its tires for half a second at launch can lose several tenths that no amount of power further down the track will claw back.",
            "Trap speed is measured at the finish line, after a quarter mile of acceleration to average out. A slightly poor launch still costs some trap speed, but nowhere near as much proportionally, because there was far more distance for the car to recover and reach something closer to its potential.",
            "That is why serious analysis of a run leans on trap speed to judge the car's actual performance, and treats elapsed time as telling you more about how well the run was executed than about the car underneath it.",
          ],
        },
        {
          heading: "Why 0-60 has no equivalent standard formula",
          paragraphs: [
            "Unlike the quarter mile, there is no widely accepted empirical constant for 0–60 fitted against a large dataset the way Hale's is. The reason is that 0–60 is dominated even more heavily by launch and traction than a quarter-mile run is, because the whole measurement happens in the window where those factors matter most.",
            "The estimate here instead uses an energy method: the kinetic energy needed to reach 60 mph, divided by the power actually available to produce it. The honest part of that calculation is the efficiency term, which is doing a great deal of work — it has to absorb drivetrain loss, the portion of the run spent below peak power, and above all, traction.",
            "That is why drivetrain and traction are asked for explicitly. A powerful rear-wheel-drive car frequently cannot use anywhere near its full power from a standing start on the street, and the traction preset accounts for that by lowering the assumed efficiency substantially compared with all-wheel drive.",
          ],
        },
        {
          heading: "What consistently moves a real result away from the prediction",
          bullets: [
            "Traction — the single largest factor, and the reason all-wheel drive so often outperforms far more powerful rear-drive cars in a straight line",
            "Track surface — a prepared, sticky drag strip produces materially quicker results than an ordinary road",
            "Altitude and temperature — power falls with thinner, hotter air, and the formulas assume neither",
            "Gearing — a transmission poorly matched to the engine's power band loses real time even with identical peak numbers",
            "Driver skill — launch technique and shift timing routinely account for several tenths between otherwise identical cars",
            "Aerodynamics at higher trap speeds, which the formula does not model at all",
          ],
        },
      ]}
      faqs={[
        {
          question: "How accurate is the Hale quarter-mile formula?",
          answer:
            "It predicts the range a car in a given weight and power class typically runs, fitted against decades of real timeslips. Individual cars can differ by several tenths either way depending on traction, gearing and driver skill, so treat it as an estimate rather than an exact prediction.",
        },
        {
          question: "What is the quarter-mile ET formula?",
          answer:
            "Hale's formula: ET = 5.825 × (weight ÷ horsepower) to the power of one third. It was fitted in the 1980s against a large set of real drag-strip results and is the current standard reference.",
        },
        {
          question: "Why is trap speed more accurate than elapsed time?",
          answer:
            "Trap speed is measured at the end of a full run, after distance has had a chance to average out a poor launch. Elapsed time is set from the moment the car leaves the line, so the first sixty feet — dominated by traction rather than the engine — distorts it disproportionately.",
        },
        {
          question: "How do you calculate 0-60 time from horsepower?",
          answer:
            "There is no equivalent standard formula the way there is for the quarter mile. This tool uses an energy method — kinetic energy at 60 mph divided by power delivered — with an efficiency factor that absorbs drivetrain loss and, above all, traction.",
        },
        {
          question: "Does drivetrain type affect 0-60 time?",
          answer:
            "Substantially, because it changes how much of the engine's power can actually be used from a standing start. All-wheel drive typically launches more efficiently than rear-wheel drive on a street tire, even with identical power and weight.",
        },
        {
          question: "What weight should I use — curb weight or race weight?",
          answer:
            "Weight with a driver aboard and a full tank. Manufacturer curb weight figures usually exclude the driver, which understates the mass actually being accelerated by 180 to 200 pounds.",
        },
        {
          question: "Why do two cars with the same horsepower run different times?",
          answer:
            "Because horsepower and weight are not the only variables. Traction, gearing, track surface, altitude, temperature and driver skill all move the real result, sometimes by more than the difference between two engines.",
        },
        {
          question: "What is the Fox formula?",
          answer:
            "An earlier quarter-mile constant from the 1960s — ET = 6.29 × (weight ÷ horsepower) to the power of one third — refined into today's Hale formula in the 1980s using a larger, more modern dataset. It is shown here for comparison only.",
        },
      ]}
      sources={[fordDynoTips, saeCorrection]}
    >
      <QuarterMileCalculator />
    </ToolPage>
  );
}
