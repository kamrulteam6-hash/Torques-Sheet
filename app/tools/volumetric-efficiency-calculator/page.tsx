import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { VolumetricEfficiencyCalculator } from "./ui";

const tool = toolBySlug("volumetric-efficiency-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="An engine's displacement sets a theoretical maximum for how much air it could ingest each cycle. Volumetric efficiency is how much it actually manages, as a percentage of that theoretical figure — the single number that captures how well the intake, heads, camshaft and exhaust are working together at a given engine speed."
      steps={[
        {
          title: "Enter displacement and the engine speed you're checking",
          detail: "VE is calculated at a specific RPM, not as one figure for the whole engine — a well-built engine's VE typically rises toward its torque peak and falls away either side of it.",
        },
        {
          title: "Enter measured or estimated airflow",
          detail: "This has to come from somewhere real — a flow bench figure, a dyno's calculated airflow, or a MAF-based estimate from logged data. VE is a measurement, not something to assume.",
        },
        {
          title: "Compare against the theoretical 100% figure",
          detail: "That theoretical airflow is pure geometry — what the displacement alone would ingest at that RPM with no losses at all. VE is how close the real engine gets.",
        },
        {
          title: "Read a result above 100% correctly",
          detail: "That is not an error. It is the entire reason forced induction exists — a turbo or supercharger packs in more air than atmospheric pressure alone ever could.",
        },
      ]}
      formula={[
        {
          label: "Theoretical airflow at 100% VE",
          expression: "CFM = displacement (ci) × RPM ÷ 3456",
          note: "3456 combines 1728 cubic inches per cubic foot with the fact that a four-stroke engine draws one intake charge every two revolutions.",
        },
        {
          label: "Volumetric efficiency",
          expression: "VE (%) = actual airflow ÷ theoretical airflow × 100",
          note: "The whole calculation, once theoretical airflow is known.",
        },
      ]}
      sections={[
        {
          heading: "Why VE changes with RPM instead of being one number",
          paragraphs: [
            "Cylinder filling is a dynamic, wave-driven process — intake and exhaust pulses, valve timing and runner length all interact differently depending on how fast the engine is turning, which is why VE traces a curve across the rev range rather than sitting at a single figure.",
            "A camshaft and intake designed for peak VE at 6,000 rpm will typically show lower VE at idle and at very high RPM, because the same physical dimensions that work well at one speed work against airflow at another. This is the underlying reason a cam swap that adds top-end power often costs some low-speed drivability — it is trading VE at one RPM for VE at another.",
            "Reading a single VE number without its RPM attached tells you very little. The useful version is a curve — VE measured or estimated across the rev range — which is exactly what a dyno's airflow-based tune, or a well-instrumented flow bench session, produces.",
          ],
        },
        {
          heading: "What limits VE, and what raises it",
          bullets: [
            "Intake restriction — filter, tube diameter, throttle body sizing — caps airflow before the engine even reaches the heads",
            "Cylinder head port flow, particularly at high lift, is frequently the single largest limit on peak VE",
            "Camshaft timing tunes where in the rev range VE peaks, by controlling how the intake and exhaust events overlap",
            "Exhaust backpressure fights the engine's ability to fully evacuate spent gas before the next intake stroke",
            "Intake runner length and plenum volume tune which RPM range benefits from acoustic resonance effects",
            "Forced induction bypasses these limits directly, which is why boosted engines routinely show VE figures well above 100%",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate volumetric efficiency?",
          answer: "Divide actual airflow by the theoretical airflow the displacement would ingest at 100% VE, then multiply by 100. Theoretical airflow (CFM) equals displacement in cubic inches times RPM, divided by 3456.",
        },
        {
          question: "What is a good volumetric efficiency?",
          answer: "A well-tuned naturally aspirated engine typically peaks somewhere in the 80-95% range, usually near its torque peak. Numbers vary considerably with cylinder head design and camshaft choice.",
        },
        {
          question: "Can VE exceed 100%?",
          answer: "Yes, and it should on a forced-induction engine — a turbo or supercharger packs in more air mass than atmospheric pressure alone could, which is the entire mechanism behind the power gain.",
        },
        {
          question: "Why does VE change with RPM?",
          answer: "Intake and exhaust pulse timing, valve events and runner acoustics all interact differently at different engine speeds, so a given camshaft and intake combination favours some RPM ranges over others.",
        },
      ]}
      sources={[fordDynoTips, saeCorrection]}
    >
      <VolumetricEfficiencyCalculator />
    </ToolPage>
  );
}
