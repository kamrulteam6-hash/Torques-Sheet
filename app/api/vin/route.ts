import { NextResponse } from "next/server";
import { VIN_LENGTH, checkVin } from "../../tools/vin";

/**
 * Server-side proxy for the NHTSA vPIC decoder.
 *
 * vPIC is free and needs no key, but it sends no CORS header, so a browser
 * cannot call it directly. Proxying is the only route — and doing it here has a
 * second benefit: the VIN never reaches a third party from the reader's own IP
 * address, and we can decline obviously invalid input before making any call at
 * all.
 *
 * Deliberately not logged. A VIN identifies a specific vehicle and, by
 * extension, often a specific person, so it is passed through and forgotten.
 */

const VPIC = "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues";

/** Cache a decode for a day: a VIN's answer does not change. */
const REVALIDATE_SECONDS = 86400;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("vin") ?? "";
  const year = url.searchParams.get("year");

  const check = checkVin(raw);

  if (!check.wellFormed) {
    return NextResponse.json(
      {
        ok: false,
        error: `A VIN is ${VIN_LENGTH} characters and never contains I, O or Q.`,
        problems: check.problems,
      },
      { status: 400 },
    );
  }

  const query = new URLSearchParams({ format: "json" });
  // Supplying the year improves accuracy, because position 10 is ambiguous
  // across the 30-year cycle.
  if (year && /^\d{4}$/.test(year)) query.set("modelyear", year);

  try {
    const response = await fetch(`${VPIC}/${check.vin}?${query.toString()}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, error: `The NHTSA decoder returned ${response.status}. Try again shortly.` },
        { status: 502 },
      );
    }

    const payload = (await response.json()) as { Results?: Record<string, string>[] };
    const result = payload.Results?.[0];

    if (!result) {
      return NextResponse.json(
        { ok: false, error: "The NHTSA decoder returned no result for that VIN." },
        { status: 502 },
      );
    }

    // Strip the empty and placeholder fields — vPIC returns 150+ keys and most
    // are blank for any given vehicle.
    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(result)) {
      if (value && value !== "Not Applicable" && value !== "0") fields[key] = value;
    }

    return NextResponse.json(
      {
        ok: true,
        vin: check.vin,
        checkDigitValid: check.checkDigitValid,
        fields,
        errorText: result.ErrorText ?? null,
        additionalErrorText: result.AdditionalErrorText ?? null,
      },
      // Let the CDN hold it too, since the answer is stable and not personal
      // to the requester once the VIN is in the query.
      { headers: { "Cache-Control": `public, max-age=0, s-maxage=${REVALIDATE_SECONDS}` } },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the NHTSA decoder. It may be temporarily unavailable." },
      { status: 503 },
    );
  }
}
