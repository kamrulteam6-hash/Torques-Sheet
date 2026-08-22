import type { SpecRecord } from "./chevy350-content";
import { citationTier } from "./source-quality";

const directSourcePatterns = [
  /\.pdf(?:$|\?)/i,
  /fordservicecontent\.com\/Ford_Content\/vdirsnet\/OwnerManual\/Home\/Content/i,
  /techinfo\.honda\.com\/rjanisis\/pubs\/.*\/details\//i,
  /vehicleinfo\.mopar\.com\/assets\/publications\/.*\/(?:om_html|[^/]+\.pdf)/i,
  /owners-manual\.mazda\.com\/.*\/contents\//i,
  /ownersmanual\.hyundai\.com\/.*(?:docview|full_webhelp)/i,
  /hyundainews\.com\/(?:models|releases)\//i,
  /cummins\.com\/.*(?:\.pdf|follow-liter-evolution)/i,
  /chevrolet\.com\/content\/dam\/.*\.pdf/i,
  /assets\.sia\.toyota\.com\/publications\/.*\.pdf/i,
  /nissanusa\.com\/content\/dam\/Nissan\/us\/manuals-and-guides\//i,
  /techinfo\.subaru\.com\/stis\/doc\/ownerManual\//i,
  /mbusa\.com\/content\/dam\/mb-nafta\/us\/owners\/manuals\//i,
  /news\.chevrolet\.com\/newsroom\./i,
  /embargoed\.stellantisnorthamerica\.com\/newsrelease\.do/i,
  /automobiles\.honda\.com\/-\/media\/Honda-Automobiles\//i,
  /delcoremy\.com\/(?:Documents\/Alternator-Instruction-Sheets|the-latest\/|support\/)/i,
];

export function hasDirectCitation(spec: SpecRecord) {
  return spec.sources.some((source) =>
    directSourcePatterns.some((pattern) => pattern.test(source.url)),
  );
}

export function editorialStatus(spec: SpecRecord) {
  const cited = hasDirectCitation(spec);
  const tier = citationTier(spec);

  // All published specification routes are crawlable and included in the sitemap.
  // Source status remains visible to readers without restricting crawlers.
  if (tier === "portal-only") {
    return {
      indexReady: true,
      label: "Awaiting specific citation",
      note: "This page links the manufacturer's official manual portal rather than a document for this exact application. Look the specification up for your VIN and model year before service work.",
    };
  }

  return {
    indexReady: true,
    label: cited ? "Direct source linked" : "Reference page",
    note: cited
      ? "At least one application-specific manufacturer or component document is linked."
      : "Verify the exact application and linked references before service work.",
  };
}

function procedureFor(spec: SpecRecord) {
  const source = spec.sources[0];
  const valueSummary = spec.values
    .slice(0, 3)
    .map((value) => `${value.label}: ${value.value}`)
    .join("; ");
  if (spec.category === "Torque Specs") {
    if (spec.diagram.type !== "wheel") {
      return [
        `Open ${source?.label ?? "the linked technical source"} and match the engine, component, fastener group, model year, and hardware to this ${spec.make} ${spec.model}. ${spec.scope}`,
        `Keep the application rows and units separate: ${valueSummary}. Confirm whether the procedure specifies dry threads, lubricant, sealant, new bolts, staged torque, or an angle turn.`,
        `Prepare the threads and mating surfaces, hand-start every fastener, and follow the exact numbered sequence and reuse rule. ${spec.detail}`,
      ];
    }
    return [
      `Open ${source?.label ?? "the linked technical source"} and match its year, platform, wheel, and fastener to this ${spec.make} ${spec.model}. ${spec.scope}`,
      `Work from the application rows rather than memory: ${valueSummary}. Preserve the thread and seat condition required by that source.`,
      `Hand-start the fasteners, use the illustrated opposite-side pattern and a calibrated wrench, then complete the application-specific recheck. ${spec.detail}`,
    ];
  }
  if (spec.category === "Fluid Capacities") {
    return [
      `Use ${source?.label ?? "the linked technical source"} to confirm the model year, engine code, filter condition, and oil approval for this ${spec.make} ${spec.model}.`,
      `Keep the generation rows separate: ${valueSummary}. Refill below the selected total before the first level check.`,
      `Run the engine to fill the filter, inspect for leaks, wait on level ground, and finish by the specified dipstick or electronic-level procedure. ${spec.detail}`,
    ];
  }
  if (spec.category === "Ignition Specs") {
    return [
      `Match ${source?.label ?? "the linked technical source"}, the engine code, and the approved plug before measuring this ${spec.make} ${spec.model} application.`,
      `Use the table as an application check: ${valueSummary}. Inspect the part number, reach, seat, heat range, and fine-wire electrode before adjustment.`,
      `Measure without levering against the center electrode, hand-start every plug, and use the exact installation torque or angle method. ${spec.detail}`,
    ];
  }
  if (spec.category === "Firing Order") {
    return [
      `Confirm the engine family and cylinder orientation in ${source?.label ?? "the linked technical source"} before moving a connection on this ${spec.make} ${spec.model}.`,
      `Read the diagram and table together: ${valueSummary}. Photograph and label the original routing before disassembly.`,
      `Trace one circuit at a time, establish compression TDC on distributor engines, and verify routing, connector locks, starting quality, and misfire data. ${spec.detail}`,
    ];
  }
  return spec.steps;
}

export function reduceRepeatedCopy(spec: SpecRecord, preserveLongForm = false): SpecRecord {
  if (preserveLongForm) return spec;
  return {
    ...spec,
    intro: [],
    steps: procedureFor(spec),
    sections: [{
      heading: `Application boundaries for ${spec.model}`,
      paragraphs: [spec.scope, spec.detail],
    }],
    // Only the record's own first question survives. The two questions this
    // template used to append were identical across hundreds of pages and
    // answered by repeating `scope` and `detail`, which are already rendered
    // in the body — filler that made these pages duplicates of one another.
    faqs: spec.faqs[0]
      ? [spec.faqs[0]]
      : [],
  };
}
