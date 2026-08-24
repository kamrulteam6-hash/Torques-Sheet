import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { AirFuelLambdaCalculator } from "./ui";

const tool = toolBySlug("air-fuel-lambda-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Air-fuel ratio and lambda describe the same mixture strength in two different ways. AFR is an absolute ratio that means something different on every fuel — 14.7:1 is stoichiometric on gasoline but wildly lean on E85. Lambda normalizes that away: 1.0 always means the chemically ideal mixture, whatever fuel is in the tank, which is why tuning software increasingly works in lambda rather than AFR."
      steps={[
        {
          title: "Select the fuel first",
          detail: "Everything else depends on it. The same lambda value corresponds to a completely different AFR number depending on which fuel is selected, because each fuel has its own stoichiometric point.",
        },
        {
          title: "Enter whichever figure you have",
          detail: "A wideband gauge, a dyno printout or tuning software might report either AFR or lambda — enter it into either field and the other converts immediately.",
        },
        {
          title: "Read the mixture description",
          detail: "Lambda below 1.0 is rich (more fuel than the chemically ideal amount); above 1.0 is lean (less fuel). This holds regardless of which fuel is selected, which is the whole point of using lambda.",
        },
        {
          title: "Use the fuel table to compare AFRs across fuels",
          detail: "At a fixed lambda, the table shows what AFR that same mixture strength represents on every listed fuel — useful when switching between gasoline and E85 tunes.",
        },
      ]}
      formula={[
        {
          label: "Lambda from AFR",
          expression: "λ = AFR ÷ stoichiometric AFR (for that fuel)",
          note: "Lambda is a ratio of ratios — it expresses how far the actual mixture sits from that fuel's own chemically ideal point.",
        },
        {
          label: "AFR from lambda",
          expression: "AFR = λ × stoichiometric AFR (for that fuel)",
          note: "The same relationship reversed. This is why lambda 1.0 always means stoichiometric, on any fuel.",
        },
      ]}
      sections={[
        {
          heading: "Why lambda exists, and why it matters more on alternative fuels",
          paragraphs: [
            "Air-fuel ratio makes intuitive sense on a single fuel — a number you learn to associate with rich, lean or ideal. The problem appears the moment a second fuel enters the picture.",
            "Gasoline's stoichiometric point is 14.7:1. E85 needs roughly 50% more fuel for the same chemically ideal mixture, landing near 9.8:1. Someone reading an AFR gauge calibrated for gasoline, on a car running E85, would see numbers that look alarmingly rich by gasoline standards while the engine is actually running exactly at stoichiometric.",
            "Lambda sidesteps that entirely. Because it is normalized against each fuel's own stoichiometric point, lambda 1.0 means the same thing — chemically ideal — no matter what is in the tank. That portability is why most modern tuning software, and increasingly most wideband displays, default to lambda rather than AFR.",
          ],
        },
        {
          heading: "Where the stoichiometric figures come from",
          paragraphs: [
            "Stoichiometric AFR is a chemistry calculation — the exact mass of air needed to completely combust a given mass of fuel, with nothing left over on either side. It depends on the fuel's molecular composition, which is why ethanol-blended and alcohol fuels sit so far from gasoline.",
            "Ethanol carries oxygen in its own molecule, so it needs proportionally less air to burn completely than gasoline does — which is also why blended fuels lower the stoichiometric figure roughly in proportion to how much ethanol they contain. E10 sits close to gasoline at 14.1:1; E85 sits much further away at roughly 9.8:1; pure ethanol lower still.",
            "The figures used here are the commonly cited reference values across tuning literature. Real fuel batches vary somewhat — actual ethanol content in a nominal E85 blend can range meaningfully by season and supplier — so a wideband reading against a fuel-specific target remains the ground truth over any calculated AFR.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is the difference between AFR and lambda?",
          answer: "AFR is an absolute air-to-fuel mass ratio that means something different on every fuel. Lambda normalizes AFR against each fuel's own stoichiometric point, so lambda 1.0 always means the chemically ideal mixture regardless of fuel.",
        },
        {
          question: "What is stoichiometric AFR for E85?",
          answer: "Roughly 9.8:1, against 14.7:1 for gasoline — E85 needs about 50% more fuel by mass for the same chemically ideal mixture, because ethanol carries oxygen in its own molecule.",
        },
        {
          question: "Is lambda 1.0 always the same as 14.7:1 AFR?",
          answer: "Only on gasoline. Lambda 1.0 on E85 is about 9.8:1 AFR; on methanol it is about 6.4:1. Lambda 1.0 always means stoichiometric, but the corresponding AFR number depends entirely on the fuel.",
        },
        {
          question: "How do I convert AFR to lambda?",
          answer: "Divide the AFR by that fuel's stoichiometric AFR. A gasoline engine reading 13.2:1 AFR is at lambda 0.898 — moderately rich of stoichiometric.",
        },
        {
          question: "Why does E85 need a richer AFR number than gasoline?",
          answer: "It doesn't run richer in a meaningful sense — its stoichiometric point is simply a lower number. An E85 engine at its own stoichiometric AFR (lambda 1.0) is running exactly as ideally as a gasoline engine at 14.7:1.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <AirFuelLambdaCalculator />
    </ToolPage>
  );
}
