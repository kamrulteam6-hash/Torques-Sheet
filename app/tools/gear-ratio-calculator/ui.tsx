"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import {
  COMMON_AXLE_RATIOS,
  engineRpm,
  equivalentAxleRatio,
  measure,
  nearestAxleRatio,
  round,
  signed,
} from "../tire-math";

const DEFAULTS = {
  from: "265/70R17",
  to: "285/70R17",
  axle: "3.55",
  gear: "1",
  mph: "70",
};

export function GearRatioCalculator() {
  const { values, set, reset } = useToolState("gear-ratio", DEFAULTS);
  const fromInput = values.from ?? DEFAULTS.from;
  const toInput = values.to ?? DEFAULTS.to;
  const axle = Number(values.axle ?? DEFAULTS.axle) || 0;
  const gear = Number(values.gear ?? DEFAULTS.gear) || 0;
  const mph = Number(values.mph ?? DEFAULTS.mph) || 0;

  const from = useMemo(() => measure(fromInput), [fromInput]);
  const to = useMemo(() => measure(toInput), [toInput]);

  const stockRpm = from ? engineRpm({ mph, axleRatio: axle, gearRatio: gear, tireDiameter: from.diameter }) : 0;
  const newRpm = to ? engineRpm({ mph, axleRatio: axle, gearRatio: gear, tireDiameter: to.diameter }) : 0;
  const rpmDrop = newRpm - stockRpm;

  const target =
    from && to
      ? equivalentAxleRatio({ currentRatio: axle, fromDiameter: from.diameter, toDiameter: to.diameter })
      : axle;
  const nearest = nearestAxleRatio(target);
  const restoredRpm = to ? engineRpm({ mph, axleRatio: nearest.ratio, gearRatio: gear, tireDiameter: to.diameter }) : 0;

  const pctChange = from && to ? ((to.diameter - from.diameter) / from.diameter) * 100 : 0;

  const summary =
    from && to
      ? [
          `${from.size.label} → ${to.size.label} on a ${axle} axle`,
          `At ${mph} mph in a ${gear}:1 gear:`,
          `  Original RPM: ${Math.round(stockRpm)}`,
          `  New RPM: ${Math.round(newRpm)} (${signed(rpmDrop, 0)})`,
          `Axle ratio to restore original RPM: ${round(target, 2)}`,
          `Nearest common ratio: ${nearest.ratio} (leaves ${signed(nearest.errorPct, 1)}% error)`,
        ].join("\n")
      : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">GEARING AND ENGINE SPEED</span>
        <h2 id="calculator-title">What the engine will actually be doing</h2>
        <p>
          Enter your axle ratio and the tire sizes involved. This works out cruising RPM on each size,
          then the axle ratio that would put the engine back where it started.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Current tire size"
          value={fromInput}
          onChange={(value) => set("from", value)}
          placeholder="265/70R17"
          invalid={Boolean(fromInput) && !from}
        />
        <Field
          label="New tire size"
          value={toInput}
          onChange={(value) => set("to", value)}
          placeholder="285/70R17"
          invalid={Boolean(toInput) && !to}
        />
      </div>

      <div className="tool-inputs triple">
        <StepField
          label="Axle (final drive) ratio"
          value={values.axle ?? DEFAULTS.axle}
          onChange={(value) => set("axle", value)}
          step={0.01}
          min={2}
          max={7}
          hint="On the differential tag or the door sticker axle code"
        />
        <StepField
          label="Transmission gear ratio"
          value={values.gear ?? DEFAULTS.gear}
          onChange={(value) => set("gear", value)}
          step={0.01}
          min={0.4}
          max={5}
          hint="Use 1.00 for a direct-drive gear, or your overdrive ratio for cruising"
        />
        <StepField
          label="Road speed"
          value={values.mph ?? DEFAULTS.mph}
          onChange={(value) => set("mph", value)}
          step={5}
          min={5}
          max={120}
          suffix="mph"
        />
      </div>

      <div className="quick-sizes">
        <small>Common axle ratios</small>
        {COMMON_AXLE_RATIOS.slice(2, 12).map((ratio) => (
          <button
            type="button"
            key={ratio}
            className={String(ratio) === values.axle ? "active" : ""}
            onClick={() => set("axle", String(ratio))}
          >
            {ratio.toFixed(2)}
          </button>
        ))}
      </div>

      {(!from || !to) && (
        <p className="tool-error" role="alert">
          Both tire sizes need to be readable before gearing can be calculated. The expected format is{" "}
          <b>265/70R17</b>, or a flotation size such as <b>33x12.50R17</b>.
        </p>
      )}

      {from && to && (
        <>
          <Verdict
            tone={Math.abs(pctChange) <= 3 ? "good" : Math.abs(pctChange) <= 8 ? "warn" : "bad"}
            headline={
              Math.abs(rpmDrop) < 10
                ? "Effectively no change in gearing"
                : `Cruising RPM ${rpmDrop < 0 ? "drops" : "rises"} by about ${Math.abs(Math.round(rpmDrop))} at ${mph} mph`
            }
            detail={
              Math.abs(pctChange) <= 3
                ? `A ${signed(pctChange, 1)}% diameter change shifts the effective gearing very little. Most vehicles absorb this without any need to regear, though a heavily loaded truck may still feel it.`
                : `A ${signed(pctChange, 1)}% diameter change acts like swapping to a numerically ${pctChange > 0 ? "lower" : "higher"} axle ratio. To put the engine back where it was you would need about ${round(target, 2)} — the nearest commonly available ratio is ${nearest.ratio}, which leaves ${round(Math.abs(nearest.errorPct), 1)}% of error.`
            }
          />

          <div className="tool-metrics wide">
            <Metric
              label={`RPM on ${from.size.label}`}
              value={String(Math.round(stockRpm))}
              note={`At ${mph} mph, ${gear.toFixed(2)}:1`}
            />
            <Metric
              label={`RPM on ${to.size.label}`}
              value={String(Math.round(newRpm))}
              note={`${signed(rpmDrop, 0)} RPM`}
              tone={Math.abs(rpmDrop) < 150 ? "good" : "warn"}
            />
            <Metric
              label="Axle ratio to restore RPM"
              value={round(target, 2).toFixed(2)}
              note={`From ${axle.toFixed(2)}`}
            />
            <Metric
              label="Nearest available ratio"
              value={nearest.ratio.toFixed(2)}
              note={`Leaves ${signed(nearest.errorPct, 1)}% error`}
              tone={Math.abs(nearest.errorPct) <= 2 ? "good" : "warn"}
            />
            <Metric
              label={`RPM after regearing to ${nearest.ratio.toFixed(2)}`}
              value={String(Math.round(restoredRpm))}
              note={`${signed(restoredRpm - stockRpm, 0)} against original`}
            />
            <Metric
              label="Effective gearing change"
              value={`${signed(pctChange, 1)}%`}
              note="Same magnitude as the diameter change"
            />
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Road speed</th>
                  <th>RPM on {from.size.label}</th>
                  <th>RPM on {to.size.label}</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody>
                {[30, 45, 60, 70, 80].map((speed) => {
                  const a = engineRpm({ mph: speed, axleRatio: axle, gearRatio: gear, tireDiameter: from.diameter });
                  const b = engineRpm({ mph: speed, axleRatio: axle, gearRatio: gear, tireDiameter: to.diameter });
                  return (
                    <tr key={speed}>
                      <th>{speed} mph</th>
                      <td>{Math.round(a)}</td>
                      <td>{Math.round(b)}</td>
                      <td>{signed(b - a, 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            The same size change also moves your speedometer.{" "}
            <Link
              href={`/tools/speedometer-error-calculator?from=${encodeURIComponent(from.size.label)}&to=${encodeURIComponent(to.size.label)}`}
            >
              Work out the indicated-speed error
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
