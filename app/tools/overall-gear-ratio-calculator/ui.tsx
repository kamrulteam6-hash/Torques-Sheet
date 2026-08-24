"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { overallDriveRatio } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { gear: "3.5", axle: "3.55", transfer: "1" };

const TRANSFER_PRESETS = [
  { key: "none", label: "2WD / no transfer case", value: 1 },
  { key: "high", label: "4WD high range", value: 1 },
  { key: "low-27", label: "4WD low range (2.72:1)", value: 2.72 },
  { key: "low-40", label: "4WD low range (4.0:1)", value: 4.0 },
];

export function OverallGearRatioCalculator() {
  const { values, set, reset } = useToolState("overall-ratio", DEFAULTS);
  const gear = Number(values.gear ?? DEFAULTS.gear) || 0;
  const axle = Number(values.axle ?? DEFAULTS.axle) || 0;
  const transfer = Number(values.transfer ?? DEFAULTS.transfer) || 1;

  const overall = useMemo(() => overallDriveRatio(gear, axle, transfer), [gear, axle, transfer]);

  const summary = [
    `Gear: ${gear}:1 × Final drive: ${axle}:1${transfer !== 1 ? ` × Transfer case: ${transfer}:1` : ""}`,
    `Overall ratio: ${round(overall, 2)}:1`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">THE WHOLE CHAIN, MULTIPLIED</span>
        <h2 id="calculator-title">Every ratio between the engine and the road</h2>
        <p>
          Engine speed relates to road speed through the transmission gear, the final drive, and — on a
          four-wheel-drive vehicle in low range — a transfer case as well. This multiplies all three into
          the single number that actually matters.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Transmission gear ratio" value={values.gear ?? DEFAULTS.gear} onChange={(v) => set("gear", v)} step={0.05} min={0.4} max={6} />
        <StepField label="Final drive (axle) ratio" value={values.axle ?? DEFAULTS.axle} onChange={(v) => set("axle", v)} step={0.01} min={2} max={7} />
        <StepField label="Transfer case ratio" value={values.transfer ?? DEFAULTS.transfer} onChange={(v) => set("transfer", v)} step={0.01} min={1} max={5} hint="1.00 for 2WD or 4WD high range" />
      </div>

      <div className="quick-sizes">
        <small>Common transfer case settings</small>
        {TRANSFER_PRESETS.map((preset) => (
          <button
            type="button"
            key={preset.key}
            className={String(preset.value) === values.transfer ? "active" : ""}
            onClick={() => set("transfer", String(preset.value))}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        <Metric label="Overall ratio" value={`${round(overall, 2)}:1`} note="Every stage multiplied" tone="good" />
        <Metric label="Gear × axle only" value={`${round(gear * axle, 2)}:1`} note="Without transfer case" />
        <Metric label="Transfer case contribution" value={`${transfer}:1`} note={transfer === 1 ? "No additional multiplication" : "Low-range multiplier"} />
        <Metric label="Torque multiplication" value={`${round(overall, 1)}×`} note="Approximate, before drivetrain loss" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Transfer case</th>
              <th>Overall ratio</th>
              <th>Change from 2WD/high</th>
            </tr>
          </thead>
          <tbody>
            {TRANSFER_PRESETS.map((preset) => {
              const r = overallDriveRatio(gear, axle, preset.value);
              const base = overallDriveRatio(gear, axle, 1);
              return (
                <tr key={preset.key} className={preset.value === transfer ? "row-active" : undefined}>
                  <th>{preset.label}</th>
                  <td>{round(r, 2)}:1</td>
                  <td>{preset.value === 1 ? "baseline" : `${round(r / base, 1)}× more`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Want the torque and force this ratio actually produces?{" "}
        <Link href="/tools/wheel-torque-calculator">The wheel torque calculator</Link> uses the same
        overall ratio against your engine&apos;s torque figure.
      </p>
    </section>
  );
}
