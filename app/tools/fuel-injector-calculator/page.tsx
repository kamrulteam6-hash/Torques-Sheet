import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { FuelInjectorCalculator } from "./ui";

const tool = toolBySlug("fuel-injector-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Sizing an injector and checking an injector's duty cycle are the same calculation asked in opposite directions. One starts from a power target and asks how big an injector it needs; the other starts from an injector already fitted and asks how hard it is working. This solves either one, from the same brake-specific-fuel-consumption math."
      steps={[
        {
          title: "Choose which direction you need",
          detail: "Sizing new injectors for a build points at 'solve for injector size'. Checking whether injectors already fitted are adequate for a power target points at 'solve for duty cycle'.",
        },
        {
          title: "Set BSFC to match the induction type",
          detail: "Naturally aspirated gasoline engines run efficiently, around 0.50 lb/hp/hr. Forced induction burns fuel less completely per unit of power, pushing BSFC up toward 0.55-0.60 or higher under an aggressive tune.",
        },
        {
          title: "Set a sensible maximum duty cycle when sizing",
          detail: "80% is the conventional ceiling — injectors spend progressively less time fully open above that, which hurts atomization and delivery linearity, and leaves no margin for wear or voltage sag.",
        },
        {
          title: "Cross-check against real injector data sheets",
          detail: "cc/min ratings are usually quoted at a specific base pressure, commonly 3 bar. If your fuel system runs a different pressure, the actual flow differs from the rated figure — see the injector conversion notes below.",
        },
      ]}
      formula={[
        {
          label: "Required injector flow (sizing)",
          expression: "flow per injector = (target hp × BSFC ÷ cylinders) ÷ max duty cycle",
          note: "Total fuel needed, split evenly across cylinders, then inflated to account for the injector not being open 100% of the time.",
        },
        {
          label: "Duty cycle (checking)",
          expression: "duty cycle = (target hp × BSFC ÷ cylinders) ÷ injector rated flow",
          note: "The same relationship solved for duty cycle instead of required flow — how hard a specific injector has to work.",
        },
        {
          label: "cc/min to lb/hr",
          expression: "lb/hr = cc/min ÷ 10.5",
          note: "The industry-standard gasoline conversion constant, derived from gasoline's typical density near 0.72 g/cc.",
        },
      ]}
      sections={[
        {
          heading: "Why duty cycle matters more than raw flow capacity",
          paragraphs: [
            "An injector doesn't meter fuel continuously — it pulses open and closed, and duty cycle is the fraction of each cycle it spends open. An injector rated for more flow than the engine needs at 100% duty still has to actually open and close fast enough to deliver a precise, small pulse at idle and light cruise.",
            "Above roughly 80% duty, an injector is open almost continuously, which leaves progressively less time closed between pulses and starts to compress the useful range where fuel delivery stays linear with pulse width. That is the practical reason 80% became the conventional sizing ceiling, rather than simply sizing exactly to 100% of a power target.",
            "Undersizing shows up unambiguously — the engine goes lean under load because the injector physically cannot flow more fuel no matter how long it stays open. Oversizing is a subtler problem: very large injectors struggle to deliver a small, precise pulse at idle, which can show up as rough idle or poor low-speed drivability even though peak-power fueling is fine.",
          ],
        },
        {
          heading: "Why the pressure an injector is rated at matters",
          paragraphs: [
            "A cc/min figure on an injector's spec sheet is only meaningful at the fuel pressure it was tested at — commonly 3 bar (43.5 psi) as an industry reference point, though some manufacturers rate at 2 bar or others.",
            "Flow through an injector's orifice follows a square-root relationship with pressure differential, not a linear one, because it is fundamentally an orifice-flow problem. Doubling fuel pressure does not double flow — it multiplies it by roughly 1.41, the square root of 2.",
            "That matters directly for a boosted application, where fuel pressure is often referenced to manifold pressure and rises under boost. An injector's effective flow at, say, 4 bar under boost is meaningfully higher than its rated 3-bar figure — worth accounting for rather than sizing purely against the base rating.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I size fuel injectors for my horsepower target?",
          answer: "Divide target horsepower by cylinder count, multiply by BSFC, then divide by your target maximum duty cycle (commonly 0.80). That gives required flow per injector in lb/hr — convert to cc/min by multiplying by 10.5.",
        },
        {
          question: "What is a safe injector duty cycle?",
          answer: "80% is the conventional ceiling. Above that, injectors spend progressively less time fully closed between pulses, which hurts atomization and fuel delivery linearity, and leaves no margin for wear or voltage sag.",
        },
        {
          question: "How do I convert cc/min to lb/hr?",
          answer: "Divide by 10.5 — the standard gasoline conversion constant. A 550 cc/min injector flows about 52.4 lb/hr.",
        },
        {
          question: "Does fuel pressure affect injector flow rating?",
          answer: "Yes, following a square-root relationship. Flow at a new pressure equals the rated flow times the square root of (new pressure ÷ rated pressure) — doubling pressure multiplies flow by about 1.41, not 2.",
        },
        {
          question: "What BSFC should I use for a turbocharged engine?",
          answer: "Roughly 0.55 lb/hp/hr for a street tune, rising toward 0.60 or higher for an aggressive tune, against about 0.50 for a naturally aspirated gasoline engine.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <FuelInjectorCalculator />
    </ToolPage>
  );
}
