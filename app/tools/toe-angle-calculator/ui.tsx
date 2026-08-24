"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { toeAngleFromDistance, toeDistanceFromAngle } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { solve: "angle", distance: "0.25", angle: "0.6", tire: "24" };

export function ToeAngleCalculator() {
  const { values, set, reset } = useToolState("toe-angle", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const distanceIn = Number(values.distance ?? DEFAULTS.distance) || 0;
  const angleDeg = Number(values.angle ?? DEFAULTS.angle) || 0;
  const tireDiameterIn = Number(values.tire ?? DEFAULTS.tire) || 0;

  const solvedAngle = useMemo(() => toeAngleFromDistance(distanceIn, tireDiameterIn), [distanceIn, tireDiameterIn]);
  const solvedDistance = useMemo(() => toeDistanceFromAngle(angleDeg, tireDiameterIn), [angleDeg, tireDiameterIn]);

  const summary =
    solve === "angle"
      ? `${distanceIn}" toe distance on a ${tireDiameterIn}" tire -> ${round(solvedAngle, 3)}° toe angle`
      : `${angleDeg}° target toe angle on a ${tireDiameterIn}" tire -> ${round(solvedDistance, 3)}" toe distance`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">TOE-PLATE DISTANCE TO ANGLE</span>
        <h2 id="calculator-title">Convert toe between inches and degrees</h2>
        <p>
          A toe-plate or string measurement gives a distance — the difference in track width measured at
          the front versus the back edge of the tire. This converts that distance to an angle using the
          tire&apos;s diameter, or works out the distance a target angle implies.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        <button type="button" className={solve === "angle" ? "active" : ""} onClick={() => set("solve", "angle")}>
          Solve for angle
        </button>
        <button type="button" className={solve === "distance" ? "active" : ""} onClick={() => set("solve", "distance")}>
          Solve for distance
        </button>
      </div>

      <div className="tool-inputs triple">
        {solve === "angle" ? (
          <StepField label="Toe distance" value={values.distance ?? DEFAULTS.distance} onChange={(v) => set("distance", v)} step={0.0625} min={-2} max={2} suffix="in" hint="Front-edge to rear-edge track width difference" />
        ) : (
          <StepField label="Target toe angle" value={values.angle ?? DEFAULTS.angle} onChange={(v) => set("angle", v)} step={0.05} min={-3} max={3} suffix="°" />
        )}
        <StepField label="Tire diameter" value={values.tire ?? DEFAULTS.tire} onChange={(v) => set("tire", v)} step={0.5} min={18} max={35} suffix="in" hint="Overall diameter — use the tire size calculator if unsure" />
      </div>

      <div className="tool-metrics wide">
        {solve === "angle" ? (
          <Metric label="Toe angle" value={`${round(solvedAngle, 3)}°`} note={distanceIn >= 0 ? "Toe-in" : "Toe-out"} tone="good" />
        ) : (
          <Metric label="Toe distance" value={`${round(solvedDistance, 3)}"`} note={angleDeg >= 0 ? "Toe-in" : "Toe-out"} tone="good" />
        )}
        <Metric label="Tire diameter" value={`${tireDiameterIn}"`} note="What the conversion scales against" />
        <Metric label="Toe in minutes" value={`${Math.round((solve === "angle" ? solvedAngle : angleDeg) * 60)}′`} note="Alternative unit some shops use" />
        <Metric label="Direction" value={(solve === "angle" ? distanceIn : angleDeg) >= 0 ? "Toe-in" : "Toe-out"} note="Positive value convention used here" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Toe distance</th>
              <th>Toe angle ({tireDiameterIn}&quot; tire)</th>
            </tr>
          </thead>
          <tbody>
            {[0.0625, 0.125, 0.1875, 0.25, 0.375, 0.5].map((d) => (
              <tr key={d} className={Math.abs(d - distanceIn) < 0.001 ? "row-active" : undefined}>
                <th>{d.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")}&quot;</th>
                <td>{round(toeAngleFromDistance(d, tireDiameterIn), 3)}°</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
