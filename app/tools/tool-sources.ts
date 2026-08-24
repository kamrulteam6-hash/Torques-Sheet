/**
 * Source trail for the calculator pages.
 *
 * The trouble-code pages carry citations and the tools did not, which was a
 * genuine gap: several of the boundaries quoted on these pages — speedometer
 * tolerance, how an advertised horsepower figure was measured, why a window
 * sticker disagrees with a hand-calculated MPG — come from published standards
 * rather than from convention, and naming them is the difference between a
 * claim and a reference.
 */

export type ToolSource = { label: string; url: string; note: string };

/* --------------------------------------------------------------- tire sizing */

export const tireRimAssociation: ToolSource = {
  label: "The Tire and Rim Association — standards filing (NHTSA docket)",
  url: "https://downloads.regulations.gov/NHTSA-2019-0011-0010/attachment_1.pdf",
  note: "TRA has been the US standardising body for tire and rim interchangeability since 1903; this filing sets out dimensional practice.",
};

export const yokohamaSidewall: ToolSource = {
  label: "Yokohama Tire — how to read a sidewall",
  url: "https://www.yokohamatire.com/tires-101/how-to-read-a-sidewall-1/sizing-information",
  note: "Manufacturer explanation of section width, aspect ratio and rim diameter in the standard size designation.",
};

export const iso5775: ToolSource = {
  label: "ISO 5775 — tire and rim designations",
  url: "https://en.wikipedia.org/wiki/ISO_5775",
  note: "The international designation system that sits alongside TRA and ETRTO practice.",
};

export const rimWidthRange: ToolSource = {
  label: "TireGrades — minimum and maximum tire size for a given rim width",
  url: "https://tiregrades.com/tire-anatomy/tire-size/min-max-tire-size-for-rim-width/",
  note: "Summarises the approved rim-width range published for each section width by TRA and ETRTO.",
};

/* ------------------------------------------------------------- speedometers */

export const uneceR39: ToolSource = {
  label: "UN Regulation No. 39 — speedometer and odometer equipment",
  url: "https://unece.org/fileadmin/DAM/trans/main/wp29/wp29regs/r039r1e.pdf",
  note: "The regulation requiring that an indicated speed never falls below true speed, and capping the permitted positive error.",
};

export const uneceR39Eu: ToolSource = {
  label: "UN Regulation No. 39 as published in the EU Official Journal",
  url: "https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=OJ:L_202501902",
  note: "Current consolidated text of the same regulation, useful for citing the tolerance formula directly.",
};

/* ------------------------------------------------------ power measurement */

export const fordDynoTips: ToolSource = {
  label: "Ford Performance — dynamometer testing and engine performance tech tips",
  url: "https://performanceparts.ford.com/download/pdfs/EnginePerformanceTechTips.pdf",
  note: "Manufacturer guidance on dyno correction and how quoted power figures are arrived at.",
};

export const saeCorrection: ToolSource = {
  label: "Dyno correction factors — SAE J1349 against STD",
  url: "https://university.fuelmotousa.com/article/dyno-corrections-factors-sae-vs-std/",
  note: "Explains the J1349 reference conditions of 77°F, 0% humidity and 29.234 in-Hg, and why STD-corrected figures read higher.",
};

/* ------------------------------------------------------------- fuel economy */

export const epaTesting: ToolSource = {
  label: "US EPA — fuel economy and EV range testing",
  url: "https://www.epa.gov/greenvehicles/fuel-economy-and-ev-range-testing",
  note: "The five-cycle test procedure behind every window-sticker MPG figure.",
};

export const cfrLabeling: ToolSource = {
  label: "40 CFR 600.210-12 — calculation of fuel economy values for labeling",
  url: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-Q/part-600/subpart-C/section-600.210-12",
  note: "The regulation that defines how city and highway results are weighted into the combined figure.",
};

/* ------------------------------------------------------- compression ratio */

export const chevyHardcoreCompression: ToolSource = {
  label: "Chevy Hardcore — compression ratio and pump gas compatibility",
  url: "https://www.chevyhardcore.com/tech-stories/discussing-compression-ratio-and-pump-gas-compatibility/",
  note: "Piston-manufacturer guidance on the practical compression limits for iron and aluminium heads on pump fuel.",
};

export const grassrootsOctane: ToolSource = {
  label: "Grassroots Motorsports — why compression ratio does not dictate octane requirement",
  url: "https://grassrootsmotorsports.com/articles/fuel-tips-compression-ratios/",
  note: "Useful counterweight: chamber design, quench and cam timing move the detonation threshold as much as the static ratio does.",
};

/* ------------------------------------------------------------ vin decoding */

export const nhtsaVpic: ToolSource = {
  label: "NHTSA vPIC — Vehicle Product Information Catalog",
  url: "https://vpic.nhtsa.dot.gov/api/",
  note: "The free public API this page decodes against, populated from what manufacturers file for vehicles sold in the United States.",
};

export const nhtsaVpicDocs: ToolSource = {
  label: "NHTSA — VIN decoder and recall lookup",
  url: "https://www.nhtsa.gov/recalls",
  note: "The official front end, and the separate lookup to use for recalls — a decode does not include them.",
};

export const iso3779: ToolSource = {
  label: "ISO 3779 — vehicle identification number content and structure",
  url: "https://en.wikipedia.org/wiki/Vehicle_identification_number",
  note: "The standard that fixes the 17-character format, the excluded letters and the check-digit calculation.",
};

/* ---------------------------------------------------------------- reference */

export const REVIEWED = "August 23, 2026";
