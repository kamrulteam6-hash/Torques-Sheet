"use client";

import { useMemo } from "react";
import { Field, Metric, ShareRow, Verdict, useToolState } from "../tool-kit";
import { decodeDotDate, tireAgeBand } from "../tire-id-math";

const DEFAULTS = { code: "2318" };

const BAND_INFO: Record<string, { headline: string; detail: string; tone: "good" | "warn" | "bad" }> = {
  new: {
    headline: "Within the typical inspection-free range",
    detail: "Under 6 years old by manufacturer consensus. Age-related hardening is minimal at this point — tread wear and damage remain the things to actually watch for.",
    tone: "good",
  },
  inspect: {
    headline: "Old enough to inspect specifically for age",
    detail: "Most manufacturers recommend inspection from around 6 years regardless of tread depth, checking specifically for sidewall cracking and other signs of rubber hardening — not just tread.",
    tone: "warn",
  },
  replace: {
    headline: "Past the industry-consensus replacement point",
    detail: "10 years is the point most manufacturers and NHTSA guidance treat as an outer limit, regardless of tread depth or storage conditions — rubber hardens with age whether the tire has been driven or not.",
    tone: "bad",
  },
};

export function TireDotDateAgeCalculator() {
  const { values, set, reset } = useToolState("dot-age", DEFAULTS);
  const code = values.code ?? DEFAULTS.code;

  const decoded = useMemo(() => decodeDotDate(code), [code]);
  const band = decoded ? tireAgeBand(decoded.ageYears) : null;
  const info = band ? BAND_INFO[band] : null;

  const summary = decoded
    ? `DOT code ...${code.replace(/\D/g, "").slice(-4)}: week ${decoded.week} of ${decoded.fullYear}, age ${decoded.ageYears.toFixed(1)} years`
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FOUR DIGITS, WEEK THEN YEAR</span>
        <h2 id="calculator-title">Decode a tire&apos;s manufacture date and age</h2>
        <p>
          The last four digits of the DOT identification number on the sidewall give the week and year a
          tire was made — the two-digit week first, then the two-digit year. This decodes that date and
          checks its age against industry replacement guidance.
        </p>
      </div>

      <div className="tool-inputs single">
        <Field
          label="DOT code (last four digits)"
          value={code}
          onChange={(v) => set("code", v.replace(/[^\d]/g, "").slice(0, 4))}
          placeholder="2318"
          hint="Find the full DOT stamp on the sidewall — only the last four digits matter here"
          invalid={code.length === 4 && !decoded}
        />
      </div>

      {code.length === 4 && !decoded && (
        <p className="tool-error" role="alert">
          That doesn&apos;t decode to a valid week and year. The week (first two digits) should be 01-53.
        </p>
      )}

      {decoded && info && (
        <>
          <Verdict tone={info.tone} headline={info.headline} detail={info.detail} />

          <div className="tool-metrics wide">
            <Metric label="Week of manufacture" value={String(decoded.week)} note={`Of ${decoded.fullYear}`} tone="good" />
            <Metric label="Year of manufacture" value={String(decoded.fullYear)} note="From the two-digit year code" tone="good" />
            <Metric label="Current age" value={`${decoded.ageYears.toFixed(1)} yrs`} note={`${Math.round(decoded.ageMonths)} months`} />
            <Metric label="Guidance status" value={decoded.ageYears >= 10 ? "Replace" : decoded.ageYears >= 6 ? "Inspect" : "Normal"} note="Industry consensus, not law" />
          </div>
        </>
      )}

      <ShareRow summary={summary} onReset={reset} />

      <div className="safety-note safety-note-tight">
        <span>!</span>
        <p>
          <strong>This decodes the modern four-digit format only.</strong> Tires made before 2000 used a
          three-digit code that is ambiguous by decade. If your tire has only three digits after the DOT
          stamp, it predates this calculator&apos;s format and should be replaced on age grounds regardless
          of the exact date.
        </p>
      </div>
    </section>
  );
}
