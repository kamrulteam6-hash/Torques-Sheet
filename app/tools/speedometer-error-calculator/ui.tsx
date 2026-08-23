"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, Verdict, useToolState } from "../tool-kit";
import { compareTires, measure, round, signed } from "../tire-math";

const DEFAULTS = { from: "245/75R16", to: "265/75R16", speed: "60" };

export function SpeedometerErrorCalculator() {
  const { values, set, reset } = useToolState("speedo-error", DEFAULTS);
  const fromInput = values.from ?? DEFAULTS.from;
  const toInput = values.to ?? DEFAULTS.to;
  const speedInput = values.speed ?? DEFAULTS.speed;

  const from = useMemo(() => measure(fromInput), [fromInput]);
  const to = useMemo(() => measure(toInput), [toInput]);
  const result = useMemo(() => (from && to ? compareTires(from, to) : null), [from, to]);
  const indicated = Number(speedInput) || 0;
  const actual = result ? indicated * (result.to.diameter / result.from.diameter) : 0;

  const summary = result
    ? [
        `Calibrated for ${result.from.size.label}, running ${result.to.size.label}`,
        `Speedometer error: ${signed(result.speedoErrorPct, 1)}%`,
        `Indicated ${round(indicated, 0)} mph = ${round(actual, 1)} mph actual`,
        `Odometer: every indicated 1,000 miles is ${round(1000 + result.odometerDriftPer1000, 0)} miles actual`,
      ].join("\n")
    : "";

  const reads = result && result.diameterDiff >= 0 ? "low" : "high";
  const magnitude = result ? Math.abs(result.speedoErrorPct) : 0;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SPEEDOMETER AND ODOMETER</span>
        <h2 id="calculator-title">How far off is the dial?</h2>
        <p>
          Enter the size the vehicle was calibrated for — the original size on the door placard — and the
          size fitted now. The error is a fixed percentage, so it applies at every speed.
        </p>
      </div>

      <div className="tool-inputs triple">
        <Field
          label="Original (calibrated) size"
          value={fromInput}
          onChange={(value) => set("from", value)}
          placeholder="245/75R16"
          hint="From the door placard, not the current tire"
          invalid={Boolean(fromInput) && !from}
        />
        <Field
          label="Size fitted now"
          value={toInput}
          onChange={(value) => set("to", value)}
          placeholder="265/75R16"
          invalid={Boolean(toInput) && !to}
        />
        <Field
          label="Indicated speed"
          value={speedInput}
          onChange={(value) => set("speed", value.replace(/[^\d.]/g, ""))}
          inputMode="decimal"
          suffix="mph"
        />
      </div>

      {(!from || !to) && (
        <p className="tool-error" role="alert">
          Both tire sizes need to be readable. The expected format is <b>245/75R16</b>, or a flotation
          size such as <b>33x12.50R15</b>.
        </p>
      )}

      {result && (
        <>
          <Verdict
            tone={magnitude <= 3 ? "good" : magnitude <= 6 ? "warn" : "bad"}
            headline={`Speedometer reads ${reads} by ${round(magnitude, 1)}%`}
            detail={
              magnitude < 0.1
                ? "These two sizes are effectively identical in rolling circumference, so the speedometer stays accurate."
                : reads === "low"
                  ? `You are travelling faster than the dial admits. At an indicated ${round(indicated, 0)} mph your true speed is about ${round(actual, 1)} mph — a difference of ${round(actual - indicated, 1)} mph. The odometer under-records by the same proportion.`
                  : `You are travelling slower than the dial claims. At an indicated ${round(indicated, 0)} mph your true speed is about ${round(actual, 1)} mph. The odometer over-records, adding distance the vehicle has not covered.`
            }
          />

          <div className="tool-metrics wide">
            <Metric
              label="Error"
              value={`${signed(result.speedoErrorPct, 1)}%`}
              note={`Reads ${reads}`}
              tone={magnitude <= 3 ? "good" : "warn"}
            />
            <Metric
              label={`True speed at ${round(indicated, 0)} mph`}
              value={`${round(actual, 1)} mph`}
              note={`${signed(actual - indicated, 1)} mph`}
            />
            <Metric
              label="Odometer per 1,000 mi"
              value={`${round(1000 + result.odometerDriftPer1000, 0)} mi`}
              note="Actual distance covered"
            />
            <Metric
              label="Revolutions per mile"
              value={`${Math.round(result.from.revsPerMile)} → ${Math.round(result.to.revsPerMile)}`}
              note="What the calibration assumes vs. reality"
            />
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Speedometer reads</th>
                  <th>True speed</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {[20, 30, 40, 50, 60, 70, 80].map((speed) => {
                  const real = speed * (result.to.diameter / result.from.diameter);
                  return (
                    <tr key={speed}>
                      <th>{speed} mph</th>
                      <td>{round(real, 1)} mph</td>
                      <td>{signed(real - speed, 1)} mph</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Considering a different size instead?{" "}
            <Link
              href={`/tools/tire-size-comparison?from=${encodeURIComponent(result.from.size.label)}&to=${encodeURIComponent(result.to.size.label)}`}
            >
              See the full dimensional comparison
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
