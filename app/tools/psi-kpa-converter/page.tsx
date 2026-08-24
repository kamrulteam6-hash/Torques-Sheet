import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fmvss138, uneceR39 } from "../tool-sources";
import { PsiKpaConverter } from "./ui";

const tool = toolBySlug("psi-kpa-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Kilopascals are the SI pressure unit, and they turn up on tire placards from import manufacturers, on some workshop compressor gauges, and in engineering documentation generally. Because a pascal is a small unit, tire and engine pressures run into the hundreds or thousands in kPa — a scale that looks unfamiliar next to the low double digits of psi, even though they describe exactly the same range."
      steps={[
        {
          title: "Type into whichever field you have a reading in",
          detail: "The other field updates immediately, in either direction.",
        },
        {
          title: "Watch the scale, not just the number",
          detail: "kPa figures are roughly seven times larger than the equivalent psi figure, which is the most common source of a units mistake — 220 looks nothing like 32 at a glance, but they are the same pressure.",
        },
        {
          title: "Cross-check against the reference table",
          detail: "If a placard reads in kPa and the number looks unusually large or small for a tire, compare it against the common values shown before assuming the gauge or the placard is wrong.",
        },
        {
          title: "Use the vehicle's placard, not the tire sidewall",
          detail: "The sidewall carries the tire's maximum rating, moulded in by the tire manufacturer. The vehicle's own recommended pressure is on the door jamb placard, and is usually the lower and more relevant figure.",
        },
      ]}
      formula={[
        {
          label: "PSI to kPa",
          expression: "kPa = psi × 6.89476",
          note: "One psi is exactly 6.89476 kilopascals, by definition of the pascal.",
        },
        {
          label: "kPa to PSI",
          expression: "psi = kPa ÷ 6.89476",
          note: "The same relationship reversed.",
        },
      ]}
      sections={[
        {
          heading: "Why import vehicle placards read in kPa",
          paragraphs: [
            "Kilopascals are the pressure unit SI defines, and manufacturers documenting a vehicle for a global market — built to be sold in dozens of countries from a single specification — tend to default to it rather than maintaining a psi-only figure for one market.",
            "The result is a placard that reads something like 220 kPa front, 230 kPa rear, on a vehicle where a US-market reference might expect to see 32 psi and 33 psi instead. Both describe the same pressure; only the unit differs.",
            "Because the scale is so different from psi — roughly seven kilopascals to one psi — this is one of the pairings where a rough mental conversion goes wrong easily. A gauge reading in psi checked against a kPa placard needs an actual conversion, not an estimate.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert psi to kPa?",
          answer: "Multiply by 6.89476. So 32 psi is about 220.6 kPa.",
        },
        {
          question: "How do I convert kPa to psi?",
          answer: "Divide by 6.89476. So 220 kPa is about 31.9 psi.",
        },
        {
          question: "What is 250 kPa in psi?",
          answer: "About 36.3 psi — a figure that turns up on some SUV and loaded-condition placards.",
        },
        {
          question: "Why is my placard in kPa instead of psi?",
          answer: "Because kilopascals are the SI pressure unit, and manufacturers building one specification for a global market commonly default to it rather than a market-specific unit.",
        },
      ]}
      sources={[fmvss138, uneceR39]}
    >
      <PsiKpaConverter />
    </ToolPage>
  );
}
