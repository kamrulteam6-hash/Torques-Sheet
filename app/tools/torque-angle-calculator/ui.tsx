"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { torqueAngleTravel } from "../bolt-math";
import { round } from "../tire-math";

const DEFAULTS = { pitch: "1.5", angle: "90" };

export function TorqueAngleCalculator() {
  const { values, set, reset } = useToolState("torque-angle", DEFAULTS);
  const pitchMm = Number(values.pitch ?? DEFAULTS.pitch) || 0;
  const angleDeg = Number(values.angle ?? DEFAULTS.angle) || 0;

  const result = useMemo(() => torqueAngleTravel(pitchMm, angleDeg), [pitchMm, angleDeg]);
  const turns = angleDeg / 360;

  const summary = [
    `${pitchMm}mm pitch, ${angleDeg}° additional turn`,
    `Additional clamp travel: ${round(result.additionalTravelMm, 3)} mm`,
    `Fraction of a full turn: ${round(turns, 3)}`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">TORQUE-TO-YIELD, MADE CONCRETE</span>
        <h2 id="calculator-title">What a torque-angle spec actually moves</h2>
        <p>
          Torque-to-yield fasteners — common on cylinder head bolts — are tightened to a snug torque,
          then rotated a further specified angle rather than a further torque figure. This works out the
          actual linear clamp travel that angle produces, from the thread pitch.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Thread pitch" value={values.pitch ?? DEFAULTS.pitch} onChange={(v) => set("pitch", v)} step={0.05} min={0.5} max={3} suffix="mm" />
        <StepField label="Additional turn angle" value={values.angle ?? DEFAULTS.angle} onChange={(v) => set("angle", v)} step={5} min={10} max={360} suffix="°" hint="From the torque-to-yield specification" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Additional clamp travel" value={`${round(result.additionalTravelMm, 3)} mm`} note="Along the fastener's axis" tone="good" />
        <Metric label="Fraction of a full turn" value={round(turns, 3).toString()} note={`${angleDeg}° ÷ 360°`} />
        <Metric label="Thread pitch" value={`${pitchMm} mm`} note="Per full revolution" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Turn angle</th>
              <th>Clamp travel at {pitchMm} mm pitch</th>
            </tr>
          </thead>
          <tbody>
            {[45, 90, 120, 180, 270, 360].map((a) => (
              <tr key={a} className={a === angleDeg ? "row-active" : undefined}>
                <th>{a}°</th>
                <td>{round(torqueAngleTravel(pitchMm, a).additionalTravelMm, 3)} mm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
