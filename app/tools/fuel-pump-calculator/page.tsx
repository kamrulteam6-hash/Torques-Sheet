import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { FuelPumpCalculator } from "./ui";

const tool = toolBySlug("fuel-pump-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A fuel pump has to supply everything the injectors will ever ask for, with margin left over — because pump output falls as voltage sags and as the pump ages, and because a pump running at the edge of its capacity runs hotter and wears faster. This works out the bare requirement and a properly margined figure separately."
      steps={[
        {
          title: "Set the target power figure",
          detail: "Use the peak power the fuel system needs to support, not an average or typical figure — the pump has to cover the worst case, which is wide-open throttle at redline.",
        },
        {
          title: "Match BSFC to how the engine will actually be run",
          detail: "A more aggressive tune burns fuel less efficiently per unit of power, which raises BSFC and, with it, the flow the pump has to supply.",
        },
        {
          title: "Keep a genuine safety margin",
          detail: "25% is a common default. Battery voltage sag under load, line and filter restriction, and a pump's output naturally declining somewhat with age and wear all eat into rated flow before it reaches the rail.",
        },
        {
          title: "Compare the result against a specific pump's rated flow",
          detail: "Pump manufacturers rate flow at a specific voltage and pressure — check that the comparison is apples to apples before assuming a pump is adequate.",
        },
      ]}
      formula={[
        {
          label: "Required pump flow",
          expression: "flow (lb/hr) = target hp × BSFC × safety factor",
          note: "The same fuel-consumption relationship the injector calculator uses, with a margin built in.",
        },
        {
          label: "Converting to litres per hour",
          expression: "LPH = (lb/hr ÷ 6.15 lb per US gallon) × 3.785 litres per gallon",
          note: "Gasoline's typical density, converted through US gallons into the litres-per-hour figure pumps are usually rated in.",
        },
      ]}
      sections={[
        {
          heading: "Why a margin matters more here than almost anywhere else in the fuel system",
          paragraphs: [
            "A fuel pump is the one component in the fuel delivery chain that everything downstream depends on entirely — an undersized injector starves one cylinder under extreme conditions, but an undersized pump starves the whole engine, and it does so exactly when demand is highest.",
            "Voltage matters more than people expect. A fuel pump's flow output is roughly proportional to the voltage it receives, and a wiring harness under load — particularly a stock harness feeding an aftermarket pump beyond its original design current — can sag several tenths of a volt at wide-open throttle. That sag translates directly into reduced flow exactly when the engine is asking for the most fuel.",
            "The 25% margin used as a default here is a starting point rather than a rule. A build with a fresh, properly relayed wiring harness and a pump rated with real headroom over the target can run closer to the bare minimum; a build inheriting an older harness, or targeting the edge of what a given pump can do, benefits from more margin rather than less.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I size a fuel pump for my horsepower target?",
          answer: "Multiply target horsepower by BSFC (typically 0.50-0.60 for gasoline) and a safety factor (commonly 1.25), then convert from lb/hr to litres per hour through gasoline's density.",
        },
        {
          question: "Why does the pump need more capacity than the injectors need?",
          answer: "It doesn't need more than the injectors in isolation — it needs a margin over the bare fuel-consumption figure, because voltage sag, line restriction and pump wear all reduce real-world output below the rated figure.",
        },
        {
          question: "What safety margin should I use for pump sizing?",
          answer: "25% is a common default. A fresher, properly wired fuel system can run closer to the bare minimum; an older harness or a build near the edge of a pump's capability benefits from more.",
        },
        {
          question: "Does voltage affect fuel pump flow?",
          answer: "Significantly — flow output is roughly proportional to supply voltage, and voltage sag under load can meaningfully reduce real flow below a pump's rated figure at full voltage.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <FuelPumpCalculator />
    </ToolPage>
  );
}
