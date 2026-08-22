import type { Source, SpecRecord } from "./chevy350-content";

/**
 * Source hygiene.
 *
 * A large share of the corpus cited unauthorised mirrors of copyrighted
 * factory service manuals (charm.li, workshop-manuals.com,
 * carmanualsonline.info) and user-upload dumps (Scribd, pdfcoffee). Those are
 * a legal and trust liability on a site whose entire proposition is a
 * legitimate source trail, and linking them passes authority to them.
 *
 * They are removed here rather than in the content files, so the underlying
 * research records stay intact. Where removing one would leave a page with no
 * source at all, the manufacturer's official manual portal is substituted —
 * a real, citable destination, but a generic one, so the page is marked as
 * awaiting a specific citation rather than being presented as fully sourced.
 */

const GREY_SOURCE_PATTERNS = [
  /(^|\.)charm\.li/i,
  /(^|\.)scribd\.com/i,
  /(^|\.)pdfcoffee\.com/i,
  /(^|\.)carmanualsonline\.info/i,
  /(^|\.)workshop-manuals\.com/i,
  /(^|\.)vaglinks\.com/i,
  /(^|\.)manualzz\.com/i,
  /(^|\.)manualslib\.com/i,
  /(^|\.)pdfslide\./i,
  /(^|\.)dokumen\.pub/i,
  /drive\.google\.com/i,
  /toyotamanuals\.gitlab\.io/i,
];

export function isGreySource(url: string) {
  try {
    const host = new URL(url).hostname;
    return GREY_SOURCE_PATTERNS.some((pattern) => pattern.test(host) || pattern.test(url));
  } catch {
    return false;
  }
}

const portal = (label: string, url: string, note: string): Source => ({ label, url, note });

/**
 * Official manufacturer manual portals. Every URL here is one already cited
 * elsewhere in the corpus, so none of them are guesses.
 */
const OEM_PORTALS: Record<string, Source> = {
  Chevrolet: portal("GM manuals and guides", "https://experience.gm.com/support/vehicle/manuals-guides", "Official GM model-year and VIN manual lookup."),
  GMC: portal("GM manuals and guides", "https://experience.gm.com/support/vehicle/manuals-guides", "Official GM model-year and VIN manual lookup."),
  Buick: portal("GM manuals and guides", "https://experience.gm.com/support/vehicle/manuals-guides", "Official GM model-year and VIN manual lookup."),
  Pontiac: portal("GM manuals and guides", "https://experience.gm.com/support/vehicle/manuals-guides", "Official GM manual lookup; Pontiac is a discontinued GM marque."),
  Oldsmobile: portal("GM manuals and guides", "https://experience.gm.com/support/vehicle/manuals-guides", "Official GM manual lookup; Oldsmobile is a discontinued GM marque."),
  Ford: portal("Ford owner manuals", "https://www.ford.com/support/owner-manuals/", "Official Ford year/VIN manual lookup."),
  Dodge: portal("Mopar vehicle information", "https://vehicleinfo.mopar.com/", "Official Dodge, Ram, Chrysler and Jeep model-year information lookup."),
  Ram: portal("Mopar vehicle information", "https://vehicleinfo.mopar.com/", "Official Dodge, Ram, Chrysler and Jeep model-year information lookup."),
  Jeep: portal("Mopar vehicle information", "https://vehicleinfo.mopar.com/", "Official Dodge, Ram, Chrysler and Jeep model-year information lookup."),
  Toyota: portal("Toyota owner's manuals", "https://www.toyota.com/owners/warranty-owners-manuals/", "Official Toyota model-year manual lookup."),
  Honda: portal("Honda service information", "https://techinfo.honda.com/", "Official Honda and Acura service publication lookup."),
  Nissan: portal("Nissan manuals and guides", "https://www.nissanusa.com/owners/ownership/manuals-guides.html", "Official Nissan model-year manual lookup."),
  Subaru: portal("Subaru owner's information", "https://manuals.subaru.com/", "Official Subaru model-year/VIN manual lookup."),
  Hyundai: portal("Hyundai owner's manuals", "https://ownersmanual.hyundai.com/", "Official Hyundai market and model-year manual lookup."),
  Kia: portal("Kia owner's manuals", "https://owners.kia.com/content/owners/en/manuals.html", "Official Kia model-year manual lookup."),
  BMW: portal("BMW Driver's Guide", "https://www.bmwusa.com/owners-manuals.html", "Official BMW VIN-based owner information."),
  Audi: portal("Audi erWin technical information", "https://erwin.audiusa.com/", "Official Audi repair and technical information portal."),
  Volkswagen: portal("Volkswagen erWin technical information", "https://erwin.vw.com/", "Official Volkswagen repair and technical information portal."),
  Mazda: portal("Mazda owner's manuals", "https://owners-manual.mazda.com/", "Official Mazda model-year manual lookup."),
  Mitsubishi: portal("Mitsubishi technical information", "https://mitsubishitechinfo.com/", "Official Mitsubishi service information portal."),
  "Mercedes-Benz": portal("Mercedes-Benz owner's manuals", "https://www.mbusa.com/en/owners/manuals", "Official Mercedes-Benz model-year manual lookup."),
};

const PORTAL_URLS = new Set(Object.values(OEM_PORTALS).map((source) => source.url));

export const isPortalSource = (url: string) => PORTAL_URLS.has(url);

/** Collapses combined make labels ("Dodge / Ram") onto a portal key. */
function portalFor(make: string): Source | null {
  const direct = OEM_PORTALS[make];
  if (direct) return direct;
  for (const part of make.split(/\s*\/\s*/)) {
    if (OEM_PORTALS[part]) return OEM_PORTALS[part];
  }
  if (/^GM$/i.test(make)) return OEM_PORTALS.Chevrolet;
  return null;
}

/**
 * Strips grey-mirror citations. If that empties the list, substitutes the
 * manufacturer's official portal so the page still resolves to a real source.
 */
export function sanitizeSpecSources(spec: SpecRecord): SpecRecord {
  const kept = spec.sources.filter((source) => !isGreySource(source.url));
  if (kept.length === spec.sources.length) return spec;

  if (kept.length > 0) return { ...spec, sources: kept };

  const fallback = portalFor(spec.make);
  // With no portal for this make there is nothing citable left; keeping the
  // page sourceless is more honest than restoring the mirror.
  return { ...spec, sources: fallback ? [fallback] : [] };
}

/**
 * Citation tier for the on-page editorial status:
 *   direct       an application-specific manufacturer or component document
 *   reference    a real but broader technical source
 *   portal-only  nothing but the manufacturer's generic manual portal
 */
export function citationTier(spec: SpecRecord): "direct" | "reference" | "portal-only" {
  if (!spec.sources.length) return "portal-only";
  if (spec.sources.every((source) => isPortalSource(source.url))) return "portal-only";
  return "reference";
}
