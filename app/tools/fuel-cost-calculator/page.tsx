import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { cfrLabeling, epaTesting, uneceR39 } from "../tool-sources";
import { FuelCostCalculator } from "./ui";

const tool = toolBySlug("fuel-cost-calculator")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="Fuel economy only becomes useful once it is converted into money. This starts from a real fill-up rather than the trip computer's estimate, works out your actual MPG, and turns it into the figures that matter: what a mile costs, what a trip costs, how far a tank goes, and what the year adds up to."
      steps={[
        {
          title: "Fill the tank completely and reset the trip meter",
          detail:
            "Fill to the first automatic click of the pump rather than topping up afterwards. Consistency between the two fills matters more than how full either one is.",
        },
        {
          title: "Drive normally until the tank is well down",
          detail:
            "A longer measurement is a more accurate one, because any error in judging the fill level is spread over more miles. Half a tank is the minimum worth using.",
        },
        {
          title: "Fill again, to the same point",
          detail:
            "The gallons on this receipt are exactly what the trip meter's miles consumed. That is the whole measurement — everything else follows from those two numbers.",
        },
        {
          title: "Enter both figures and the price you paid",
          detail:
            "Cost per mile is the number worth remembering. It converts any journey into money without further arithmetic, and it makes two vehicles genuinely comparable.",
        },
        {
          title: "Use the tables to see what changes matter",
          detail:
            "One shows what happens if fuel prices move; the other what a few MPG in either direction is worth over a year. Both are usually more revealing than the headline figure.",
        },
      ]}
      formula={[
        {
          label: "Miles per gallon",
          expression: "MPG = miles driven ÷ gallons to refill",
          note: "The whole calculation. Everything else on this page derives from it.",
        },
        {
          label: "Cost per mile",
          expression: "cost per mile = price per gallon ÷ MPG",
          note: "The most portable figure you can carry, because it converts any distance directly into money.",
        },
        {
          label: "Litres per 100 km",
          expression: "L/100km = 235.215 ÷ MPG",
          note: "An inverse relationship, which is why the two scales do not move in step — the constant assumes US gallons.",
        },
        {
          label: "Range on a tank",
          expression: "range = tank capacity × MPG",
          note: "A theoretical maximum. Real usable range is lower, because nobody runs a tank to empty.",
        },
      ]}
      sections={[
        {
          heading: "Why the trip computer disagrees with you",
          paragraphs: [
            "Most trip computers read a little optimistic, and the gap is often two or three miles per gallon.",
            "The reason is that they do not measure fuel. They calculate it, from injector pulse width and duration — how long the injectors were commanded open, multiplied by an assumed flow rate. That estimate is good but it is still an estimate, and it inherits any error in the assumptions.",
            "It also inherits any error in the distance. The computer divides its estimated fuel by the odometer's recorded miles, so if the odometer is off because of a tire size change, the economy figure is off by the same proportion.",
            "Measuring at the pump avoids both problems. The gallons are what you were charged for, and while the trip meter still supplies the distance, at least the fuel side is real. That is why a hand-calculated figure is the one worth trusting, and why the two rarely match.",
          ],
        },
        {
          heading: "Why the window sticker disagrees with you too",
          paragraphs: [
            "The EPA figure on a new vehicle's label is not a single measurement, and it is not taken on a road. Understanding how it is produced explains most of the gap between it and what you actually see.",
            "Since 2008 the label has come from five separate laboratory test cycles. The two originals cover city and highway driving; three supplemental tests were added to capture what those missed — US06 for higher speeds and harder acceleration, SC03 for air conditioning load, and a cold-temperature FTP for what happens when the engine has not warmed up.",
            "Results from those five are weighted and adjusted for wind, tire pressure, fuel and road surface, and the combined figure published on the sticker is a weighted average of 55 percent city driving and 45 percent highway. The calculation itself is defined in regulation, at 40 CFR 600.210-12, rather than left to the manufacturer.",
            "So the sticker describes a specific weighted blend of laboratory conditions. Your commute is not that blend, your climate is not that laboratory, and your right foot is not the test schedule. Neither figure is wrong — they are answers to different questions, and the one you measure at the pump is the one that describes your vehicle.",
          ],
        },
        {
          heading: "Cost per mile is the figure to carry",
          paragraphs: [
            "MPG is the number everyone quotes, and it is the harder one to use. Cost per mile is the one that answers questions.",
            "Once you know a vehicle costs, say, 19 cents a mile in fuel, any journey converts instantly. A 40-mile round trip is about $7.60. A 300-mile weekend is $57. There is no second calculation and no need to remember the fuel price.",
            "It also makes vehicles genuinely comparable in a way MPG does not, because it folds in the price of the fuel each one actually takes. A diesel at 32 MPG and a petrol vehicle at 30 MPG look close until the price difference per gallon is applied — and cost per mile applies it automatically.",
            "The one thing to watch is that it moves with fuel prices, so it is worth recalculating when prices shift meaningfully. The table above does that in advance across a range either side of what you paid.",
          ],
        },
        {
          heading: "Why MPG improvements are worth less than they look",
          bullets: [
            "Going from 15 to 20 MPG saves far more fuel than going from 30 to 35 MPG over the same distance",
            "That is because MPG is an inverse measure — gallons per mile is what actually costs money",
            "Over 12,000 miles, 15 to 20 MPG saves 200 gallons; 30 to 35 MPG saves only 57",
            "This is exactly why the rest of the world quotes litres per 100 km instead",
            "L/100km is a direct measure, so equal improvements represent equal savings",
            "When comparing two vehicles, compare gallons used over a fixed distance rather than MPG",
          ],
        },
        {
          heading: "What actually moves the number",
          paragraphs: [
            "Most of the advice about improving fuel economy is worth very little. A few things genuinely matter.",
            "Speed matters most, because aerodynamic drag rises with the square of velocity. The difference between 65 and 80 mph on a long journey is substantial and entirely within your control.",
            "Tire pressure matters, and it is free. Underinflated tires increase rolling resistance continuously, and the loss is proportional to how far off the placard pressure they are. Check them cold, against the door placard rather than the sidewall maximum.",
            "Weight and roof load matter. A roof rack or box left on when not needed costs economy on every journey, and the aerodynamic penalty is larger than the weight penalty.",
            "And a mechanical fault will quietly cost more than any driving technique. A lean or rich mixture, a failing oxygen sensor, a dragging brake or a clogged air filter all show up as fuel consumption before they show up as anything else. If economy has dropped noticeably without a change in how you drive, that is a diagnostic signal rather than a habit problem.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do you calculate MPG?",
          answer:
            "Divide the miles driven since the last fill by the gallons it took to refill. Fill to the same point both times so the two measurements are consistent.",
        },
        {
          question: "How do I work out cost per mile?",
          answer:
            "Divide the price per gallon by your MPG. At $3.45 a gallon and 24 MPG, that is about 14.4 cents a mile.",
        },
        {
          question: "Why is my trip computer's MPG different from mine?",
          answer:
            "Because it estimates fuel from injector pulse width rather than measuring it, and it uses odometer distance that may itself be off. Hand-calculated figures from the pump are the more reliable of the two.",
        },
        {
          question: "How do I convert MPG to L/100km?",
          answer:
            "Divide 235.215 by the MPG figure. It is an inverse relationship, so the two scales do not move in step — the constant assumes US gallons.",
        },
        {
          question: "How far can I drive on a tank?",
          answer:
            "Multiply tank capacity by MPG. Treat that as a maximum rather than a plan, since the last couple of gallons are not reliably usable.",
        },
        {
          question: "Is it better to improve from 15 to 20 MPG or 30 to 35?",
          answer:
            "From 15 to 20, by a wide margin. Over 12,000 miles that saves 200 gallons, while 30 to 35 saves only 57. MPG is an inverse measure, which makes equal-looking gains very unequal.",
        },
        {
          question: "Why is my MPG lower than the EPA rating?",
          answer:
            "The label figure comes from five laboratory test cycles, weighted 55 percent city and 45 percent highway under 40 CFR 600.210-12. It describes a specific blend of controlled conditions rather than your commute, your climate or your driving.",
        },
        {
          question: "How does the EPA measure fuel economy?",
          answer:
            "With five test cycles run in a laboratory: the original city and highway procedures plus US06 for higher speeds, SC03 for air conditioning load, and a cold-temperature test. The results are weighted and adjusted into the sticker figures.",
        },
        {
          question: "Do bigger tires affect my MPG calculation?",
          answer:
            "Yes, through the odometer. Taller tires make the recorded distance shorter than the real one, so the calculated MPG comes out lower than reality by the same percentage as the diameter change.",
        },
        {
          question: "What is a normal cost per mile for fuel?",
          answer:
            "It depends entirely on the vehicle and the fuel price. A 30 MPG car at $3.45 costs about 11.5 cents a mile; a 15 MPG truck at the same price costs 23 cents. Calculate your own rather than using an average.",
        },
      ]}
      sources={[epaTesting, cfrLabeling, uneceR39]}
    >
      <FuelCostCalculator />
    </ToolPage>
  );
}
