import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { ThreadPitchCalculator } from "./ui";

const tool = toolBySlug("thread-pitch-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Thread pitch and threads-per-inch describe the identical physical spacing in two different unit systems, and this converts freely between them. It also works out two figures that follow directly from pitch and major diameter but rarely get calculated: pitch diameter, and the thread's actual lead (helix) angle."
      steps={[
        {
          title: "Enter pitch or TPI, in whichever you have",
          detail: "The other field updates automatically — there's no need to look up which direction the conversion runs.",
        },
        {
          title: "Enter the major diameter",
          detail: "The nominal outer diameter of the thread — 10mm for an M10, for instance — needed for the pitch diameter and lead angle calculations.",
        },
        {
          title: "Use pitch diameter for a precise fit check",
          detail: "This is the theoretical diameter where the thread's load-bearing flanks actually meet, and it's the dimension thread gauges and go/no-go checks are built around.",
        },
        {
          title: "Use lead angle to understand self-locking behaviour",
          detail: "A shallower lead angle generally resists loosening under vibration better than a steeper one, all else equal — part of why fine threads are sometimes chosen specifically for that property.",
        },
      ]}
      formula={[
        {
          label: "mm pitch to TPI",
          expression: "TPI = 25.4 ÷ pitch (mm)",
          note: "An inch is exactly 25.4mm, so this conversion is exact rather than approximate.",
        },
        {
          label: "Pitch diameter (60° thread profile)",
          expression: "pitch diameter = major diameter − 0.6495 × pitch",
          note: "The standard approximation for ISO metric and Unified (UN) 60-degree thread profiles.",
        },
        {
          label: "Lead angle",
          expression: "lead angle = arctan(pitch ÷ (π × major diameter))",
          note: "The helix angle the thread makes as it wraps around the shaft — steeper for a coarser pitch on the same diameter.",
        },
      ]}
      sections={[
        {
          heading: "Why pitch diameter matters more than major diameter for a real fit",
          paragraphs: [
            "Major diameter — the number in a bolt's designation — is the outer edge of the thread crests. It is not where the male and female threads actually bear load against each other; that happens partway down the thread flank, at a diameter smaller than the major diameter.",
            "That load-bearing diameter is the pitch diameter, and it is the dimension precision thread gauging is actually built around. Two threads can share an identical major diameter and pitch while differing slightly in pitch diameter due to manufacturing tolerance, which is exactly what thread gauges are designed to catch.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert thread pitch to TPI?",
          answer: "Divide 25.4 by the pitch in millimetres. A 1.5mm pitch converts to approximately 16.9 threads per inch.",
        },
        {
          question: "What is pitch diameter?",
          answer: "The theoretical diameter at which the male and female thread flanks actually meet and bear load — smaller than the major (outer) diameter, and the dimension thread gauges are built around.",
        },
        {
          question: "What is thread lead angle?",
          answer: "The helix angle the thread makes as it wraps around the fastener's shaft. A coarser pitch on the same diameter produces a steeper lead angle.",
        },
        {
          question: "Does lead angle affect how easily a bolt loosens?",
          answer: "Generally yes — a shallower lead angle tends to resist loosening under vibration better than a steeper one, which is part of why fine threads are sometimes specifically chosen for vibration-prone applications.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <ThreadPitchCalculator />
    </ToolPage>
  );
}
