"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { casterFromSweep } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { change: "4", sweep: "40" };

export function CasterCalculator() {
  const { values, set, reset } = useToolState("caster", DEFAULTS);
  const camberChange = Number(values.change ?? DEFAULTS.change) || 0;
  const sweepAngle = Number(values.sweep ?? DEFAULTS.sweep) || 0;

  const caster = useMemo(() => casterFromSweep(camberChange, sweepAngle), [camberChange, sweepAngle]);

  const summary = [
    `Camber changed ${camberChange}° across a ${sweepAngle}° total sweep`,
    `Caster angle: ${round(caster, 2)}°`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">THE SWEEP METHOD</span>
        <h2 id="calculator-title">Caster from a camber-change measurement</h2>
        <p>
          Caster is not measured directly — it is inferred from how camber changes as the wheel is
          turned, because caster tilts the steering axis and that tilt shows up as a camber change
          through the turn. Turn the wheel a fixed angle each way from centre and read the camber shift.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Camber change" value={values.change ?? DEFAULTS.change} onChange={(v) => set("change", v)} step={0.1} min={0} max={15} suffix="°" hint="Difference between the two steering positions" />
        <StepField label="Total sweep angle" value={values.sweep ?? DEFAULTS.sweep} onChange={(v) => set("sweep", v)} step={5} min={10} max={90} suffix="°" hint="Total, both directions — 20° each way is a common gauge setting" />
      </div>

      <Verdict
        tone="good"
        headline={`${round(caster, 2)}° caster`}
        detail="More positive caster increases straight-line stability and steering self-centring, at the cost of heavier steering effort — a trade most performance alignments lean into deliberately. This calculation gives the angle a specific sweep measurement implies; the target for your vehicle is a separate specification."
      />

      <div className="tool-metrics wide">
        <Metric label="Caster angle" value={`${round(caster, 2)}°`} note="From the sweep measurement" tone="good" />
        <Metric label="Camber change entered" value={`${camberChange}°`} note="Between the two steering positions" />
        <Metric label="Sweep angle" value={`${sweepAngle}°`} note={`${sweepAngle / 2}° each direction from centre`} />
        <Metric label="Half-sweep (per side)" value={`${sweepAngle / 2}°`} note="What most gauges display as the turn setting" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Camber change</th>
              <th>Caster angle (at {sweepAngle}° sweep)</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((c) => (
              <tr key={c} className={c === camberChange ? "row-active" : undefined}>
                <th>{c}°</th>
                <td>{round(casterFromSweep(c, sweepAngle), 2)}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
