import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { FinalDriveRatioCalculator } from "./ui";

const tool = toolBySlug("final-drive-ratio-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Final drive ratio and differential ratio name the same number — the differential is the assembly, final drive describes its function as the last stage of gear reduction before the wheels — so the two terms are used interchangeably depending on who is talking. This works out the ratio directly from the ring and pinion tooth counts, which is the physical definition rather than an estimate."
      steps={[
        {
          title: "Count the ring gear teeth",
          detail: "The ring gear is the larger gear, bolted to the differential carrier. Its tooth count is often stamped on the gear itself, or countable directly with the cover removed.",
        },
        {
          title: "Count the pinion gear teeth",
          detail: "The pinion is the smaller gear that the driveshaft turns. Its tooth count is usually stamped on the pinion head.",
        },
        {
          title: "Divide ring by pinion",
          detail: "That division is the entire calculation. A 41-tooth ring on a 10-tooth pinion is a 4.10:1 ratio, and there is nothing more to it.",
        },
        {
          title: "Compare against a standard ratio to check the count",
          detail: "Production ratios cluster around a known set of values. A result that lands close to one of them is a good sign the tooth count was read correctly; a result that doesn't match anything is worth recounting.",
        },
      ]}
      formula={[
        {
          label: "Final drive (differential) ratio",
          expression: "ratio = ring gear teeth ÷ pinion gear teeth",
          note: "The physical definition of the number. Every other method — RPM comparison, driveshaft counting — is an indirect way of arriving at the same figure.",
        },
      ]}
      sections={[
        {
          heading: "Why 'final drive' and 'differential ratio' mean the same thing",
          paragraphs: [
            "This confuses people because it sounds like it should be two different numbers, and it is worth settling plainly: it is one number with two names, describing the same ring-and-pinion gear set.",
            "'Differential ratio' names it by the assembly it lives in — the differential housing that also splits torque between the two drive wheels. 'Final drive ratio' names it by its position in the drivetrain — the last stage of gear reduction the engine's torque passes through before it reaches the wheels.",
            "Both terms appear throughout the industry depending on context — dealer documentation and axle codes tend to say differential ratio, while performance and gearing discussions tend to say final drive. If you see both used about the same vehicle, that is not a contradiction; it is the same specification described two ways.",
          ],
        },
        {
          heading: "Why counting teeth beats every other method",
          paragraphs: [
            "Every other way of finding an axle ratio — comparing engine RPM to road speed, counting driveshaft rotations against a wheel turn — is an inference. It works backwards from an effect to the cause, and it inherits whatever measurement error exists in speed, tire size or timing.",
            "Counting teeth is direct. The ring gear has however many teeth it has, the pinion has however many it has, and dividing one by the other is the ratio, exactly, with no measurement uncertainty beyond miscounting.",
            "The practical drawback is access — this method needs the differential cover off, or a build sheet that states the tooth counts, which is more involved than a road test. It is the right method when precision matters, such as confirming a gear set before ordering a matching one for a companion axle.",
          ],
        },
      ]}
      faqs={[
        {
          question: "What is the difference between final drive ratio and differential ratio?",
          answer: "Nothing — they name the same ring-and-pinion gear set. Final drive describes its position as the last reduction stage before the wheels; differential ratio names it by the assembly it sits in.",
        },
        {
          question: "How do I calculate final drive ratio from teeth?",
          answer: "Divide the ring gear's tooth count by the pinion's. A 41-tooth ring on a 10-tooth pinion is 4.10:1.",
        },
        {
          question: "Where do I find the ring and pinion tooth counts?",
          answer: "Often stamped on the gears themselves, visible with the differential cover removed, or listed on a build sheet or parts catalogue for the specific gear set installed.",
        },
        {
          question: "Why doesn't my tooth count match a standard ratio?",
          answer: "Either the count is slightly off — a common error is miscounting the pinion by one tooth, which moves the ratio noticeably — or the vehicle has a non-standard gear set. Recount before assuming the latter.",
        },
        {
          question: "Does a limited-slip differential change the ratio?",
          answer: "No. A limited-slip or locking differential changes how torque is split between the two wheels, not the ring-and-pinion reduction ratio, which is set entirely by the tooth counts.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <FinalDriveRatioCalculator />
    </ToolPage>
  );
}
