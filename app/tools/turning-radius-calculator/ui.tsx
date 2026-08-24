"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { turningRadius } from "../fitment-math";
import { round } from "../tire-math";

const DEFAULTS = { wheelbase: "108", angle: "35", track: "62" };

export function TurningRadiusCalculator() {
  const { values, set, reset } = useToolState("turning-radius", DEFAULTS);
  const wheelbaseIn = Number(values.wheelbase ?? DEFAULTS.wheelbase) || 0;
  const steeringAngleDeg = Number(values.angle ?? DEFAULTS.angle) || 0;
  const trackWidthIn = Number(values.track ?? DEFAULTS.track) || 0;

  const result = useMemo(() => turningRadius({ wheelbaseIn, steeringAngleDeg, trackWidthIn }), [wheelbaseIn, steeringAngleDeg, trackWidthIn]);

  const summary = [
    `${wheelbaseIn}" wheelbase, ${steeringAngleDeg}° avg steering angle, ${trackWidthIn}" track`,
    `Centreline radius: ${round(result.centrelineRadiusFt, 2)} ft`,
    `Curb-to-curb radius: ${round(result.curbToCurbRadiusFt, 2)} ft`,
    `Turning circle: ${round(result.turningCircleFt, 1)} ft`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">THE FIGURE MANUFACTURERS PUBLISH</span>
        <h2 id="calculator-title">Turning radius and turning circle</h2>
        <p>
          Wheelbase and steering angle set how tightly a vehicle can turn. This gives both the simplified
          centreline radius engineers use for quick estimates, and the curb-to-curb figure — the one
          manufacturers actually publish — which accounts for track width and the outer wheel&apos;s
          wider path.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Wheelbase" value={values.wheelbase ?? DEFAULTS.wheelbase} onChange={(v) => set("wheelbase", v)} step={1} min={60} max={180} suffix="in" />
        <StepField label="Average steering angle" value={values.angle ?? DEFAULTS.angle} onChange={(v) => set("angle", v)} step={1} min={15} max={50} suffix="°" hint="Average of inner and outer wheel angles at full lock" />
        <StepField label="Front track width" value={values.track ?? DEFAULTS.track} onChange={(v) => set("track", v)} step={1} min={40} max={90} suffix="in" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Turning circle (curb-to-curb)" value={`${round(result.turningCircleFt, 1)} ft`} note="Diameter — the published figure" tone="good" />
        <Metric label="Curb-to-curb radius" value={`${round(result.curbToCurbRadiusFt, 2)} ft`} note="Outer front wheel's path" tone="good" />
        <Metric label="Centreline radius" value={`${round(result.centrelineRadiusFt, 2)} ft`} note="Simplified bicycle-model estimate" />
        <Metric label="Track width contribution" value={`${round(trackWidthIn / 2 / 12, 2)} ft`} note="Added to the outer wheel's radius" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Steering angle</th>
              <th>Turning circle</th>
            </tr>
          </thead>
          <tbody>
            {[25, 30, 35, 40, 45].map((a) => {
              const r = turningRadius({ wheelbaseIn, steeringAngleDeg: a, trackWidthIn });
              return (
                <tr key={a} className={a === steeringAngleDeg ? "row-active" : undefined}>
                  <th>{a}°</th>
                  <td>{round(r.turningCircleFt, 1)} ft</td>
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
