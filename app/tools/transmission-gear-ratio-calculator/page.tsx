import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips } from "../tool-sources";
import { TransmissionGearRatioCalculator } from "./ui";

const tool = toolBySlug("transmission-gear-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A single transmission gear's ratio can be measured without ever opening the gearbox: put the vehicle on a lift with the wheels free to turn, select the gear, and compare how fast the input shaft turns against the output shaft. This works out the ratio from that comparison, and explains what a result above, below or at 1:1 actually means."
      steps={[
        {
          title: "Get the vehicle safely on a lift",
          detail: "Wheels need to be free to rotate for the output shaft to turn at all. Never attempt this measurement with the vehicle on the ground.",
        },
        {
          title: "Select the gear you want to measure",
          detail: "Manual transmissions: hold the clutch, select the gear, ease it out slowly with the engine idling. Automatics: the same test uses the torque converter's input speed, which is closer to but not identical to engine speed.",
        },
        {
          title: "Read input and output shaft speed",
          detail: "Input is engine speed on a manual, or converter input on an automatic. Output is driveshaft speed — measurable with a tachometer probe or an OBD-II data logger on many vehicles.",
        },
        {
          title: "Divide input by output",
          detail: "That gives the gear ratio. A result above 1.0 is an underdrive gear (typical of the lower gears); a result below 1.0 is an overdrive.",
        },
      ]}
      formula={[
        {
          label: "Transmission gear ratio",
          expression: "ratio = input shaft speed ÷ output shaft speed",
          note: "Numerically identical to counting the teeth on the gear pair actually engaged, but measurable without disassembly.",
        },
      ]}
      sections={[
        {
          heading: "Why gear ratio and axle ratio get confused",
          paragraphs: [
            "Both are expressed the same way — a number to one — and both multiply torque while dividing speed, which makes them easy to conflate. The difference is where each one lives and how many of them a vehicle has.",
            "A transmission has one gear ratio per gear — five, six, eight or ten of them on a modern gearbox, one active at a time depending on which gear is selected. The final drive (axle) ratio is fixed: one number, set by the ring and pinion in the differential, that applies in every gear equally.",
            "This tool measures the gear ratio specifically — whichever single gear is engaged during the test. Combine it with the axle ratio, using the overall gear ratio calculator, to get the number that actually relates engine speed to road speed.",
          ],
        },
        {
          heading: "Reading what the result tells you",
          bullets: [
            "A ratio above about 2.5 is almost certainly first gear — high torque multiplication, low top speed in that gear",
            "A ratio between roughly 1.2 and 1.8 typically indicates a middle gear",
            "A ratio at or near 1.00 is a direct-drive gear — nothing multiplied or divided, common as fourth on a five-speed or a mid-range gear on a wider-ratio box",
            "A ratio below about 0.95 is an overdrive — the output shaft outruns the input, lowering engine speed for a given road speed",
            "Modern 8 and 10-speed automatics often have two or more overdrive gears, sometimes down near 0.6:1 in top gear",
            "None of these ranges are fixed rules — they describe typical practice rather than a specification",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate transmission gear ratio?",
          answer: "Divide input shaft speed by output shaft speed for the gear engaged. A 3,500 rpm input against a 1,000 rpm output is a 3.5:1 ratio.",
        },
        {
          question: "What is the difference between gear ratio and axle ratio?",
          answer: "Gear ratio is one of several values inside the transmission, one active per gear selected. Axle ratio is a single fixed value in the differential that applies in every gear.",
        },
        {
          question: "How do I measure gear ratio without removing the transmission?",
          answer: "On a lift with wheels free to turn, compare input shaft speed (engine, or converter input on an automatic) against output shaft (driveshaft) speed while the gear is engaged.",
        },
        {
          question: "What does a 1:1 gear ratio mean?",
          answer: "Direct drive — the output shaft turns at exactly the same speed as the input, so that gear itself neither multiplies torque nor increases speed.",
        },
        {
          question: "Is overdrive always the highest gear?",
          answer: "Usually, but not always — some transmissions have more than one overdrive ratio, particularly modern 8 and 10-speed automatics with several gears below 1:1.",
        },
      ]}
      sources={[fordDynoTips]}
    >
      <TransmissionGearRatioCalculator />
    </ToolPage>
  );
}
