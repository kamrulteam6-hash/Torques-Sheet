"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { ROTOR_DIAMETER_GUIDANCE, stopEnergy } from "../brake-math";
import { round } from "../tire-math";

const DEFAULTS = { weight: "3500", speed: "80", wheel: "18" };

export function BrakeRotorSizeCalculator() {
  const { values, set, reset } = useToolState("rotor-size", DEFAULTS);
  const weightLb = Number(values.weight ?? DEFAULTS.weight) || 0;
  const speedMph = Number(values.speed ?? DEFAULTS.speed) || 0;
  const wheelDiameterIn = Number(values.wheel ?? DEFAULTS.wheel) || 0;

  const energy = useMemo(() => stopEnergy({ weightLb, speedMph }), [weightLb, speedMph]);

  const summary = [
    `${weightLb}lb from ${speedMph} mph, ${wheelDiameterIn}" wheel`,
    `Energy to dissipate per stop: ${round(energy.kineticEnergyBtu, 0)} BTU`,
    ...ROTOR_DIAMETER_GUIDANCE.map((g) => `${g.use}: ${round(wheelDiameterIn * g.minFraction, 1)}" minimum rotor`),
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">HEAT LOAD, PLUS SIZING GUIDANCE</span>
        <h2 id="calculator-title">What a rotor has to absorb, and roughly how big</h2>
        <p>
          A rotor and pads convert kinetic energy into heat, once, every stop. This works out how much
          energy a single stop from a given speed represents, and pairs it with the rule-of-thumb
          minimum rotor diameter — as a fraction of overall wheel diameter — by use case.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Vehicle weight" value={values.weight ?? DEFAULTS.weight} onChange={(v) => set("weight", v)} step={50} min={500} max={9000} suffix="lb" />
        <StepField label="Stop from speed" value={values.speed ?? DEFAULTS.speed} onChange={(v) => set("speed", v)} step={5} min={10} max={200} suffix="mph" />
        <StepField label="Wheel diameter" value={values.wheel ?? DEFAULTS.wheel} onChange={(v) => set("wheel", v)} step={1} min={13} max={24} suffix="in" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Energy per stop" value={`${round(energy.kineticEnergyBtu, 0)} BTU`} note={`From ${speedMph} mph to a stop`} tone="good" />
        <Metric label="Energy in ft·lb" value={Math.round(energy.kineticEnergyBtu * 778.169).toLocaleString()} note="Same figure, mechanical units" />
        <Metric label="Wheel diameter" value={`${wheelDiameterIn}"`} note="What rotor guidance scales against" />
        <Metric label="Track-use minimum" value={`${round(wheelDiameterIn * 0.7, 1)}"`} note="70% of wheel diameter" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Use case</th>
              <th>Guidance (% of wheel diameter)</th>
              <th>Minimum rotor diameter, {wheelDiameterIn}&quot; wheel</th>
            </tr>
          </thead>
          <tbody>
            {ROTOR_DIAMETER_GUIDANCE.map((g) => (
              <tr key={g.use}>
                <th>{g.use}</th>
                <td>{Math.round(g.minFraction * 100)}%</td>
                <td>{round(wheelDiameterIn * g.minFraction, 1)}&quot;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Stop from</th>
              <th>Energy to dissipate</th>
            </tr>
          </thead>
          <tbody>
            {[40, 60, 80, 100, 130, 160].map((s) => (
              <tr key={s} className={s === speedMph ? "row-active" : undefined}>
                <th>{s} mph</th>
                <td>{Math.round(stopEnergy({ weightLb, speedMph: s }).kineticEnergyBtu)} BTU</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
