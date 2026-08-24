"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { brakingForceFromDecel } from "../brake-math";
import { round } from "../tire-math";

const DEFAULTS = { weight: "3500", decel: "1.0", speed: "60" };

export function BrakingForceCalculator() {
  const { values, set, reset } = useToolState("braking-force", DEFAULTS);
  const weightLb = Number(values.weight ?? DEFAULTS.weight) || 0;
  const decelG = Number(values.decel ?? DEFAULTS.decel) || 0;
  const speedMph = Number(values.speed ?? DEFAULTS.speed) || 0;

  const result = useMemo(() => brakingForceFromDecel({ weightLb, decelG, speedMph }), [weightLb, decelG, speedMph]);

  const summary = [
    `${weightLb}lb at ${decelG}g deceleration from ${speedMph} mph`,
    `Total braking force: ${round(result.totalForceLb, 0)} lb`,
    `Idealized stopping distance: ${round(result.stoppingDistanceFt, 0)} ft`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FORCE FROM A TARGET DECELERATION</span>
        <h2 id="calculator-title">Braking force, and an idealized floor on distance</h2>
        <p>
          Enter a weight and a target deceleration in g, and this works out the total force needed to
          produce it. The stopping-distance figure alongside is a theoretical minimum under constant
          deceleration and perfect traction — not a prediction of how any real vehicle actually stops.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Vehicle weight" value={values.weight ?? DEFAULTS.weight} onChange={(v) => set("weight", v)} step={50} min={500} max={9000} suffix="lb" />
        <StepField label="Target deceleration" value={values.decel ?? DEFAULTS.decel} onChange={(v) => set("decel", v)} step={0.05} min={0.1} max={1.5} suffix="g" hint="1.0g is roughly a hard street stop on good tires" />
        <StepField label="Speed" value={values.speed ?? DEFAULTS.speed} onChange={(v) => set("speed", v)} step={5} min={10} max={180} suffix="mph" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Total braking force" value={`${round(result.totalForceLb, 0)} lb`} note="All four wheels combined" tone="good" />
        <Metric label="Force per wheel" value={`${round(result.perWheelLb, 0)} lb`} note="Assuming even distribution" />
        <Metric label="Idealized stopping distance" value={`${round(result.stoppingDistanceFt, 0)} ft`} note="Theoretical minimum — see caveat below" tone="warn" />
        <Metric label="Deceleration" value={`${decelG}g`} note={`${round(decelG * 32.174, 1)} ft/s²`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Deceleration</th>
              <th>Force needed</th>
              <th>Idealized distance from {speedMph} mph</th>
            </tr>
          </thead>
          <tbody>
            {[0.5, 0.7, 0.9, 1.0, 1.2, 1.4].map((g) => {
              const r = brakingForceFromDecel({ weightLb, decelG: g, speedMph });
              return (
                <tr key={g} className={g === decelG ? "row-active" : undefined}>
                  <th>{g.toFixed(2)}g</th>
                  <td>{round(r.totalForceLb, 0)} lb</td>
                  <td>{round(r.stoppingDistanceFt, 0)} ft</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
