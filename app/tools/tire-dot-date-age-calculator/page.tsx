import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { nhtsaTireAging, tireRimAssociation } from "../tool-sources";
import { TireDotDateAgeCalculator } from "./ui";

const tool = toolBySlug("tire-dot-date-age-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Every tire carries its own birth certificate: the last four digits of the DOT identification number on the sidewall encode the exact week and year it was manufactured. This decodes that date and checks the resulting age against the industry-consensus guidance that ages tires out of service regardless of remaining tread."
      steps={[
        {
          title: "Find the full DOT stamp on the sidewall",
          detail: "It starts with 'DOT' followed by a string of letters and numbers identifying the manufacturing plant and tire specification. The date code is always the last group.",
        },
        {
          title: "Read the last four digits specifically",
          detail: "Two digits for the week of the year, two for the year itself — '2318' means week 23 of 2018. This format has been standard since 2000.",
        },
        {
          title: "Check the tire's age against the guidance bands",
          detail: "Under 6 years needs no special age-related concern beyond normal tread and damage checks. From 6 years, inspect specifically for age signs. At 10 years, industry consensus treats the tire as due for replacement regardless of tread.",
        },
        {
          title: "Check all four tires, and the spare",
          detail: "Tires are not necessarily replaced as a set, and a spare in particular can sit unused and aging for years without anyone noticing.",
        },
      ]}
      formula={[
        {
          label: "Date decode",
          expression: "code WWYY → week WW of year 20YY",
          note: "A direct lookup rather than a calculation — the four digits are the week and year written plainly, just not obviously formatted that way.",
        },
      ]}
      sections={[
        {
          heading: "Why age matters independent of tread depth",
          paragraphs: [
            "Tire rubber degrades chemically over time regardless of whether the tire has ever touched the road — a process driven by oxidation and UV exposure that continues whether the tire is mounted, in storage, or sitting as a spare. This is fundamentally different from tread wear, which only accumulates through actual use.",
            "As that rubber ages, it hardens and loses elasticity. A tire can retain full legal tread depth and still have compromised structural integrity, because the compound itself has changed at a molecular level — which is precisely why age-based guidance exists as a separate check from the tread-depth inspection everyone already does.",
            "NHTSA research into this degradation, along with consistent guidance from major tire manufacturers, converges on the same rough bands used here: inspection warranted from around 6 years, and replacement warranted by 10 years regardless of use or storage conditions. There is no federal law mandating a maximum tire age, but the safety research behind the guidance is substantial.",
          ],
        },
        {
          heading: "Why the three-digit pre-2000 format is different",
          paragraphs: [
            "Before 2000, DOT codes used three digits — two for the week, one for the year — which is genuinely ambiguous: a single digit cannot distinguish, for instance, 1993 from 2003.",
            "In practice, any tire still carrying a three-digit code is now well beyond even the most conservative age guidance regardless of which decade it actually dates from, which is why this calculator only decodes the modern four-digit format rather than attempting to guess at an ambiguous older one.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I read a tire's DOT date code?",
          answer: "Find the last four digits of the DOT stamp on the sidewall. The first two are the week of manufacture, the last two are the year — '2318' means week 23 of 2018.",
        },
        {
          question: "How old is too old for a tire?",
          answer: "Most manufacturers recommend inspection from around 6 years and replacement by 10 years, regardless of remaining tread depth, because rubber hardens and loses elasticity with age independent of use.",
        },
        {
          question: "Does tire age matter if the tread is still good?",
          answer: "Yes. Tread depth measures wear from use; age measures chemical degradation of the rubber compound itself, which happens whether the tire has been driven or not.",
        },
        {
          question: "Where is the DOT code located on a tire?",
          answer: "On the sidewall, starting with 'DOT' followed by plant and specification codes, ending in the four-digit date code. It may only appear on one side of the tire.",
        },
        {
          question: "What does a three-digit DOT code mean?",
          answer: "It indicates manufacture before 2000, using a format that is ambiguous by decade. Any tire with a three-digit code is well past even conservative age guidance regardless of the exact date.",
        },
      ]}
      sources={[nhtsaTireAging, tireRimAssociation]}
    >
      <TireDotDateAgeCalculator />
    </ToolPage>
  );
}
