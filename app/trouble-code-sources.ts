/**
 * Shared sources for the trouble-code guides.
 *
 * Ford's own OBD operation summaries document the monitor logic behind these
 * codes. RepairPal supplies published U.S. labour-and-parts estimates, which
 * the pages present as planning ranges rather than quotations. TSBs are cited
 * by number and looked up through NHTSA's public database rather than through
 * a bulletin mirror.
 */

export const fordObd2024 = {
  label: "Ford 2024–2025 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/Ford_Content/catalog/motorcraft/OBD_Operation_Summary_to_Gasoline_MY_2024_2025.pdf",
  note: "Ford monitor logic, enabling conditions and drive-cycle requirements",
};

export const fordObd2017 = {
  label: "Ford 2017 gasoline OBD operation summary",
  url: "https://www.fordservicecontent.com/ford_content/catalog/motorcraft/OBDSM1704.pdf",
  note: "Ford EVAP, misfire, fuel and comprehensive-component monitor descriptions",
};

export const fordManuals = {
  label: "Ford owner manuals and warranty guides",
  url: "https://www.ford.com/support/owner-manuals/",
  note: "Official year- and VIN-specific manual lookup for your vehicle",
};

export const nhtsaTsb = {
  label: "NHTSA technical service bulletin search",
  url: "https://www.nhtsa.gov/recalls",
  note: "Public database for confirming whether a bulletin covers your VIN and model year",
};

export const goPartsP0301 = {
  label: "P0301 on 2019–2025 Ford F-150: causes and fixes",
  url: "https://www.go-parts.com/garage/obd-p0301-ford-f-150-2019-2025",
  note: "Model-year-specific cause ranking and part-cost reference for cylinder 1 misfire",
};

export const goPartsP1450 = {
  label: "P1450 on Ford F-150: unable to bleed up fuel tank vacuum",
  url: "https://www.go-parts.com/garage/obd-p1450-ford-f-150-1999-2003-5-4l-v8",
  note: "Documents the purge-valve and vent-solenoid causes specific to this platform",
};

export const goPartsP1299 = {
  label: "P1299 on 2015–2022 Ford F-150: cylinder head overheating",
  url: "https://www.go-parts.com/garage/obd-p1299-ford-f-150-2015-2022",
  note: "Cause ranking and CHT sensor cost reference for late-model trucks",
};

export const goPartsP2196 = {
  label: "P2196 on 2018–2020 Ford F-150: stuck rich O2 sensor",
  url: "https://www.go-parts.com/garage/obd-p2196-ford-f-150-2018-2020",
  note: "Links the code to Ford bulletin coverage on the 2.7L EcoBoost",
};

export const repairPalPurge = {
  label: "Ford F-150 purge valve replacement cost estimate",
  url: "https://repairpal.com/estimator/ford/f-150/purge-valve-replacement-cost",
  note: "Published U.S. parts-and-labour range used as a planning figure",
};

export const repairPalCanister = {
  label: "Ford F-150 evaporative canister replacement cost estimate",
  url: "https://repairpal.com/estimator/ford/f-150/fuel-evaporative-canister-replacement-cost",
  note: "Published U.S. parts-and-labour range for the expensive EVAP outcome",
};

export const fordDriveCycle = {
  label: "Ford OBD-II drive cycle procedure",
  url: "https://www.totalcardiagnostics.com/support/Knowledgebase/Article/View/41/7/ford-motor-obd-ii-driving-cycle",
  note: "Step sequence for completing Ford readiness monitors after a code clear",
};

/**
 * Ford TSB 20-2324 (supersedes 18-2310). Cited by number; confirm VIN coverage
 * through a Ford dealer or the NHTSA database before paying for the work.
 */
export const tsb202324 = {
  number: "TSB 20-2324",
  applies: "Some 2018 F-150 with 2.7L EcoBoost (supersedes 18-2310)",
  summary:
    "Illuminated MIL with P2196, P2198, P0300, P0301, P0306, P0316, P0171 and/or P0174 stored. Ford attributes the condition to PCM software or direct-injection fuel injectors leaking down, and the service procedure covers PCM reprogramming and/or injector replacement.",
};
