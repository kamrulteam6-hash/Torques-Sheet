import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { BoltThreadConverter } from "./ui";

const tool = toolBySlug("bolt-thread-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Metric and imperial bolts do not always translate into each other cleanly — a metric size and its nearest imperial counterpart are close but rarely identical, and buying the wrong one on the assumption they're interchangeable strips threads or leaves a fastener too loose. This converts sizes between the two systems and shows the standard thread pitch each one normally comes in."
      steps={[
        {
          title: "Choose your conversion direction",
          detail: "Metric to imperial if you're working from a metric part and need an imperial equivalent, or the reverse.",
        },
        {
          title: "Select the size you have",
          detail: "From the dropdown of common bolt sizes in that system.",
        },
        {
          title: "Read the nearest equivalent — and check how close it actually is",
          detail: "Nearest is not the same as identical. A close match may still differ by a few hundredths of an inch, which matters for a tight-tolerance application.",
        },
        {
          title: "Check the standard thread pitch for the size you're actually using",
          detail: "Getting the diameter close is only half the job — the thread pitch has to match exactly, or the fastener won't turn in at all.",
        },
      ]}
      sections={[
        {
          heading: "Why 'nearest equivalent' is a caution, not a guarantee",
          paragraphs: [
            "Metric and imperial bolt sizes were standardised independently, in different countries, at different times, for different tooling conventions. They were never designed to line up with each other, which is why a 'nearest' match is exactly that — nearest, not identical.",
            "M10 (10mm, 0.394 inches) sits closest to a 3/8 inch (0.375 inches) bolt, but the two differ by nearly 0.5mm in diameter — enough that they are not interchangeable in a hole drilled or tapped for the other, even though they look and feel similar in a parts bin.",
            "This tool exists to make that gap visible rather than to paper over it. When a project genuinely needs to substitute one system for the other — replacing a metric bolt with an imperial one in an emergency, for instance — knowing exactly how far off the nearest match sits is what prevents a fastener failure down the line.",
          ],
        },
        {
          heading: "Coarse and fine threads exist for different reasons",
          bullets: [
            "Coarse threads (standard metric pitch, UNC in imperial) are the default for general assembly — faster to install, more tolerant of minor damage or debris",
            "Fine threads (UNF in imperial, or a lower metric pitch number) offer finer adjustment and slightly higher clamp load for the same torque, common in precision applications",
            "Coarse and fine threads of the same nominal diameter are not interchangeable — the pitch has to match exactly for the fastener to engage at all",
            "Automotive applications use both, often within the same assembly, which is exactly why checking pitch rather than just diameter matters",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is the imperial equivalent of an M10 bolt?",
          answer: "The nearest imperial size is 3/8 inch (0.375 inches), though M10 is actually 0.394 inches — close but not identical, so check whether the application tolerates that difference.",
        },
        {
          question: "What metric bolt is closest to a 1/2 inch bolt?",
          answer: "M12, at 12mm (0.472 inches) against 1/2 inch's 0.5 inches (12.7mm) — again close but not exact.",
        },
        {
          question: "Can I use an imperial bolt in a metric-tapped hole?",
          answer: "Not reliably. Even where the nominal diameters are close, the thread pitch almost never matches exactly between systems, so the fastener will not thread in correctly or will strip the threads trying.",
        },
        {
          question: "What is the difference between coarse and fine threads?",
          answer: "Coarse threads have a larger pitch (fewer threads per inch) and are the standard default; fine threads have a smaller pitch, offering finer adjustment and often slightly higher clamp load for the same torque.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <BoltThreadConverter />
    </ToolPage>
  );
}
