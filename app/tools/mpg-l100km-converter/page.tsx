import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { cfrLabeling, epaTesting } from "../tool-sources";
import { MpgL100kmConverter } from "./ui";

const tool = toolBySlug("mpg-l100km-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="MPG and L/100km measure fuel economy from opposite directions — one counts how far a fixed amount of fuel takes you, the other counts how much fuel a fixed distance costs. That difference is more than notational: it means the two scales do not move in step, and an improvement that looks large in one unit can look almost invisible in the other."
      steps={[
        {
          title: "Type into whichever field matches your source",
          detail: "US and Canadian figures are usually MPG; European and most international figures are L/100km. The other field converts automatically.",
        },
        {
          title: "Remember the relationship is inverted, not linear",
          detail: "A lower L/100km is better economy, same as a higher MPG is better economy — the scales point in opposite directions, which trips people up when scanning a table quickly.",
        },
        {
          title: "Don't judge an MPG change by how big the number looks",
          detail: "Going from 15 to 20 MPG saves far more fuel over a fixed distance than going from 30 to 35 MPG, even though both are a 5 MPG improvement. The table below shows why.",
        },
        {
          title: "Confirm which gallon is being used",
          detail: "This converter uses the US gallon. A UK (imperial) gallon is about 20% larger, so a figure quoted in UK MPG needs an extra conversion step before this applies directly.",
        },
      ]}
      formula={[
        {
          label: "MPG to L/100km",
          expression: "L/100km = 235.215 ÷ MPG",
          note: "The constant folds together US gallons, litres, miles and kilometres into one figure.",
        },
        {
          label: "L/100km to MPG",
          expression: "MPG = 235.215 ÷ L/100km",
          note: "Reciprocal measures use the same constant in both directions — that symmetry is a genuine property of the relationship, not a coincidence.",
        },
      ]}
      sections={[
        {
          heading: "Why equal MPG gains are not equal fuel savings",
          paragraphs: [
            "This is the single most useful thing to understand about MPG, and converting to L/100km makes it visible immediately.",
            "MPG measures distance per fuel, which means it is a rate written upside down from what actually costs money — fuel per distance. Improving from 15 to 20 MPG on a 12,000-mile year saves 200 gallons. Improving from 30 to 35 MPG over the same distance saves only 57 gallons, despite both being a 5 MPG jump.",
            "L/100km avoids this distortion because it already measures fuel per distance directly. Equal improvements in L/100km represent genuinely equal fuel savings, which is exactly why the rest of the world settled on it as the standard unit and why it is worth converting to whenever you are comparing improvements rather than absolute figures.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert MPG to L/100km?",
          answer: "Divide 235.215 by the MPG figure. So 30 MPG converts to about 7.84 L/100km.",
        },
        {
          question: "How do I convert L/100km to MPG?",
          answer: "Divide 235.215 by the L/100km figure — the same constant works in both directions. So 8 L/100km converts to about 29.4 MPG.",
        },
        {
          question: "Why does the same number convert both ways?",
          answer: "Because MPG and L/100km are reciprocal measures of the same thing. One counts distance per fuel, the other fuel per distance, and that reciprocal relationship is why a single constant divides into either one.",
        },
        {
          question: "Is 8 L/100km good fuel economy?",
          answer: "It converts to about 29.4 MPG, which is reasonable for a midsize vehicle. Whether it counts as good depends on the vehicle class — a compact car doing 8 L/100km would be considered thirsty.",
        },
        {
          question: "Does this use the US or UK gallon?",
          answer: "The US gallon. A UK (imperial) gallon is about 20% larger, so a UK MPG figure needs converting to US MPG, or to L/100km directly, before comparing against a US-sourced number.",
        },
      ]}
      sources={[epaTesting, cfrLabeling]}
    >
      <MpgL100kmConverter />
    </ToolPage>
  );
}
