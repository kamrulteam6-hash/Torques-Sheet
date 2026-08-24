import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation, uneceR39 } from "../tool-sources";
import { RpmSpeedCalculator } from "./ui";

const tool = toolBySlug("rpm-speed-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Engine speed and road speed are locked together by gear ratio, axle ratio and tire diameter — set any three and the fourth follows exactly. This solves either direction across all five forward gears at once, so you can see where a shift point lands at a given speed, or what a target cruising RPM actually means for engine speed in every gear."
      steps={[
        {
          title: "Enter your tire size and axle ratio",
          detail:
            "These apply to every gear equally, so get them right once. The axle ratio is usually stamped on a tag at the differential, or encoded in a build sheet or door sticker axle code.",
        },
        {
          title: "Enter the gear ratios for your transmission",
          detail:
            "These are published per transmission model and vary by manufacturer — the defaults are a plausible five-speed spread, not your specific vehicle. Replace them with the real ratios where accuracy matters.",
        },
        {
          title: "Choose which direction to solve",
          detail:
            "Solve for RPM if you know a road speed and want to know what the engine is doing. Solve for speed if you know an RPM — a shift point, a redline, an idle — and want to know what road speed it represents.",
        },
        {
          title: "Read the overall ratio column, not just the gear ratio",
          detail:
            "The gear ratio alone tells you nothing about road speed without the axle ratio multiplied in. The overall ratio column already does that multiplication.",
        },
        {
          title: "Use the range figures to sanity-check the spread",
          detail:
            "The lowest-to-highest figure across gears shows whether the ratios are evenly spaced or bunched — useful when comparing a stock gear set against an aftermarket one.",
        },
      ]}
      formula={[
        {
          label: "Engine speed from road speed",
          expression: "RPM = (MPH × gear ratio × axle ratio × 1056) ÷ (π × tire diameter)",
          note: "1056 folds inches-per-mile and minutes-per-hour together: 63,360 ÷ 60.",
        },
        {
          label: "Road speed from engine speed",
          expression: "MPH = (RPM × π × tire diameter) ÷ (gear ratio × axle ratio × 1056)",
          note: "The same relationship solved for speed instead of engine RPM.",
        },
        {
          label: "Overall ratio",
          expression: "overall ratio = gear ratio × axle ratio",
          note: "The single number that actually relates engine speed to road speed in a given gear.",
        },
        {
          label: "Tire diameter's role",
          expression: "diameter appears in the denominator",
          note: "A taller tire lowers RPM at a given speed exactly as though the overall ratio had been reduced by the same proportion.",
        },
      ]}
      sections={[
        {
          heading: "Why every gear needs the same two inputs",
          paragraphs: [
            "Axle ratio and tire diameter do not change when the transmission shifts — only the gear ratio does. That is why this calculator solves all five gears from a single tire size and axle entry rather than asking for them per gear.",
            "It also means a tire size change or an axle swap moves every gear's RPM by the same percentage simultaneously. A 10% taller tire drops RPM by 10% in first gear and by 10% in fifth gear alike, because the tire sits downstream of every gear ratio in the chain.",
            "That uniformity is useful for spotting mistakes: if a change to gear ratios looks wildly uneven across the row, the ratios themselves are the likely source of the problem rather than the tire or axle figure.",
          ],
        },
        {
          heading: "Reading a shift point from the RPM range",
          paragraphs: [
            "The road-speed range across gears at a fixed RPM shows how a transmission is actually spaced, which the gear ratios alone do not communicate clearly.",
            "A wide gap between the road speed each gear reaches at redline means large jumps between shifts — the engine falls a long way down its power band on an upshift. A narrow, evenly spaced set of gaps means the engine stays closer to its power band through every shift, which is the usual goal of a close-ratio gearbox.",
            "This is also how to check whether a claimed gear set is actually close-ratio or merely has more gears. Five closely spaced ratios behave very differently from five gears with one enormous gap buried in the middle, and the table makes that gap visible immediately.",
          ],
        },
        {
          heading: "What moves the numbers, and by how much",
          bullets: [
            "A taller tire lowers RPM at any given speed, in direct proportion to the diameter increase",
            "A numerically higher axle ratio raises RPM at any given speed, also in direct proportion",
            "Gear ratio spacing decides how far RPM falls at each upshift, not the axle ratio",
            "Overdrive gears — ratios below 1.00 — exist specifically to lower cruising RPM for economy",
            "The same overall ratio can be reached by different combinations of axle and gearing, with different in-gear feel",
            "None of this changes the vehicle's top speed potential on its own — that also depends on available power at that RPM",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate engine RPM at a given speed?",
          answer:
            "Multiply road speed by the gear ratio, the axle ratio and 1056, then divide by π times the tire diameter in inches. This calculator does it across all five gears from one set of inputs.",
        },
        {
          question: "How do I calculate road speed from RPM?",
          answer:
            "Multiply RPM by π times the tire diameter, then divide by the gear ratio, the axle ratio and 1056. It is the same relationship as the RPM formula, solved the other way.",
        },
        {
          question: "Why does the same axle ratio give different RPM in each gear?",
          answer:
            "Because gear ratio also multiplies into the calculation. First gear typically multiplies torque and engine speed several times more than fifth gear does, at the same road speed and axle ratio.",
        },
        {
          question: "Does tire size affect every gear equally?",
          answer:
            "Yes. Tire diameter sits downstream of the entire drivetrain, so a size change shifts RPM by the same percentage in every gear simultaneously.",
        },
        {
          question: "What is overall gear ratio?",
          answer:
            "The gear ratio multiplied by the axle ratio. It is the single figure that actually relates engine speed to road speed in a given gear, and it is what this calculator's third table column shows.",
        },
        {
          question: "How do I find my transmission's gear ratios?",
          answer:
            "They are published per transmission model by the manufacturer, or listed in a factory service manual or build sheet. They are not something you calculate — enter the real figures for accuracy.",
        },
        {
          question: "What RPM should I cruise at on the highway?",
          answer:
            "It depends entirely on the vehicle's gearing and tire size — there is no universal figure. Use this calculator with your top gear's ratio and your actual tire size to find your own vehicle's cruising RPM.",
        },
        {
          question: "Why is my RPM higher than expected in top gear?",
          answer:
            "Usually a smaller-than-stock tire, a numerically higher axle ratio than assumed, or a top gear ratio above 1.00 rather than an overdrive below it. Check all three against the actual figures for your vehicle.",
        },
      ]}
      sources={[tireRimAssociation, fordDynoTips, uneceR39]}
    >
      <RpmSpeedCalculator />
    </ToolPage>
  );
}
