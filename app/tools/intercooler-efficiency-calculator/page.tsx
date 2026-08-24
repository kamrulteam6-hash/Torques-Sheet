import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { IntercoolerEfficiencyCalculator } from "./ui";

const tool = toolBySlug("intercooler-efficiency-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Compressing air heats it — a real physical consequence of forcing air into a smaller space, not a design flaw to engineer around. An intercooler's job is pulling as much of that heat back out as possible before the charge reaches the cylinders, and effectiveness measures how much of the available temperature drop it actually achieves, from real temperature readings."
      steps={[
        {
          title: "Measure charge temperature entering the intercooler",
          detail: "This is the hot side — air straight from the compressor discharge, before any cooling. It needs to be measured under real load, not idle, since compressor discharge temperature rises with boost.",
        },
        {
          title: "Measure charge temperature leaving the intercooler",
          detail: "The cold side, just before the throttle body. The difference between this and the inlet reading is the actual temperature drop the intercooler achieved.",
        },
        {
          title: "Measure ambient air temperature",
          detail: "This sets the theoretical floor — the coldest the charge could possibly get, since the intercooler is rejecting heat into the surrounding air and can never cool the charge below it.",
        },
        {
          title: "Read efficiency as a percentage of the possible drop",
          detail: "100% would mean the outlet reached ambient exactly, which no real intercooler achieves. Efficiency compares how far it actually got against that unreachable ideal.",
        },
      ]}
      formula={[
        {
          label: "Intercooler efficiency",
          expression: "efficiency (%) = (inlet temp − outlet temp) ÷ (inlet temp − ambient temp) × 100",
          note: "The standard heat-exchanger effectiveness formula, applied to charge air cooling specifically.",
        },
      ]}
      sections={[
        {
          heading: "Why ambient is the ceiling, not zero or outlet temperature alone",
          paragraphs: [
            "An intercooler is a heat exchanger, and every heat exchanger works by rejecting heat into a cooler medium — in this case, ambient air passing through the core. It physically cannot cool the charge below the temperature of the air it is rejecting heat into.",
            "That is why a raw temperature drop number on its own — 'the charge cooled 80 degrees' — says less than it seems to. An 80-degree drop from a 300-degree inlet on a hot day is a very different result from the same 80-degree drop from a 200-degree inlet on a cool one, because the available headroom to ambient was different in each case.",
            "Efficiency corrects for that by expressing the actual drop as a fraction of what was theoretically available. A well-designed intercooler with adequate airflow typically lands somewhere in the 65-85% range under real driving conditions; figures below that point at insufficient core size, restricted airflow through the core, or the classic problem of heat soak after repeated hard runs with limited time to recover between them.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate intercooler efficiency?",
          answer: "Subtract outlet temperature from inlet temperature for the actual drop, and subtract ambient temperature from inlet temperature for the maximum possible drop. Divide the actual by the maximum and multiply by 100.",
        },
        {
          question: "What is a good intercooler efficiency?",
          answer: "Roughly 65-85% under real driving load is typical of a well-sized, well-fed core. Figures meaningfully below that suggest insufficient airflow, an undersized core, or heat soak from repeated hard use.",
        },
        {
          question: "Can an intercooler cool below ambient temperature?",
          answer: "Not a standard air-to-air intercooler — it can only reject heat toward ambient air temperature, never below it. Water-to-air systems with a chilled reservoir are a different case and can briefly go below ambient.",
        },
        {
          question: "Why does my intercooler efficiency drop after several hard runs?",
          answer: "Heat soak — the core itself absorbs heat faster than it can shed it during repeated hard use, so its own temperature rises and it has less capacity left to cool each subsequent charge of air passing through.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <IntercoolerEfficiencyCalculator />
    </ToolPage>
  );
}
