"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { measure, round } from "../tire-math";
import { wheelTorque } from "../perf-math";

const DEFAULTS = { torque: "400", gear: "3.0", axle: "3.55", size: "265/70R17", eff: "85" };

export function WheelTorqueCalculator() {
  const { values, set, reset } = useToolState("wheel-torque", DEFAULTS);
  const engineTorque = Number(values.torque ?? DEFAULTS.torque) || 0;
  const gearRatio = Number(values.gear ?? DEFAULTS.gear) || 0;
  const finalDrive = Number(values.axle ?? DEFAULTS.axle) || 0;
  const efficiency = (Number(values.eff ?? DEFAULTS.eff) || 0) / 100;
  const sizeInput = values.size ?? DEFAULTS.size;

  const geometry = useMemo(() => measure(sizeInput), [sizeInput]);
  const result = useMemo(
    () =>
      geometry
        ? wheelTorque({ engineTorque, gearRatio, finalDrive, tireDiameter: geometry.diameter, efficiency })
        : null,
    [engineTorque, gearRatio, finalDrive, geometry, efficiency],
  );

  const summary =
    geometry && result
      ? [
          `${engineTorque} lb·ft engine, ${gearRatio}:1 gear, ${finalDrive}:1 axle, ${sizeInput}`,
          `Overall ratio: ${round(result.overallRatio, 2)}:1`,
          `Torque at the wheel: ${round(result.wheelTorque, 0)} lb·ft (${Math.round(efficiency * 100)}% efficient)`,
          `Tractive force: ${round(result.tractiveForce, 0)} lb`,
        ].join("\n")
      : "";

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">TORQUE MULTIPLIED THROUGH THE DRIVETRAIN</span>
        <h2 id="calculator-title">What actually reaches the road</h2>
        <p>
          An engine&apos;s own torque figure is only the starting point. The gearbox and final drive
          multiply it considerably before it reaches the tire, and this works out how much survives the
          trip.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Engine torque" value={values.torque ?? DEFAULTS.torque} onChange={(v) => set("torque", v)} step={5} min={20} max={1200} suffix="lb·ft" />
        <StepField label="Gear ratio" value={values.gear ?? DEFAULTS.gear} onChange={(v) => set("gear", v)} step={0.05} min={0.4} max={6} hint="1st gear is usually the largest number" />
        <StepField label="Final drive (axle)" value={values.axle ?? DEFAULTS.axle} onChange={(v) => set("axle", v)} step={0.01} min={2} max={7} />
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Tire size"
          value={sizeInput}
          onChange={(v) => set("size", v)}
          placeholder="265/70R17"
          invalid={Boolean(sizeInput) && !geometry}
        />
        <StepField label="Drivetrain efficiency" value={values.eff ?? DEFAULTS.eff} onChange={(v) => set("eff", v)} step={1} min={60} max={98} suffix="%" hint="Manual ~90%, automatic/AWD ~80–85%" />
      </div>

      {!geometry && sizeInput && (
        <p className="tool-error" role="alert">
          That tire size is not readable yet. The expected form is <b>265/70R17</b>.
        </p>
      )}

      {geometry && result && (
        <>
          <div className="tool-metrics wide">
            <Metric label="Overall ratio" value={`${round(result.overallRatio, 2)}:1`} note="Gear × final drive" tone="good" />
            <Metric label="Torque at the wheel" value={`${round(result.wheelTorque, 0)} lb·ft`} note={`${Math.round(efficiency * 100)}% delivered`} tone="good" />
            <Metric label="Lost to the drivetrain" value={`${round(result.lossLbFt, 0)} lb·ft`} note="Friction, windage, flex" />
            <Metric label="Tractive force" value={`${round(result.tractiveForce, 0)} lb`} note="At the contact patch" />
          </div>

          <div className="table-scroll">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Gear ratio</th>
                  <th>Overall ratio</th>
                  <th>Wheel torque</th>
                  <th>Tractive force</th>
                </tr>
              </thead>
              <tbody>
                {[3.5, 2.5, 1.8, 1.3, 1.0, 0.8].map((gear) => {
                  const r = wheelTorque({ engineTorque, gearRatio: gear, finalDrive, tireDiameter: geometry.diameter, efficiency });
                  return (
                    <tr key={gear} className={gear === gearRatio ? "row-active" : undefined}>
                      <th>{gear.toFixed(2)}:1</th>
                      <td>{round(r.overallRatio, 2)}:1</td>
                      <td>{round(r.wheelTorque, 0)} lb·ft</td>
                      <td>{round(r.tractiveForce, 0)} lb</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ShareRow summary={summary} onReset={reset} />

          <p className="tool-next">
            Want the road speed this ratio produces?{" "}
            <Link href="/tools/rpm-speed-calculator">The RPM and speed calculator</Link> uses the same
            overall ratio.
          </p>
        </>
      )}
    </section>
  );
}
