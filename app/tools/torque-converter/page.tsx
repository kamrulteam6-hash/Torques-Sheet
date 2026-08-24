import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, saeCorrection } from "../tool-sources";
import { TorqueConverter } from "./ui";

const tool = toolBySlug("torque-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Torque gets specified in four different units depending on where the number came from — a European manual in newton-metres, an American one in pound-feet, a small fastener spec in pound-inches, an older or Japanese document in kilogram-force metres. This converts between all four at once, so a figure from any source lands on the wrench you actually have."
      steps={[
        {
          title: "Enter the value in whichever unit you have",
          detail:
            "It does not matter which unit the source uses — pick it from the list and every other unit converts alongside it.",
        },
        {
          title: "Read off the unit your wrench actually uses",
          detail:
            "Most torque wrenches sold in North America read in either lb·ft or lb·in; most sold elsewhere read in N·m. Match the conversion to the tool in your hand.",
        },
        {
          title: "Watch the decimal point on small fasteners",
          detail:
            "Pound-inches and newton-metres are close enough in scale that a misplaced decimal is a real risk — 20 lb·in is not 20 N·m, it is about 2.3 N·m. Small fasteners are exactly where this mistake strips threads.",
        },
        {
          title: "Round to what your wrench can actually set",
          detail:
            "A converted figure is exact; a click-type wrench is not. Round to the nearest increment the tool offers rather than chasing a decimal it cannot resolve anyway.",
        },
        {
          title: "Check the reference table for a sanity check",
          detail:
            "If a converted torque value falls wildly outside the typical range for that kind of fastener, treat that as a reason to double-check the source figure before tightening anything.",
        },
      ]}
      formula={[
        {
          label: "Newton-metres to pound-feet",
          expression: "lb·ft = N·m ÷ 1.35582",
          note: "1.35582 newton-metres in a pound-foot — the constant this whole page runs on.",
        },
        {
          label: "Pound-feet to pound-inches",
          expression: "lb·in = lb·ft × 12",
          note: "A pure unit change, since a foot is twelve inches and force is unchanged.",
        },
        {
          label: "Kilogram-force metres to newton-metres",
          expression: "N·m = kgf·m × 9.80665",
          note: "Converts a force defined by gravity into the SI force unit — 9.80665 is standard gravity.",
        },
        {
          label: "General rule",
          expression: "value in target = value in source × (source constant ÷ target constant)",
          note: "Every unit above is defined against newton-metres, so any pair converts through that common reference.",
        },
      ]}
      sections={[
        {
          heading: "Why four units still coexist",
          paragraphs: [
            "Torque units did not converge because the equipment that measures them did not converge, and neither did the industries that wrote the standards.",
            "Newton-metres are the SI unit, and every European, and most modern global, manufacturer specification is written in them. Pound-feet is the American customary unit and remains standard across North American manuals and torque wrenches. Pound-inches exists because pound-feet is an awkward unit for small fasteners — nobody wants to read 1.7 lb·ft on a sensor bolt when 20 lb·in is the same figure and easier to picture. Kilogram-force metres persists in older Japanese and European documentation and in some agricultural and industrial equipment, a holdover from before SI units were universal.",
            "None of them is wrong. They are four descriptions of the same physical quantity — a force applied at a distance from a pivot — chosen for the convenience of whoever wrote the spec at the time.",
          ],
        },
        {
          heading: "The decimal-point trap on small fasteners",
          paragraphs: [
            "This is the mistake worth naming directly, because it strips more threads than any other torque error: newton-metres and pound-inches are close enough in magnitude that swapping them by accident produces a number that still looks plausible.",
            "A sensor bolt specified at 10 N·m converts to about 88.5 lb·in. Read the 10 as though it were already in pound-inches and you tighten to roughly an eighth of the correct torque — loose enough to work its way out. Go the other way, treating an 88 lb·in spec as 88 N·m, and you tighten to more than eleven times the correct figure, which will shear a small bolt outright.",
            "The pattern to watch for: any fastener specification under about 15 in a small unit is worth converting explicitly rather than eyeballing, because the units that describe small torques sit close enough together to swap unnoticed.",
          ],
        },
        {
          heading: "Precision you convert against precision you cannot use",
          bullets: [
            "A converted figure carries as many decimal places as you ask for — that is not the same as accuracy",
            "Click-type wrenches typically resolve to the nearest 1–5 lb·ft or 1 N·m depending on the tool",
            "Beam-type wrenches are read by eye and carry more operator variance than the conversion ever will",
            "Manufacturer torque specs themselves usually carry a stated tolerance, often ±10%",
            "Rounding a converted figure to what your wrench can set is normal practice, not a compromise",
            "What matters is rounding deliberately, in the right direction, rather than by accident",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I convert Nm to lb-ft?",
          answer: "Divide by 1.35582. So 100 N·m is about 73.76 lb·ft.",
        },
        {
          question: "How do I convert lb-ft to Nm?",
          answer: "Multiply by 1.35582. So 100 lb·ft is about 135.58 N·m.",
        },
        {
          question: "What is the difference between lb-ft and lb-in?",
          answer:
            "The same force unit at two different distances. A pound-foot is twelve pound-inches, used because it keeps small-fastener torques from being written as fractions of a pound-foot.",
        },
        {
          question: "What is a kgf·m?",
          answer:
            "A kilogram-force metre — the torque produced by one kilogram of force at one metre. It converts to 9.80665 newton-metres and still appears in older or Japanese-market documentation.",
        },
        {
          question: "Why do American and European torque wrenches use different units?",
          answer:
            "American wrenches typically read in pound-feet or pound-inches, following US customary convention. European and most modern global wrenches read in newton-metres, following the SI standard almost every current manufacturer specification is written in.",
        },
        {
          question: "Is 20 lb-in the same as 20 Nm?",
          answer:
            "No — 20 lb·in is about 2.26 N·m. Confusing the two on a small fastener either leaves it dangerously loose or shears it, which is why this pairing is worth converting explicitly rather than estimating.",
        },
        {
          question: "How precise should a converted torque figure be?",
          answer:
            "Only as precise as your wrench can set. A click-type wrench typically resolves to the nearest few units, so round the converted figure to that resolution rather than chasing extra decimal places.",
        },
        {
          question: "What torque should I use for lug nuts?",
          answer:
            "It depends on the vehicle and wheel size — passenger cars are typically 90–135 N·m and light trucks 135–190 N·m, but always use the exact figure for your vehicle rather than a general range.",
        },
      ]}
      sources={[saeCorrection, fordDynoTips]}
    >
      <TorqueConverter />
    </ToolPage>
  );
}
