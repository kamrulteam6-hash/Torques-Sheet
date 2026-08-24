import { pageMetadata } from "../../seo";
import { ToolPage } from "../tool-page";
import { toolBySlug, toolPath } from "../tools-data";
import { nhtsaVpic, nhtsaVpicDocs, iso3779 } from "../tool-sources";
import { VinDecoder } from "./ui";

const tool = toolBySlug("vin-decoder")!;

export const metadata = pageMetadata({
  title: tool.metaTitle,
  description: tool.description,
  path: toolPath(tool.slug),
});

export default function Page() {
  return (
    <ToolPage
      slug={tool.slug}
      intro="A VIN is not a serial number with extra characters. It is a structured code in which every position means something, and one of those positions exists purely to prove the other sixteen were transcribed correctly. This checks that structure in your browser first, then decodes the vehicle against NHTSA's public vPIC database — the same record manufacturers file their own specifications into."
      steps={[
        {
          title: "Find the VIN on the vehicle, not the paperwork",
          detail:
            "It is on a plate at the base of the windscreen on the driver's side, and on a label in the driver's door jamb. Both should match the registration document — if they do not, stop and find out why before anything else.",
        },
        {
          title: "Type all seventeen characters",
          detail:
            "The structure is checked locally as you type, and nothing is sent anywhere until the VIN is complete and structurally valid. There is no I, O or Q in any VIN, so if you think you see one it is a 1 or a 0.",
        },
        {
          title: "Read the check-digit verdict first",
          detail:
            "Position 9 is calculated from the other sixteen characters. If it does not agree, there is a transcription error somewhere and every decode below it is describing a different vehicle.",
        },
        {
          title: "Add the model year if you know it",
          detail:
            "Position 10 runs on a 30-year cycle, so the same letter means two possible years. Supplying the year resolves the ambiguity and improves what NHTSA returns.",
        },
        {
          title: "Treat a blank result as a records gap, not an invalid VIN",
          detail:
            "vPIC holds what manufacturers have filed. Older vehicles, imports and low-volume models are often thin or absent, and that says nothing about whether the VIN is genuine.",
        },
      ]}
      formula={[
        {
          label: "Check digit — transliterate",
          expression: "A=1 B=2 C=3 D=4 E=5 F=6 G=7 H=8 J=1 K=2 L=3 M=4 N=5 P=7 R=9 S=2 T=3 U=4 V=5 W=6 X=7 Y=8 Z=9",
          note: "Digits keep their own value. There is no I, O or Q to transliterate, which is why they are excluded from VINs in the first place.",
        },
        {
          label: "Check digit — weight by position",
          expression: "weights = 8 7 6 5 4 3 2 10 0 9 8 7 6 5 4 3 2",
          note: "Position 9 carries a weight of zero because it is the check digit itself and cannot contribute to its own calculation.",
        },
        {
          label: "Check digit — result",
          expression: "check digit = (Σ value × weight) mod 11, where 10 is written as X",
          note: "This is why a check digit can be the letter X while every other numeric position is a digit.",
        },
        {
          label: "Model year",
          expression: "position 10 → ABCDEFGHJKLMNPRSTVWXY123456789 mapped from 1980",
          note: "A 30-character cycle, so A is 1980 and also 2010. A letter in position 7 indicates the later cycle on light vehicles.",
        },
      ]}
      sections={[
        {
          heading: "The check digit is the part worth understanding",
          paragraphs: [
            "Almost every VIN tool decodes. Very few tell you whether the VIN you typed can even be real, and that is the check most likely to save you from a wasted afternoon.",
            "Position 9 is not information about the vehicle. It is arithmetic performed on the other sixteen characters: each one is converted to a number, multiplied by a positional weight, and the total is divided by eleven. The remainder is the check digit, written as X when it comes to ten.",
            "The consequence is that any single mistyped character — and almost every transposition of two — produces a check digit that no longer agrees. So a VIN that fails this test has not been entered correctly, and no amount of database lookup will fix that. It is also why the test works with no internet connection and no records at all.",
            "One caveat worth knowing: the check digit is mandatory on North American vehicles but not universally enforced elsewhere. A European or Asian-market vehicle can carry a VIN that fails the calculation and is nonetheless entirely genuine, so treat a failure as a strong signal to re-read the plate rather than as proof of forgery.",
          ],
        },
        {
          heading: "Why position 10 is ambiguous, and how position 7 fixes it",
          paragraphs: [
            "The model year sits in position 10, encoded as a single character. There are only 30 characters in the cycle — the alphabet without I, O, Q, U and Z, then the digits 1 to 9 — so the code repeats every thirty years.",
            "That means the letter A is 1980 and also 2010. B is 1981 and 2011. On its own, position 10 cannot tell you which.",
            "The convention that resolves it uses position 7. On light vehicles, a letter there indicates a model year of 2010 or later, and a digit indicates 2009 or earlier. It is not part of the original standard; it is a workaround the industry adopted as the first cycle came round again.",
            "This is also why supplying the year improves a decode. NHTSA can return more accurate specifications when it does not have to guess which cycle a vehicle belongs to, and it will tell you when it has had to guess.",
          ],
        },
        {
          heading: "What a VIN decode can and cannot tell you",
          bullets: [
            "Can: model year, make, model, body style, engine, plant, and the safety equipment fitted as standard",
            "Can: whether the VIN is internally consistent, from the check digit alone",
            "Cannot: mileage, ownership history, accident record or outstanding finance",
            "Cannot: options fitted at the dealer, or anything changed after the vehicle left the plant",
            "Cannot: the actual engine in the car now, if it has been replaced",
            "For recalls, NHTSA runs a separate VIN lookup — a decode does not include them",
          ],
        },
        {
          heading: "Where the data comes from, and why it is sometimes thin",
          paragraphs: [
            "This tool decodes against vPIC, the Vehicle Product Information Catalog run by NHTSA. It is a public database, free to query, and it is populated from what manufacturers themselves file for vehicles sold in the United States.",
            "That origin explains its pattern of coverage. A mainstream vehicle from the last fifteen years usually decodes richly — engine, displacement, injection type, brake system, airbag positions, plant city. A 1990s vehicle often returns little more than make, model and year. An import never sold in the US may return almost nothing.",
            "None of that indicates a problem with the VIN. It reflects when manufacturer filing became comprehensive, and which vehicles were in scope. Where a decode comes back thin, the VIN structure section on this page still tells you a good deal, because that is derived from the standard rather than from records.",
            "One deliberate design decision: the request is proxied through this site rather than made from your browser. vPIC sends no cross-origin header, so a direct call is impossible anyway — but the arrangement also means the VIN is not sent to a third party from your own address, and it is not logged here.",
          ],
        },
        {
          heading: "Treat a VIN as identifying information",
          paragraphs: [
            "A VIN identifies one specific vehicle, and a vehicle usually identifies a person. It is worth a moment of care.",
            "Posting a full VIN publicly — in a forum thread, a listing photograph, a social media post — lets anyone look up the vehicle, and in some jurisdictions lets them order keys or documents. The convention when asking for help online is to redact the last six characters, the sequential serial. Everything diagnostically useful sits in the first eleven.",
            "When buying, the reverse applies: you want the full VIN from the seller, checked against the plate on the vehicle and the door jamb label, and against the registration document. A mismatch between any of those is the single most important thing a VIN check can surface, and it is the one no decode will tell you — only your own eyes on the vehicle will.",
            "On this page the VIN stays in your address bar so a result can be bookmarked, which is convenient and also means it is visible to anyone looking at your screen. Clear the field when you are done if the vehicle is not yours.",
          ],
        },
      ]}
      faqs={[
        {
          question: "How do I check if a VIN is valid?",
          answer:
            "Calculate the check digit. Convert each character to its numeric value, multiply by the positional weights, sum them and take the remainder on division by eleven. That result must match position 9. This tool does it as you type.",
        },
        {
          question: "Why are there no I, O or Q in a VIN?",
          answer:
            "Because they are too easily confused with the digits 1 and 0. The standard excludes them entirely, so if you think you see one on a plate it is a 1 or a 0.",
        },
        {
          question: "What does each part of a VIN mean?",
          answer:
            "Positions 1 to 3 are the World Manufacturer Identifier, 4 to 8 describe the vehicle including the engine, 9 is the check digit, 10 is the model year, 11 is the plant, and 12 to 17 are the sequential serial number.",
        },
        {
          question: "Which character is the model year?",
          answer:
            "Position 10, on a 30-year cycle running A to Y then 1 to 9 from 1980. Because it repeats, position 7 is used to disambiguate: a letter there means 2010 or later on light vehicles.",
        },
        {
          question: "Is this VIN decoder free?",
          answer:
            "Yes, and there is no sign-up. It queries NHTSA's public vPIC database, which is free to use, and the VIN is not logged on this site.",
        },
        {
          question: "Can a VIN decoder show accident history?",
          answer:
            "No. A decode returns what the vehicle was built as. Mileage, ownership, accident and finance history come from separate commercial or state records and are not part of vPIC.",
        },
        {
          question: "Why did my VIN return almost no information?",
          answer:
            "vPIC holds what manufacturers filed for the US market. Older vehicles, imports and low-volume models are often sparse or absent, which says nothing about whether the VIN is genuine.",
        },
        {
          question: "Should I post my full VIN online?",
          answer:
            "Better not to. It identifies one specific vehicle and, usually, its owner. When asking for help, redact the last six characters — everything diagnostically useful is in the first eleven.",
        },
      ]}
      sources={[nhtsaVpic, nhtsaVpicDocs, iso3779]}
    >
      <VinDecoder />
    </ToolPage>
  );
}
