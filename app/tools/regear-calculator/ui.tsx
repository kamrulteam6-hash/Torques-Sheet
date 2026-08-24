"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { axleRatioForTargetRpm } from "../perf-math";
import { COMMON_AXLE_RATIOS, measure, nearestAxleRatio, round } from "../tire-math";

const DEFAULTS = { rpm: "2000", mph: "70", gear: "0.8", size: "265/70R17" };

export function RegearCalculator() {
  const { values, set, reset } = useToolState("regear", DEFAULTS);
  const targetRpm = Number(values.rpm ?? DEFAULTS.rpm) || 0;
  const mph = Number(values.mph ?? DEFAULTS.mph) || 0;
  const gearRatio = Number(values.gear ?? DEFAULTS.gear) || 0;
  const sizeInput = values.size ?? DEFAULTS.size;

  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);
  const target = useMemo(
    () =>
      geometry
        ? axleRatioForTargetRpm({ targetRpm, mph, gearRatio, tireDiameter: geometry.diameter })
        : 0,
    [targetRpm, mph, gearRatio, geometry],
  );
  const nearest = useMemo(() => nearestAxleRatio(target), [target]);

  const summary = geometry
    ? [
        `Target: ${targetRpm} rpm at ${mph} mph, ${gearRatio}:1 gear, ${sizeInput}`,
        `Axle ratio needed: ${round(target, 2)}:1`,
        `Nearest available: ${nearest.ratio}:1 (${round(nearest.errorPct, 1)}% off target)`,
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">START FROM THE RPM YOU WANT</span>
        <h2 id="calculator-title">Solve for the ratio, not the result</h2>
        <p>
          Rather than checking what an existing ratio produces, this works backwards from a target: the
          engine speed you want at a given road speed, in a specific gear. Useful for planning a build,
          matching a highway cruise RPM, or choosing a ratio for a large tire size before buying gears.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Target engine speed" value={values.rpm ?? DEFAULTS.rpm} onChange={(v) => set("rpm", v)} step={50} min={800} max={6000} suffix="rpm" />
        <StepField label="At road speed" value={values.mph ?? DEFAULTS.mph} onChange={(v) => set("mph", v)} step={5} min={20} max={90} suffix="mph" />
        <StepField label="In transmission gear" value={values.gear ?? DEFAULTS.gear} onChange={(v) => set("gear", v)} step={0.05} min={0.4} max={4} hint="0.8 for a typical overdrive top gear" />
      </div>

      <div className="tool-inputs single">
        <Field label="Tire size" value={sizeInput} onChange={(v) => set("size", v)} placeholder="265/70R17" invalid={Boolean(sizeInput) && !geometry} />
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That tire size is not readable yet. The expected form is <b>265/70R17</b>.
        </p>
      )}

      {geometry && (
        <>
          <div className="tool-metrics wide">
            <Metric label="Axle ratio needed" value={`${round(target, 2)}:1`} note="Exact solve" tone="good" />
            <Metric
              label="Nearest available ratio"
              value={`${nearest.ratio}:1`}
              note={`${round(Math.abs(nearest.errorPct), 1)}% ${nearest.errorPct >= 0 ? "numerically higher" : "numerically lower"}`}
              tone={Math.abs(nearest.errorPct) <= 2 ? "good" : "warn"}
            />
            <Metric label="RPM with nearest ratio" value={`${Math.round((targetRpm * nearest.ratio) / target)} rpm`} note={`Against a ${targetRpm} rpm target`} />
            <Metric label="Tire diameter" value={`${round(geometry.diameter, 2)}"`} note={sizeInput} />
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Ratio</th>
                  <th>RPM at {mph} mph</th>
                  <th>Difference from target</th>
                </tr>
              </thead>
              <tbody>
                {COMMON_AXLE_RATIOS.map((std) => {
                  const rpmAtStd = (targetRpm * std) / target;
                  const isNearest = std === nearest.ratio;
                  return (
                    <tr key={std} className={isNearest ? "row-active" : undefined}>
                      <th>{std}:1</th>
                      <td>{Math.round(rpmAtStd)} rpm</td>
                      <td>{Math.round(rpmAtStd - targetRpm)} rpm</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Want to check what your current ratio produces instead of starting from a target?{" "}
            <Link href="/tools/gear-ratio-calculator">The gear ratio calculator</Link> works in that
            direction, or see the{" "}
            <Link href="/tools/final-drive-ratio-calculator">ring and pinion teeth</Link> a given ratio
            typically uses.
          </p>
        </>
      )}
    </section>
  );
}
