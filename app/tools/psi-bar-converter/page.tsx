import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fmvss138, uneceR39 } from "../tool-sources";
import { PsiBarConverter } from "./ui";

const tool = toolBySlug("psi-bar-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Bar is the pressure unit most of the world uses for tire inflation and small-fastener testing, while psi remains standard in the United States. A bar is defined as exactly 100,000 pascals, which puts it at 14.5038 psi — close enough to 14.5 that people round it in their heads and end up a little off on anything precise."
      steps={[
        {
          title: "Type into whichever field you have a reading in",
          detail: "The other field updates immediately — there is no separate convert button, and no need to decide which direction you are converting before you start.",
        },
        {
          title: "Use the reference table for a sanity check",
          detail: "If a converted figure looks nowhere near the common values shown, that is worth investigating before acting on it — a misread gauge or a units mix-up is more common than an unusual pressure.",
        },
        {
          title: "Round to what your gauge can actually read",
          detail: "Most analogue gauges resolve to the nearest 1 psi or 0.1 bar. A converted figure with more decimal places than that is precision the gauge cannot use.",
        },
        {
          title: "Check against your vehicle's placard, not the sidewall",
          detail: "This tool converts a number; it does not tell you what number to use. That comes from the driver's door jamb sticker, not the maximum pressure moulded into the tire.",
        },
      ]}
      formula={[
        {
          label: "PSI to bar",
          expression: "bar = psi ÷ 14.5038",
          note: "14.5038 psi in one bar, since a bar is defined as exactly 100,000 pascals.",
        },
        {
          label: "Bar to PSI",
          expression: "psi = bar × 14.5038",
          note: "The same relationship reversed.",
        },
      ]}
      sections={[
        {
          heading: "Why bar became the standard outside North America",
          paragraphs: [
            "Bar is not an SI unit, but it sits close enough to atmospheric pressure — one bar is almost exactly one standard atmosphere — that it became the practical everyday pressure unit across Europe and much of the rest of the world.",
            "That closeness to atmospheric pressure is also why it reads in small, convenient numbers for tire work: a typical passenger car pressure lands somewhere around 2.2 to 2.5 bar, a range that is easy to remember and easy to set on a European-made pump. The psi equivalent, in the low thirties, is exactly as easy to remember in the US — the two conventions just took root in different places.",
            "Digital tire inflators sold globally often default to bar, or let you switch between bar, psi and kPa, which is precisely the situation this converter exists for: reading a gauge in one unit and needing to compare it against a spec written in another.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert psi to bar?",
          answer: "Divide by 14.5038. So 32 psi is about 2.21 bar.",
        },
        {
          question: "How do I convert bar to psi?",
          answer: "Multiply by 14.5038. So 2.2 bar is about 31.9 psi.",
        },
        {
          question: "Is 2 bar the same as 30 psi?",
          answer: "Close but not exact — 2 bar is 29.0 psi, and 30 psi is 2.07 bar. Round numbers in one unit rarely land on round numbers in the other.",
        },
        {
          question: "What tire pressure is 2.5 bar in psi?",
          answer: "About 36.3 psi — a common figure for a lightly loaded SUV or a passenger car's rear axle on some placards.",
        },
      ]}
      sources={[fmvss138, uneceR39]}
    >
      <PsiBarConverter />
    </ToolPage>
  );
}
