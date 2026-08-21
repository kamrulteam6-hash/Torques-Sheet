import type { Source, SpecRecord } from "./chevy350-content";

const reviewed = "2026-08-14";
const source = (label: string, url: string, note: string): Source => ({ label, url, note });

const hyundai2014 = source(
  "Hyundai 2014 Veloster technical release",
  "https://www.hyundainews.com/releases/1760",
  "Hyundai's release distinguishes the 138-hp manual, 132-hp DCT, and 201-hp Turbo configurations.",
);
const hyundai2017 = source(
  "Hyundai 2017 Veloster Value Edition release",
  "https://www.hyundainews.com/releases/2312",
  "Hyundai lists 132 hp for the naturally aspirated engine and 201 hp for the Turbo.",
);
const hyundai2019 = source(
  "Hyundai all-new 2019 Veloster technical release",
  "https://www.hyundainews.com/releases/2466",
  "Hyundai lists 147 hp for the 2.0L and 201 hp for the 1.6L Turbo.",
);
const hyundaiN = source(
  "Hyundai Veloster N performance release",
  "https://www.hyundainews.com/releases/2958",
  "Hyundai documents the available 275-hp Veloster N configuration.",
);

export const researchedDiagramSpecs: SpecRecord[] = [{
  slug: "hyundai/veloster/horsepower-by-year",
  keyword: "hyundai veloster horsepower specs by year",
  make: "Hyundai",
  model: "Veloster",
  category: "Performance Specs",
  title: "Hyundai Veloster Horsepower by Year and Trim",
  metaDescription: "Hyundai Veloster horsepower chart for U.S. 2012–2022 models, separating 1.6L, Turbo, 2.0L, and Veloster N ratings with Hyundai source links.",
  answer: "U.S.-market Veloster output ranges from 132–138 hp for the first-generation naturally aspirated 1.6L, 201 hp for 1.6L Turbo models, 147 hp for the second-generation 2.0L, and up to 275 hp for the Veloster N. The correct number depends on model year, engine, transmission, and—on early cars—trim.",
  detail: "Horsepower is SAE-rated engine output, not wheel horsepower from a chassis dynamometer. Early first-generation naturally aspirated ratings also differ by transmission, so a single number for every Veloster would be misleading.",
  scope: "Covers Hyundai Motor America's U.S.-market production Veloster range. The 2018 model year had no U.S. Veloster, and 2022 U.S. availability was limited to the Veloster N. Non-U.S. markets and modified cars require separate data.",
  values: [
    { label: "2012–2014 1.6L manual", value: "138 hp", note: "6,300 rpm; verify exact year" },
    { label: "2012–2017 1.6L DCT / later NA", value: "132 hp", note: "Transmission/year distinction matters" },
    { label: "2013–2021 1.6L Turbo", value: "201 hp", note: "6,000 rpm" },
    { label: "2019–2021 2.0L", value: "147 hp", note: "6,200 rpm" },
    { label: "2019–2020 Veloster N", value: "250 or 275 hp", note: "Performance Package supplied the higher rating" },
    { label: "2021–2022 Veloster N", value: "275 hp", note: "U.S.-market N specification" },
  ],
  diagram: {
    type: "main",
    title: "Interactive Veloster horsepower timeline",
    caption: "Select a model-year band, then use the table to distinguish engine, transmission, and N package. Bars are categorical, not drawn to a dyno scale.",
    points: ["2012–14 NA", "2013–17 Turbo", "2019–21 2.0", "2019–20 N", "2021–22 N"],
  },
  intro: [
    "The Veloster badge covered four meaningfully different performance levels, and several overlapped in the same showroom. That is why search snippets that state one horsepower figure without an engine or trim are often incomplete.",
    "The chart below keeps Hyundai's factory crankshaft ratings separate from wheel-horsepower results. It also calls out the early manual-versus-DCT difference and the original Veloster N Performance Package, two details that are easily lost in a simplified year list.",
  ],
  steps: [
    "Confirm the U.S. model year from the VIN label rather than registration date.",
    "Identify the engine and trim: naturally aspirated 1.6L, 1.6L Turbo, 2.0L, or 2.0L turbo Veloster N.",
    "For early naturally aspirated cars, confirm the transmission; for 2019–2020 N cars, confirm whether the Performance Package is fitted.",
    "Compare only like-for-like ratings. Factory SAE horsepower and chassis-dyno wheel horsepower are different measurements.",
  ],
  sections: [
    { heading: "Why the first-generation number changes", paragraphs: ["Hyundai's 2014 technical release lists 138 hp for the manual-transmission 1.6L and 132 hp for the dual-clutch version. Later first-generation Hyundai material commonly describes the naturally aspirated engine at 132 hp, while the Turbo remains at 201 hp."] },
    { heading: "Second generation and Veloster N", paragraphs: ["For 2019, Hyundai introduced a 147-hp 2.0L base engine and retained the 201-hp 1.6L Turbo. The Veloster N used a different 2.0L turbo engine: early U.S. cars were offered at 250 hp or 275 hp with the Performance Package, while later U.S. N models carried the 275-hp rating."] },
    { heading: "How to use the chart", bullets: ["Do not use the body style alone to identify output.", "Do not compare factory crank horsepower directly with a wheel-horsepower dyno result.", "Check package and transmission before quoting an early model.", "Treat tuned boost, intake, exhaust, and ECU calibrations as modified applications."] },
  ],
  faqs: [
    { q: "How much horsepower does a Hyundai Veloster have?", a: "Depending on year and trim, U.S. factory ratings range from 132 hp to 275 hp." },
    { q: "How much horsepower does a Veloster Turbo have?", a: "The U.S. 1.6L Veloster Turbo is rated at 201 hp in Hyundai's first- and second-generation material." },
    { q: "How much horsepower does a Veloster N have?", a: "Early U.S. Veloster N cars were offered at 250 hp or 275 hp with the Performance Package; later U.S. models are rated at 275 hp." },
    { q: "Was there a 2018 Hyundai Veloster?", a: "Hyundai's U.S. model-year change notice says there was no 2018 Veloster; the redesigned car arrived for 2019." },
    { q: "Is factory horsepower the same as wheel horsepower?", a: "No. Factory ratings describe engine output under an SAE method, while a chassis dynamometer estimates power delivered at the wheels after drivetrain losses and test variables." },
  ],
  sources: [hyundai2014, hyundai2017, hyundai2019, hyundaiN],
  reviewed,
  featureImage: "/features/shared-firing-engine.png",
  featureOverlay: true,
}];
