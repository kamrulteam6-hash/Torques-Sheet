import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { BoltTorqueCalculator } from "./ui";

const tool = toolBySlug("bolt-torque-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Torque is a proxy for clamp load — what tightening a bolt actually needs to achieve — and the relationship between the two runs through the fastener's size, its grade, and the friction it has to overcome along the way. This estimates a starting torque for a fastener that doesn't already have a manufacturer's specification, from the widely used T = K x D x P relationship."
      steps={[
        {
          title: "Enter the fastener's nominal diameter and thread pitch",
          detail: "Both are needed — diameter for the lever-arm effect torque produces, pitch for the tensile stress area the clamp load target is calculated against.",
        },
        {
          title: "Select the bolt grade",
          detail: "This sets proof strength — the stress level the fastener can withstand before permanent deformation, which the target clamp load is calculated as a safe fraction of.",
        },
        {
          title: "Choose the friction condition (K-factor)",
          detail: "Lubrication reduces friction and therefore the torque needed for the same clamp load, which is exactly why a torque spec is only valid for the friction condition it was written for.",
        },
        {
          title: "Treat the result as a starting point, not a final answer",
          detail: "A manufacturer's own torque specification for a specific application always takes priority over this generic estimate — especially for anything safety-critical.",
        },
      ]}
      formula={[
        {
          label: "Bolt torque estimate",
          expression: "T = K × D × P",
          note: "K is the nut factor (friction condition), D is nominal diameter, P is the target clamp load — the standard, widely used estimate.",
        },
        {
          label: "Target clamp load",
          expression: "P = proof strength × tensile stress area × 0.75",
          note: "Clamp load is conventionally targeted at about 75% of the bolt's proof load, leaving margin below the point of permanent deformation.",
        },
      ]}
      sections={[
        {
          heading: "Why the same bolt needs different torque depending on friction alone",
          paragraphs: [
            "This is the single most important thing to understand about bolt torque: it is not a direct measure of clamp load. It is torque required to overcome friction and achieve a target clamp load, and friction can change dramatically depending on the surface condition of the threads and the underhead bearing surface — with the target clamp load itself unchanged.",
            "A lubricated or anti-seize-treated bolt needs meaningfully less torque than the same bolt dry to reach the identical clamp load, because less of the applied torque is being consumed overcoming friction and more of it is going directly into stretching the fastener. Torquing a lubricated bolt to a dry-condition spec overtightens it — sometimes considerably — for exactly this reason.",
            "This is precisely why factory torque specifications state the friction condition explicitly, and why substituting a generic torque figure for a manufacturer's own specification without matching the friction condition is a genuine risk rather than a minor technicality.",
          ],
        },
        {
          heading: "Why 75% of proof load, not 100%",
          bullets: [
            "Proof load is the stress level at which a fastener begins permanent deformation — the actual limit, not a target",
            "Targeting the full proof load leaves zero margin for torque wrench inaccuracy, friction variation, or measurement error",
            "75% is a widely used convention that leaves working margin while still achieving strong, reliable clamp load",
            "Critical or safety-related fasteners often use a manufacturer-specified fraction rather than this generic default",
            "This margin is exactly why a slightly-over-torqued bolt tightened to a proper spec rarely fails outright, while consistently over-torquing well beyond spec eventually will",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate bolt torque?",
          answer: "Multiply the nut factor (K, reflecting friction condition) by nominal diameter and target clamp load. Target clamp load is typically 75% of the bolt's proof load.",
        },
        {
          question: "Why does lubrication change the required torque?",
          answer: "Because torque overcomes friction to produce clamp load, and lubrication reduces that friction significantly. A lubricated bolt needs less torque than the same bolt dry to reach the same clamp load.",
        },
        {
          question: "What K-factor should I use for a dry bolt?",
          answer: "About 0.20 for a plain or black oxide finish dry, one of the most commonly cited reference values across fastener manufacturers and torque chart publishers.",
        },
        {
          question: "Is this calculator a substitute for a manufacturer's torque spec?",
          answer: "No. It's a starting-point estimate for an unspecified fastener. A manufacturer's own torque specification for a specific application, verified for that exact use, always takes priority.",
        },
        {
          question: "What is SAE Grade 5 equivalent to in metric?",
          answer: "Approximately metric grade 8.8 — both have a proof strength in the range of roughly 580-585 MPa (about 84,000-85,000 psi).",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <BoltTorqueCalculator />
    </ToolPage>
  );
}
