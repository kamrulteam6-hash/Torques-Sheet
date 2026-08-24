import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { TurboBoostCalculator } from "./ui";

const tool = toolBySlug("turbo-boost-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Adding boost to an engine increases how much air — and with it, fuel — the cylinders can pack in, which is roughly what drives the power gain. This scales a naturally aspirated baseline by the absolute pressure ratio boost produces, and is explicit about what it is: an optimistic ceiling based on pressure ratio alone, not a dyno prediction."
      steps={[
        {
          title: "Establish a real naturally aspirated baseline",
          detail: "Use an actual dyno figure for the engine before boost, not a book horsepower rating — book figures are measured under different conditions than a real dyno pull and rarely match exactly.",
        },
        {
          title: "Enter the boost pressure being targeted",
          detail: "This is gauge pressure — what a boost gauge actually reads, above atmospheric.",
        },
        {
          title: "Set altitude if it's meaningfully above sea level",
          detail: "Atmospheric pressure drops with altitude, which changes the absolute pressure ratio a given boost gauge reading actually produces — see the boost pressure ratio calculator for the mechanism in detail.",
        },
        {
          title: "Treat the result as a ceiling, not a target",
          detail: "Real gains are reduced by intake and exhaust restriction, intercooler heat soak, and how much ignition timing has to be pulled for the fuel's octane rating. Expect the real number to land below this estimate.",
        },
      ]}
      formula={[
        {
          label: "Pressure ratio",
          expression: "PR = (boost psi + atmospheric psi) ÷ atmospheric psi",
          note: "The absolute pressure ratio — the figure compressor maps and this power estimate are both built on.",
        },
        {
          label: "Power potential estimate",
          expression: "estimated power = NA baseline × pressure ratio",
          note: "A simplification that assumes the entire pressure ratio translates directly into proportionally more power — real builds fall short of this for the reasons explained below.",
        },
      ]}
      sections={[
        {
          heading: "Why this is a ceiling and not a prediction",
          paragraphs: [
            "The estimate assumes every bit of the extra air mass boost provides gets burned as efficiently as the naturally aspirated baseline was — same air-fuel ratio, same ignition timing relative to knock threshold, same volumetric efficiency, with the fuel and intercooling systems keeping up perfectly. Real builds rarely hit all of those simultaneously.",
            "Ignition timing is usually the biggest gap between this estimate and reality. Higher cylinder pressure under boost lowers the knock threshold, so timing typically has to be pulled back from the naturally aspirated map — and less timing advance means less of the available cylinder pressure gets converted into usable power.",
            "Intercooler effectiveness matters too. This estimate implicitly assumes the charge temperature rise from compression is fully cooled back down before combustion; a marginal or heat-soaked intercooler leaves the charge hotter and denser air becomes less dense than the pressure ratio alone suggests, quietly eating into the real gain.",
            "Treat this number as the outer boundary of what is physically possible from the pressure ratio alone — a useful planning figure for sizing fuel systems and intercoolers, and a number that a well-executed build gets progressively closer to without ever quite reaching.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How much horsepower does 10 psi of boost add?",
          answer: "At sea level, 10 psi boost gives a pressure ratio of about 1.68, so the ceiling estimate is roughly 68% more power than the naturally aspirated baseline — real gains typically land somewhat below that.",
        },
        {
          question: "Is horsepower proportional to boost pressure?",
          answer: "Not linearly — it is proportional to the absolute pressure ratio, which is boost plus atmospheric pressure, divided by atmospheric pressure. This is why the first few psi of boost add proportionally more than the same increase does at higher boost levels.",
        },
        {
          question: "Why is my actual power gain lower than this estimate?",
          answer: "Ignition timing usually has to be pulled under boost for knock control, intercooler effectiveness is never perfect, and intake or exhaust restriction can limit how much of the theoretical airflow the engine actually uses.",
        },
        {
          question: "Does altitude affect how much power boost adds?",
          answer: "Yes — lower atmospheric pressure at altitude means the same gauge boost pressure produces a higher pressure ratio, so a given psi of boost theoretically adds slightly more percentage gain at altitude than at sea level.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <TurboBoostCalculator />
    </ToolPage>
  );
}
