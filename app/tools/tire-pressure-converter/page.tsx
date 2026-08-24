import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fmvss138, tireRimAssociation, uneceR39 } from "../tool-sources";
import { TirePressureConverter } from "./ui";

const tool = toolBySlug("tire-pressure-converter")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Tire pressure gauges, pumps and placards read in psi, bar, kPa or occasionally kgf/cm² depending on where they were made, and mixing them up by a factor of fourteen or a hundred is a real risk when reading an unfamiliar gauge. This converts between all five units at once, and checks your reading against the vehicle's own placard pressure."
      steps={[
        {
          title: "Read the value off your gauge or pump",
          detail:
            "European and most digital pumps read in bar; American gauges typically read in psi; many workshop compressors and some import vehicles use kPa.",
        },
        {
          title: "Pick the unit that matches",
          detail:
            "Select the unit the reading is actually in, not the unit you want. The conversion runs automatically once the source unit is set correctly.",
        },
        {
          title: "Find your placard pressure",
          detail:
            "It is on a sticker in the driver's door jamb, not on the tire sidewall. The sidewall number is the tire's maximum rating, not the vehicle's recommended pressure — they are frequently different figures.",
        },
        {
          title: "Only compare when the tire is genuinely cold",
          detail:
            "Placard pressure is a cold specification, meaning the vehicle has not been driven for at least three hours, or under a mile at moderate speed. A warm tire reads several psi higher than its cold pressure.",
        },
        {
          title: "Treat a large shortfall as urgent",
          detail:
            "Significant under-inflation raises heat build-up in the tire and increases the risk of a structural failure at speed, independent of whether the TPMS light has illuminated yet.",
        },
      ]}
      formula={[
        {
          label: "psi to bar",
          expression: "bar = psi ÷ 14.5038",
          note: "1 bar is defined as 100,000 pascals, which works out to 14.5038 psi.",
        },
        {
          label: "psi to kPa",
          expression: "kPa = psi × 6.89476",
          note: "One psi is 6.89476 kilopascals exactly, by definition of the pascal.",
        },
        {
          label: "bar to atm",
          expression: "atm = bar ÷ 1.01325",
          note: "One standard atmosphere is defined as 101.325 kPa.",
        },
        {
          label: "psi to kgf/cm²",
          expression: "kgf/cm² = psi ÷ 14.2233",
          note: "Still seen on older gauges and some imported equipment.",
        },
      ]}
      sections={[
        {
          heading: "Why the placard, not the sidewall, is the number that matters",
          paragraphs: [
            "This is the single most common tire pressure mistake, and it comes from reading the wrong number off the vehicle.",
            "The figure moulded into the tire's sidewall is its maximum permissible cold inflation pressure — the ceiling the tire is built to withstand, printed by the tire manufacturer, identical across every vehicle that happens to run that tire size. It is not a recommendation.",
            "The vehicle manufacturer's recommended pressure sits on a placard in the driver's door jamb, and it is calculated for that specific vehicle's weight, suspension geometry and handling target — usually lower than the tire's maximum, sometimes by a considerable margin. A 44 psi maximum on the sidewall might pair with a 32 psi placard recommendation, and inflating to the sidewall figure on a vehicle specified for 32 gives a harsher ride, faster centre-tread wear, and reduced contact patch under braking.",
            "The placard is also the reference every other calculation on this page uses, including the TPMS warning threshold — so getting this number right is the foundation everything else depends on.",
          ],
        },
        {
          heading: "Why 'cold' is a real specification, not a suggestion",
          paragraphs: [
            "Every placard pressure is stated as a cold pressure, and the word is doing real work in that phrase — it is not simply describing the weather.",
            "A tire heats as it flexes under load and friction with the road, and that heat raises the internal air pressure measurably. A short drive of even a mile or two can raise pressure by several psi above the true cold figure, which means checking pressure right after driving overstates what the tire is actually running when it matters.",
            "The convention that defines cold is specific: the vehicle has not been driven for at least three hours, or has covered less than a mile at moderate speed. Checking pressure first thing in the morning, before the vehicle moves, reliably satisfies it. Checking after arriving somewhere does not.",
            "Ambient temperature swings the reading too, independent of driving — a tire loses roughly 1 to 2 psi for every 10°F drop in outside temperature, which is why pressure warnings cluster at the first genuinely cold morning of the season even though nothing about the tire has changed.",
          ],
        },
        {
          heading: "The TPMS light is a late warning, not an early one",
          bullets: [
            "US federal standard FMVSS 138 sets the mandatory warning threshold at 25% below the vehicle's placard pressure",
            "On a 32 psi placard, that means the light is not required to illuminate until pressure falls to about 24 psi",
            "A tire can be meaningfully under-inflated — 10 to 20% low — with no dashboard warning at all",
            "The system exists to catch severe under-inflation, not to replace a periodic manual check",
            "A monthly gauge check catches problems the dashboard is not designed to catch early",
            "Slow leaks in particular can sit below the warning threshold for weeks before triggering it",
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
          question: "What tire pressure should I use — the sidewall or the door placard?",
          answer:
            "The door placard, in the driver's door jamb. The sidewall figure is the tire's maximum rating, not the vehicle's recommended pressure, and the two are frequently different numbers.",
        },
        {
          question: "What does 'cold tire pressure' mean?",
          answer:
            "Pressure measured before the vehicle has been driven for at least three hours, or after less than a mile at moderate speed. Driving heats the tire and raises the reading above its true cold value.",
        },
        {
          question: "At what pressure does the TPMS warning light come on?",
          answer:
            "US federal standard FMVSS 138 requires it at 25% below the vehicle's placard cold pressure. On a 32 psi placard that is about 24 psi — meaningful under-inflation can exist well before the light appears.",
        },
        {
          question: "How much does tire pressure change with temperature?",
          answer:
            "Roughly 1 to 2 psi for every 10°F change in ambient temperature. This is why pressure warnings often appear at the first cold morning of the season without any actual leak.",
        },
        {
          question: "What is kPa used for in tire pressure?",
          answer:
            "Kilopascals are the SI pressure unit and appear on many import vehicle placards and workshop compressors. 1 psi equals 6.895 kPa, so a 220 kPa placard is about 32 psi.",
        },
        {
          question: "Is bar the same as atmospheres?",
          answer:
            "Close but not identical. One standard atmosphere is 1.01325 bar, so the two are within about 1.3% of each other — close enough that they are sometimes used loosely, but not exactly interchangeable.",
        },
      ]}
      sources={[fmvss138, uneceR39, tireRimAssociation]}
    >
      <TirePressureConverter />
    </ToolPage>
  );
}
