"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { boostPressureRatio, boostedPowerEstimate } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { naHp: "300", boost: "10", altitude: "0" };

export function TurboBoostCalculator() {
  const { values, set, reset } = useToolState("turbo-boost", DEFAULTS);
  const naHp = Number(values.naHp ?? DEFAULTS.naHp) || 0;
  const boost = Number(values.boost ?? DEFAULTS.boost) || 0;
  const altitude = Number(values.altitude ?? DEFAULTS.altitude) || 0;

  const result = useMemo(() => boostPressureRatio({ boostPsi: boost, altitudeFt: altitude }), [boost, altitude]);
  const estimate = useMemo(() => boostedPowerEstimate(naHp, result.pressureRatio), [naHp, result.pressureRatio]);

  const summary = [
    `${naHp}hp NA baseline, ${boost}psi boost at ${altitude}ft`,
    `Atmospheric pressure: ${round(result.atmosphericPsi, 2)} psi`,
    `Pressure ratio: ${round(result.pressureRatio, 3)}`,
    `Ceiling estimate: ${Math.round(estimate)} hp`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">A CEILING, NOT A PREDICTION</span>
        <h2 id="calculator-title">Power potential from adding boost</h2>
        <p>
          Boost increases the mass of air (and, with it, fuel) an engine can pack into a cylinder, which
          is roughly what drives the power gain. This scales a naturally aspirated baseline by the
          absolute pressure ratio boost produces — an honest optimistic ceiling, not a number to bet on.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="NA baseline power" value={values.naHp ?? DEFAULTS.naHp} onChange={(v) => set("naHp", v)} step={10} min={50} max={1500} suffix="hp" />
        <StepField label="Boost pressure" value={values.boost ?? DEFAULTS.boost} onChange={(v) => set("boost", v)} step={1} min={1} max={40} suffix="psi" />
        <StepField label="Altitude" value={values.altitude ?? DEFAULTS.altitude} onChange={(v) => set("altitude", v)} step={500} min={0} max={10000} suffix="ft" />
      </div>

      <Verdict
        tone="warn"
        headline={`Ceiling estimate: ${Math.round(estimate)} hp`}
        detail="This is what the pressure ratio alone suggests is possible — it assumes the fuel system, intercooling and ignition timing all keep pace perfectly, which real builds rarely do. Intake and exhaust restriction, intercooler heat soak, and octane-limited timing all pull the real result below this number. Treat it as an upper bound to plan around, not a figure to expect on a dyno sheet."
      />

      <div className="tool-metrics wide">
        <Metric label="Ceiling power estimate" value={`${Math.round(estimate)} hp`} note={`+${Math.round(estimate - naHp)} hp over NA`} tone="warn" />
        <Metric label="Pressure ratio" value={round(result.pressureRatio, 3).toString()} note="Absolute pressure, boost ÷ atmospheric" />
        <Metric label="Atmospheric pressure" value={`${round(result.atmosphericPsi, 2)} psi`} note={`At ${altitude.toLocaleString()} ft`} />
        <Metric label="Absolute pressure" value={`${round(result.absolutePsi, 2)} psi`} note="Boost + atmospheric" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Boost pressure</th>
              <th>Pressure ratio</th>
              <th>Ceiling estimate</th>
            </tr>
          </thead>
          <tbody>
            {[5, 8, 10, 12, 15, 20].map((b) => {
              const r = boostPressureRatio({ boostPsi: b, altitudeFt: altitude });
              return (
                <tr key={b} className={b === boost ? "row-active" : undefined}>
                  <th>{b} psi</th>
                  <td>{round(r.pressureRatio, 2)}</td>
                  <td>{Math.round(boostedPowerEstimate(naHp, r.pressureRatio))} hp</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Want the exact compressor-map pressure ratio, without the power estimate attached?{" "}
        <Link href={`/tools/boost-pressure-ratio-calculator?boost=${boost}&altitude=${altitude}`}>
          The boost pressure ratio calculator
        </Link>{" "}
        is the pure figure on its own.
      </p>
    </section>
  );
}
