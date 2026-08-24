import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { chevyHardcoreCompression, fordDynoTips } from "../tool-sources";
import { CylinderVolumeCalculator } from "./ui";

const tool = toolBySlug("cylinder-volume-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A cylinder has three volumes worth naming separately: what it sweeps as the piston travels, what is left above the piston at the top of its stroke, and the two added together. This gives all three from bore, stroke and a target static compression ratio — the quick-reference version of the full compression build."
      steps={[
        {
          title: "Enter bore and stroke",
          detail: "These set the swept volume — the space the piston physically travels through, which is the same number displacement is built from.",
        },
        {
          title: "Enter the static compression ratio",
          detail: "Rather than itemising chamber, gasket, deck and piston separately, this works backward from a target ratio to the clearance volume it implies.",
        },
        {
          title: "Read swept, clearance and total together",
          detail: "Swept is fixed by geometry alone. Clearance is what a given ratio requires. Total is simply the two added — the full volume at bottom dead centre.",
        },
      ]}
      formula={[
        {
          label: "Swept volume",
          expression: "swept (cc) = π ÷ 4 × bore² × stroke × 16.387",
          note: "The same calculation the displacement calculator uses, for one cylinder.",
        },
        {
          label: "Clearance volume from a target ratio",
          expression: "clearance (cc) = swept ÷ (compression ratio − 1)",
          note: "Rearranged from the standard compression ratio formula: CR = (swept + clearance) ÷ clearance.",
        },
      ]}
      sections={[
        {
          heading: "Why this is a shortcut, not a replacement",
          paragraphs: [
            "The full compression ratio calculator itemises clearance volume into four separate physical contributors — chamber, head gasket, deck clearance and piston dome or dish — because each is measured or specified independently on a real engine.",
            "This tool skips that breakdown and works directly from a target ratio to a single clearance figure. That is the right tool when you want a quick number — how much total volume a cylinder holds at bottom dead centre for a given bore, stroke and compression target — without needing to specify every individual component that adds up to it.",
            "When the individual components genuinely matter, such as machining a deck or selecting a gasket thickness to hit a target ratio, the full compression ratio calculator is the one to use instead.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate cylinder volume?",
          answer: "Swept volume comes from bore, stroke and the standard displacement formula. Clearance volume follows from a target compression ratio: swept ÷ (ratio − 1). Add them together for total volume at bottom dead centre.",
        },
        {
          question: "What is the difference between swept and total cylinder volume?",
          answer: "Swept volume is only what the piston travels through between top and bottom dead centre. Total volume adds the clearance space still present at top dead centre — swept plus clearance.",
        },
        {
          question: "How much clearance volume does a 10:1 compression ratio need?",
          answer: "Clearance volume equals swept volume divided by (ratio minus one) — so at 10:1, clearance is swept volume divided by 9.",
        },
      ]}
      sources={[chevyHardcoreCompression, fordDynoTips]}
    >
      <CylinderVolumeCalculator />
    </ToolPage>
  );
}
