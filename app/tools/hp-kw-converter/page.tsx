import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { HpKwConverter } from "./ui";

const tool = toolBySlug("hp-kw-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Engine power gets quoted in three units depending on where the vehicle was specified: horsepower across the US and UK markets, kilowatts as the SI unit used almost everywhere else, and metric horsepower (PS) still common in Japanese and some European documentation. All three describe the same underlying wattage, and this converts between them together."
      steps={[
        {
          title: "Type into whichever field matches your source",
          detail: "The other field converts immediately. PS is shown alongside both as a reference, since it is a third figure people frequently confuse with kW.",
        },
        {
          title: "Don't assume kW and PS are the same number",
          detail: "They are close but not identical — PS is about 36% larger than kW numerically, while hp and PS differ by only about 1.4%. Mixing up kW and PS produces a much bigger error than mixing up hp and PS.",
        },
        {
          title: "Check whether a figure is crank or wheel power",
          detail: "This converter changes units, not measurement point. A dyno figure measured at the wheels is already lower than the equivalent crank figure due to drivetrain loss, in any unit.",
        },
        {
          title: "Use the reference table as a sanity check",
          detail: "If a converted figure looks far outside where the vehicle class normally sits, that is worth a second look before trusting the source number.",
        },
      ]}
      formula={[
        {
          label: "HP to kW",
          expression: "kW = hp × 0.7457",
          note: "One mechanical horsepower is exactly 745.7 watts.",
        },
        {
          label: "kW to HP",
          expression: "hp = kW ÷ 0.7457",
          note: "The same relationship reversed.",
        },
        {
          label: "HP to PS",
          expression: "PS = hp × 1.01387",
          note: "Metric horsepower is defined slightly differently and comes out about 1.4% larger for the same engine.",
        },
      ]}
      sections={[
        {
          heading: "Why three units still describe the same thing",
          paragraphs: [
            "Mechanical horsepower was defined in the 18th century as a practical comparison to draft-horse output, and it stuck as the standard unit across markets that inherited British and American engineering convention.",
            "Kilowatts are the SI power unit, and every current global manufacturer specification uses them somewhere in the documentation, because SI units are what international standards and most engineering work are built around.",
            "Metric horsepower — PS, from the German Pferdestärke — is an older continental European definition that predates SI adoption and still appears in Japanese and some European market materials out of convention. It is close to mechanical horsepower but not identical, being defined against 75 kgf·m/s rather than 33,000 ft·lb/min, which is why the two numbers differ by about 1.4% rather than being the same figure under two names.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert hp to kW?",
          answer: "Multiply by 0.7457. So 300 hp is about 223.7 kW.",
        },
        {
          question: "How do I convert kW to hp?",
          answer: "Divide by 0.7457. So 200 kW is about 268.2 hp.",
        },
        {
          question: "Is PS the same as hp?",
          answer: "Very close but not identical — PS is about 1.4% larger for the same engine, since it is defined against a slightly different reference than mechanical horsepower.",
        },
        {
          question: "Is PS the same as kW?",
          answer: "No, and this is the pairing worth being careful with — PS is about 36% larger numerically than kW for the same engine, a much bigger gap than the hp/PS difference.",
        },
        {
          question: "What is 150 kW in horsepower?",
          answer: "About 201.2 hp — a common power output for a midsize performance sedan.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <HpKwConverter />
    </ToolPage>
  );
}
