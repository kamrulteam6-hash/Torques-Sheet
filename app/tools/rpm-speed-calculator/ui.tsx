"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { engineRpm, measure, roadSpeed, round } from "../tire-math";

const DEFAULTS = {
  solve: "rpm",
  mph: "70",
  rpm: "2500",
  axle: "3.55",
  size: "265/70R17",
  g1: "3.5",
  g2: "2.0",
  g3: "1.4",
  g4: "1.0",
  g5: "0.8",
};

export function RpmSpeedCalculator() {
  const { values, set, reset } = useToolState("rpm-speed", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const mphIn = Number(values.mph ?? DEFAULTS.mph) || 0;
  const rpmIn = Number(values.rpm ?? DEFAULTS.rpm) || 0;
  const axle = Number(values.axle ?? DEFAULTS.axle) || 0;
  const sizeInput = values.size ?? DEFAULTS.size;

  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);
  const gears = [
    Number(values.g1 ?? DEFAULTS.g1) || 1,
    Number(values.g2 ?? DEFAULTS.g2) || 1,
    Number(values.g3 ?? DEFAULTS.g3) || 1,
    Number(values.g4 ?? DEFAULTS.g4) || 1,
    Number(values.g5 ?? DEFAULTS.g5) || 1,
  ];

  const diameter = geometry?.diameter ?? 0;

  const rows = gears.map((gear, index) => {
    const value =
      solve === "rpm"
        ? engineRpm({ mph: mphIn, axleRatio: axle, gearRatio: gear, tireDiameter: diameter })
        : roadSpeed({ rpm: rpmIn, axleRatio: axle, gearRatio: gear, tireDiameter: diameter });
    return { gear: index + 1, ratio: gear, value };
  });

  const summary = geometry
    ? [
        `${sizeInput}, ${axle} axle`,
        solve === "rpm" ? `At ${mphIn} mph:` : `At ${rpmIn} rpm:`,
        ...rows.map((r) =>
          solve === "rpm"
            ? `  Gear ${r.gear} (${r.ratio}:1): ${Math.round(r.value)} rpm`
            : `  Gear ${r.gear} (${r.ratio}:1): ${round(r.value, 1)} mph`,
        ),
      ].join("\n")
    : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EVERY GEAR AT ONCE</span>
        <h2 id="calculator-title">RPM at a given speed, or speed at a given RPM</h2>
        <p>
          Enter your axle ratio and tire size once, then solve either direction across all five gears.
          Useful for checking where a shift point lands, or what RPM a given cruising speed needs.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        <button type="button" className={solve === "rpm" ? "active" : ""} onClick={() => set("solve", "rpm")}>
          Solve for RPM
        </button>
        <button type="button" className={solve === "speed" ? "active" : ""} onClick={() => set("solve", "speed")}>
          Solve for speed
        </button>
      </div>

      <div className="tool-inputs triple">
        <Field
          label="Tire size"
          value={sizeInput}
          onChange={(v) => set("size", v)}
          placeholder="265/70R17"
          invalid={Boolean(sizeInput) && !geometry}
        />
        <StepField label="Axle ratio" value={values.axle ?? DEFAULTS.axle} onChange={(v) => set("axle", v)} step={0.01} min={2} max={7} />
        {solve === "rpm" ? (
          <StepField label="Road speed" value={values.mph ?? DEFAULTS.mph} onChange={(v) => set("mph", v)} step={5} min={5} max={150} suffix="mph" />
        ) : (
          <StepField label="Engine speed" value={values.rpm ?? DEFAULTS.rpm} onChange={(v) => set("rpm", v)} step={100} min={500} max={9000} suffix="rpm" />
        )}
      </div>

      <div className="tool-panel-head tool-subhead">
        <span className="kicker">GEAR RATIOS (EDIT TO MATCH YOUR TRANSMISSION)</span>
      </div>
      <div className="tool-inputs five">
        {[1, 2, 3, 4, 5].map((n) => (
          <StepField
            key={n}
            label={`Gear ${n}`}
            value={values[`g${n}`] ?? DEFAULTS[`g${n}` as keyof typeof DEFAULTS]}
            onChange={(v) => set(`g${n}`, v)}
            step={0.05}
            min={0.4}
            max={6}
          />
        ))}
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That tire size is not readable yet. The expected form is <b>265/70R17</b>.
        </p>
      )}

      {geometry && (
        <>
          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Gear</th>
                  <th>Ratio</th>
                  <th>Overall ratio (× axle)</th>
                  <th>{solve === "rpm" ? `RPM at ${mphIn} mph` : `Speed at ${rpmIn} rpm`}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.gear}>
                    <th>{r.gear}</th>
                    <td>{r.ratio.toFixed(2)}:1</td>
                    <td>{round(r.ratio * axle, 2)}:1</td>
                    <td>{solve === "rpm" ? `${Math.round(r.value)} rpm` : `${round(r.value, 1)} mph`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="tool-metrics wide">
            <Metric label="Overall diameter" value={`${round(geometry.diameter, 2)}"`} note="Drives every figure above" />
            <Metric label="Revs per mile" value={String(Math.round(geometry.revsPerMile))} note="At the tire" />
            <Metric label="Top gear overall" value={`${round(gears[4] * axle, 2)}:1`} note={`Gear 5 × ${axle} axle`} />
            <Metric
              label={solve === "rpm" ? "RPM range across gears" : "Speed range across gears"}
              value={
                solve === "rpm"
                  ? `${Math.round(Math.min(...rows.map((r) => r.value)))}–${Math.round(Math.max(...rows.map((r) => r.value)))}`
                  : `${round(Math.min(...rows.map((r) => r.value)), 0)}–${round(Math.max(...rows.map((r) => r.value)), 0)} mph`
              }
              note="Lowest to highest gear"
            />
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Changed tire size and want the torque consequence too?{" "}
            <Link href="/tools/wheel-torque-calculator">The wheel torque calculator</Link> uses the same
            overall ratio.
          </p>
        </>
      )}
    </section>
  );
}
