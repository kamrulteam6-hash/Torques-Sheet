import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { fordDynoTips, tireRimAssociation } from "../tool-sources";
import { WheelTorqueCalculator } from "./ui";

const tool = toolBySlug("wheel-torque-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="An engine's torque figure describes what happens at the crankshaft, and almost nothing that matters to acceleration happens at the crankshaft. Between the engine and the road sit a gearbox and a final drive, both of which multiply torque considerably, and then a tire, which turns that torque into an actual pushing force. This works out what genuinely reaches the pavement."
      steps={[
        {
          title: "Enter the engine's torque figure",
          detail:
            "Use the peak torque figure from the specification sheet, understanding that this calculation applies at whatever engine speed that peak occurs.",
        },
        {
          title: "Enter the gear ratio for the gear you care about",
          detail:
            "First gear multiplies torque the most and is usually the largest number in the gearbox. Use whichever gear you are actually interested in — launch torque and cruising torque are very different questions.",
        },
        {
          title: "Enter the final drive ratio",
          detail:
            "This multiplies every gear equally, so getting it right matters regardless of which gear you are examining.",
        },
        {
          title: "Set a realistic drivetrain efficiency",
          detail:
            "Nothing is 100% efficient. A manual transmission in a well-maintained rear-wheel-drive car loses roughly 10%; an automatic or an all-wheel-drive system with a transfer case commonly loses 15 to 20%.",
        },
        {
          title: "Read tractive force, not just torque",
          detail:
            "Torque at the wheel depends on tire size as well as the drivetrain, because a larger tire has more leverage against the ground. Tractive force is the actual pushing force at the contact patch, and it is the figure that determines acceleration.",
        },
      ]}
      formula={[
        {
          label: "Overall ratio",
          expression: "overall ratio = gear ratio × final drive ratio",
          note: "First gear on a typical manual, multiplied by a 3.55 axle, can easily exceed 10:1.",
        },
        {
          label: "Wheel torque",
          expression: "wheel torque = engine torque × overall ratio × efficiency",
          note: "The efficiency term accounts for friction, windage and flex losses through the gearbox and driveshaft.",
        },
        {
          label: "Tractive force",
          expression: "force (lb) = wheel torque (lb·ft) ÷ tire radius (ft)",
          note: "The actual pushing force at the contact patch — what accelerates the vehicle, as distinct from torque, which is a twisting effort.",
        },
        {
          label: "Radius from diameter",
          expression: "radius (ft) = tire diameter (in) ÷ 2 ÷ 12",
          note: "A taller tire reduces tractive force at a given wheel torque, because the same twisting effort is applied over a longer lever arm.",
        },
      ]}
      sections={[
        {
          heading: "Why first gear multiplies torque so dramatically",
          paragraphs: [
            "A gearbox is a set of torque multipliers, and first gear is the largest multiplier in the set for a straightforward reason: it is the gear that has to move a stationary vehicle, which needs the most force available.",
            "A typical first gear ratio around 3.5:1, combined with a 3.55:1 final drive, produces an overall ratio above 12:1. An engine making 300 lb·ft at the crank is delivering something in the neighbourhood of 3,200 lb·ft at the wheel in that gear, once efficiency losses are accounted for — more than ten times the engine's own figure.",
            "That multiplication is exactly why a modest engine can still move a heavy vehicle from rest, and why the engine's crank torque figure alone tells you so little about how a car actually launches. The gearing is doing as much of the work as the engine is.",
          ],
        },
        {
          heading: "Torque against tractive force — why they are not the same question",
          paragraphs: [
            "Wheel torque is a twisting effort. Tractive force is what that twisting effort actually produces at the road, and the two are connected by tire radius rather than being interchangeable.",
            "A larger tire has a longer lever arm from the axle centre to the contact patch, so the same wheel torque produces less tractive force through a bigger tire than through a smaller one. This is the same relationship that makes taller tires feel like a numerically lower gear — it is the identical geometry, described from the force side instead of the speed side.",
            "That is also why fitting significantly larger tires without regearing costs more than speedometer accuracy. It genuinely reduces the tractive force available at the road in every gear, which is felt directly as duller acceleration.",
          ],
        },
        {
          heading: "Where the losses actually go",
          bullets: [
            "Gear mesh friction in the transmission, which rises with the number of gear pairs power passes through",
            "Bearing friction throughout the transmission and differential",
            "Windage from gears churning through gear oil, particularly noticeable in high-revving applications",
            "Driveshaft and universal joint losses, larger on trucks with longer shafts and steeper working angles",
            "Torque converter slip on an automatic, which is why manuals are typically the more efficient choice",
            "Transfer case and additional driveshaft losses on four-wheel and all-wheel drive, which is why those systems typically run 5 to 10 percentage points less efficient than an equivalent two-wheel-drive layout",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I calculate torque at the wheels?",
          answer:
            "Multiply engine torque by the gear ratio, then by the final drive ratio, then by drivetrain efficiency. A 300 lb·ft engine in first gear at 3.5:1 through a 3.55 axle at 88% efficiency delivers roughly 3,280 lb·ft at the wheel.",
        },
        {
          question: "Why is wheel torque so much higher than engine torque?",
          answer:
            "Because the gearbox and final drive multiply it. First gear alone commonly multiplies torque by three to four times, and the final drive multiplies it again, so the combined effect through a typical drivetrain exceeds ten times the engine's own figure.",
        },
        {
          question: "What is a typical drivetrain efficiency?",
          answer:
            "Roughly 85 to 90% for a manual transmission in a rear or front-wheel-drive layout, and 75 to 85% for an automatic or a system with a transfer case for four-wheel or all-wheel drive.",
        },
        {
          question: "Does tire size affect wheel torque?",
          answer:
            "Tire size does not change wheel torque itself, but it changes the tractive force that torque produces — a larger tire has more leverage, so the same wheel torque produces less pushing force at the road.",
        },
        {
          question: "What is tractive force?",
          answer:
            "The actual pushing force at the tire's contact patch, found by dividing wheel torque by the tire's radius. It is the figure that determines acceleration, as distinct from torque, which is a twisting effort.",
        },
        {
          question: "Why does 4WD lose more power than 2WD?",
          answer:
            "The extra hardware — transfer case, additional driveshaft, front differential — each adds its own friction loss. A typical four-wheel or all-wheel-drive system runs 5 to 10 percentage points less efficient than an equivalent two-wheel-drive layout.",
        },
        {
          question: "Which gear has the most torque at the wheels?",
          answer:
            "First gear, because it carries the highest gear ratio and therefore the largest overall multiplication of engine torque. Each successive gear reduces the multiplier, trading torque for road speed.",
        },
        {
          question: "How does a taller tire affect acceleration?",
          answer:
            "It reduces tractive force at a given wheel torque, because the same twisting effort is applied through a longer lever arm. This is the same effect that lowers engine RPM at a given speed, described from the force side rather than the speed side.",
        },
      ]}
      sources={[fordDynoTips, tireRimAssociation]}
    >
      <WheelTorqueCalculator />
    </ToolPage>
  );
}
