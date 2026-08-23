import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { SpeedometerErrorCalculator } from "./ui";

const tool = toolBySlug("speedometer-error-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A speedometer does not measure road speed. It measures how fast the wheels are turning and converts that into a number using a rolling circumference fixed when the vehicle was built. Change the tire size and that conversion becomes wrong by a predictable amount — this works out exactly how wrong, at any speed, along with what it does to your odometer."
      steps={[
        {
          title: "Find the size the vehicle was calibrated for",
          detail:
            "It is on the tire and loading placard, usually in the driver's door jamb. This is the original equipment size, which is not always what is fitted now — and the calibration follows the placard, not the rubber.",
        },
        {
          title: "Enter the size actually on the vehicle",
          detail:
            "Read it off the sidewall. If someone changed sizes before you bought the vehicle, this is where the discrepancy shows up.",
        },
        {
          title: "Read the error percentage first",
          detail:
            "It is a fixed proportion, not a fixed number of miles per hour. That means the absolute error grows the faster you drive — an issue at highway speed even when it looks small around town.",
        },
        {
          title: "Check the direction, not just the size of the error",
          detail:
            "Taller tires make the speedometer read low, so you are going faster than it shows. Shorter tires make it read high. The direction is what decides whether the error works for you or against you.",
        },
        {
          title: "Decide whether to recalibrate",
          detail:
            "Many vehicles allow the tire size to be reset by a dealer or an aftermarket tool. That corrects the speedometer, the odometer and anything else deriving speed from wheel rotation in one operation.",
        },
      ]}
      formula={[
        {
          label: "True speed",
          expression: "true speed = indicated speed × (new diameter ÷ old diameter)",
          note: "The whole calculation reduces to this ratio. Everything else on the page is a consequence of it.",
        },
        {
          label: "Error percentage",
          expression: "error (%) = (new diameter − old diameter) ÷ old diameter × 100",
          note: "Identical to the diameter change. A 4% taller tire produces exactly 4% of speedometer error.",
        },
        {
          label: "Odometer drift",
          expression: "actual miles = indicated miles × (new diameter ÷ old diameter)",
          note: "The same ratio applied over distance instead of over time.",
        },
        {
          label: "Revolutions per mile",
          expression: "revs per mile = 63,360 ÷ (π × diameter)",
          note: "The figure the calibration is actually built around. Two tires with the same revs per mile produce no error regardless of how differently their sizes read.",
        },
      ]}
      sections={[
        {
          heading: "Why the error is a percentage and not a fixed amount",
          paragraphs: [
            "The most useful thing to understand here is that speedometer error scales. It is not a constant offset of two or three miles per hour that you can memorise and mentally subtract.",
            "The instrument counts wheel rotations and multiplies by an assumed distance per rotation. If the real tire covers 4% more ground per rotation than assumed, then every rotation contributes 4% more distance than the instrument credits — at 20 mph and at 80 mph alike.",
            "In practice that means a 4% error is 0.8 mph at an indicated 20, and 3.2 mph at an indicated 80. The percentage never changes; the number of miles per hour it represents does. That is why an error that feels trivial in town can matter on a motorway, and why the table above lists several speeds rather than one.",
          ],
        },
        {
          heading: "Which direction the error runs",
          paragraphs: [
            "Taller tires cover more ground per revolution than the calibration expects, so the vehicle is going faster than the dial shows. This is the direction most people encounter, because most size changes are upward.",
            "Shorter tires do the reverse. The wheel turns more times to cover the same ground, the instrument counts more rotations, and the dial reads higher than your actual speed.",
            "The direction matters more than the magnitude for some purposes. A speedometer reading low is the one that costs you a ticket, because you are travelling faster than you believe. A speedometer reading high is the one that costs you resale value, because the odometer is adding distance the vehicle never covered.",
            "Worth knowing: most manufacturers calibrate speedometers to read slightly high from the factory — typically a couple of percent — precisely so that the instrument never understates your speed. Fitting slightly taller tires can therefore make an indicated speed more accurate rather than less, up to a point.",
          ],
        },
        {
          heading: "What else derives from the same wheel-speed signal",
          bullets: [
            "The odometer, which drifts by the same percentage over distance rather than time",
            "Cruise control, which will hold a true speed different from the one you set",
            "Trip computer fuel economy, which divides recorded distance by fuel used",
            "Anti-lock braking and stability control, which compare wheel speeds against expected values",
            "Adaptive cruise and lane-keeping systems, which use vehicle speed as an input",
            "Warranty and lease mileage, where under-recording quietly accumulates in your favour and over-recording against you",
          ],
        },
        {
          heading: "When recalibration is worth doing",
          paragraphs: [
            "If the vehicle supports it, recalibration is almost always the right answer for anything beyond about 3%. It is a software change rather than a mechanical one on most modern vehicles, and it fixes every downstream system at once rather than leaving you doing mental arithmetic.",
            "The exceptions are older vehicles, where correction may mean changing a physical drive gear in the transmission, and vehicles where the calibration is locked. In those cases the practical approach is to know the number and account for it — particularly for the odometer, where the drift compounds silently over years.",
            "It is also worth recalibrating before selling. An odometer reading that is several percent adrift is a genuine discrepancy in the vehicle's recorded history, and correcting it while you still own the vehicle is considerably simpler than explaining it afterwards.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How much does tire size affect the speedometer?",
          answer:
            "By exactly the percentage the overall diameter changes. A tire 4% taller than the original makes the speedometer read 4% low at every speed, so an indicated 60 mph is really about 62.4 mph.",
        },
        {
          question: "Do bigger tires make the speedometer read faster or slower?",
          answer:
            "Slower — the dial reads lower than your true speed. A taller tire covers more ground per revolution than the calibration assumes, so you are going faster than the instrument shows.",
        },
        {
          question: "Will bigger tires affect my odometer too?",
          answer:
            "Yes, by the same proportion. With tires 4% taller, every indicated 1,000 miles is really about 1,040 miles covered. Over a lease or warranty period that difference becomes significant.",
        },
        {
          question: "How do I fix speedometer error after changing tires?",
          answer:
            "Most modern vehicles allow the tire size to be recalibrated by a dealer or with an aftermarket programmer. Older vehicles may need a physical speedometer drive gear change instead.",
        },
        {
          question: "Is a 3% speedometer error acceptable?",
          answer:
            "It is the conventional threshold, largely because factory speedometers already read a little high as a safety margin. Beyond about 3% the error becomes noticeable at highway speed and worth correcting.",
        },
        {
          question: "Can I get a ticket because of speedometer error?",
          answer:
            "Enforcement measures your actual speed, not what your dial shows, so a speedometer reading low will not protect you. That is the direction worth taking seriously if you have fitted taller tires.",
        },
        {
          question: "Does tire wear change the error?",
          answer:
            "Slightly. A worn tire is a little smaller in diameter than a new one of the same size, typically under 1%, which nudges the speedometer toward reading high. It is real but small next to a size change.",
        },
        {
          question: "Does tire pressure affect speedometer accuracy?",
          answer:
            "Marginally. Lower pressure reduces the rolling radius a little, which has the same effect as a slightly smaller tire. It is not enough to matter for accuracy, though it matters plenty for safety and wear.",
        },
      ]}
    >
      <SpeedometerErrorCalculator />
    </ToolPage>
  );
}
