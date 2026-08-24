"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, Verdict, useToolState } from "../tool-kit";
import { PRESSURE_UNITS, convertPressure, type PressureUnit } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { value: "32", from: "psi", placard: "32" };

export function TirePressureConverter() {
  const { values, set, reset } = useToolState("tire-pressure", DEFAULTS);
  const value = Number(values.value ?? DEFAULTS.value) || 0;
  const from = (values.from ?? DEFAULTS.from) as PressureUnit;
  const placard = Number(values.placard ?? DEFAULTS.placard) || 0;

  const results = useMemo(
    () => PRESSURE_UNITS.map((unit) => ({ unit, value: convertPressure(value, from, unit) })),
    [value, from],
  );

  const currentPsi = convertPressure(value, from, "psi");
  const pctOfPlacard = placard > 0 ? (currentPsi / placard) * 100 : 100;
  const tpmsThreshold = placard * 0.75;

  const summary = [
    `${value} ${from}`,
    ...results.filter((r) => r.unit !== from).map((r) => `= ${round(r.value, 2)} ${r.unit}`),
    placard > 0 ? `${round(pctOfPlacard, 0)}% of placard pressure (${placard} psi)` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FIVE UNITS AT ONCE</span>
        <h2 id="calculator-title">Convert a tire pressure</h2>
        <p>
          Pumps, gauges and placards read in different units depending on where they were made. Enter a
          reading in any of them and see it converted into the rest, plus how it compares to your
          vehicle&apos;s recommended cold pressure.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Value"
          value={values.value ?? DEFAULTS.value}
          onChange={(v) => set("value", v.replace(/[^\d.]/g, ""))}
          inputMode="decimal"
        />
        <label className="tool-field">
          <span className="tool-field-label">From unit</span>
          <span className="tool-field-input">
            <select value={from} onChange={(e) => set("from", e.target.value)} className="tool-select">
              {PRESSURE_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <div className="quick-sizes">
        <small>Jump to a unit</small>
        {PRESSURE_UNITS.map((unit) => (
          <button
            type="button"
            key={unit}
            className={unit === from ? "active" : ""}
            onClick={() => set("from", unit)}
          >
            {unit}
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        {results.map((r) => (
          <Metric
            key={r.unit}
            label={r.unit}
            value={round(r.value, r.value < 10 ? 3 : 2).toString()}
            note={r.unit === from ? "entered value" : "converted"}
            tone={r.unit === from ? "good" : "neutral"}
          />
        ))}
      </div>

      <div className="tool-panel-head tool-subhead">
        <span className="kicker">CHECK AGAINST YOUR PLACARD</span>
      </div>
      <div className="tool-inputs single">
        <Field
          label="Placard cold pressure (psi)"
          value={values.placard ?? DEFAULTS.placard}
          onChange={(v) => set("placard", v.replace(/[^\d.]/g, ""))}
          inputMode="decimal"
          hint="From the driver's door jamb sticker, not the tire sidewall"
        />
      </div>

      {placard > 0 && (
        <Verdict
          tone={pctOfPlacard >= 95 && pctOfPlacard <= 110 ? "good" : pctOfPlacard >= 75 ? "warn" : "bad"}
          headline={`${round(pctOfPlacard, 0)}% of placard pressure`}
          detail={
            pctOfPlacard >= 95 && pctOfPlacard <= 110
              ? `Close to the recommended ${placard} psi cold pressure. This comparison only means something if the tire was actually cold when you measured it — driven under a mile, and not sitting in direct sun.`
              : pctOfPlacard >= 75
                ? `Below the recommended ${placard} psi. FMVSS 138 sets the mandatory TPMS warning threshold at 25% below placard — about ${round(tpmsThreshold, 1)} psi here — so a dash light may not have triggered yet even though this is already under-inflated.`
                : `Well below the recommended ${placard} psi, and at or past the point where a TPMS warning light is required to illuminate (${round(tpmsThreshold, 1)} psi, 25% below placard under FMVSS 138). Under-inflation this severe increases heat build-up and the risk of tread separation — inflate before driving any distance.`
          }
        />
      )}

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Changing tire size?{" "}
        <Link href="/tools/tire-size-comparison">The comparison tool</Link> covers the clearance and
        speedometer side; pressure is set independently of size, from the door placard.
      </p>
    </section>
  );
}
