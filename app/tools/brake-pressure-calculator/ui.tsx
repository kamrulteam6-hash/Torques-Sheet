"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { brakePressureChain, pistonArea } from "../brake-math";
import { round } from "../tire-math";

const DEFAULTS = { pedal: "80", ratio: "4", mc: "0.875", pistons: "1.75,1.75", mu: "0.4", radius: "5.5" };

export function BrakePressureCalculator() {
  const { values, set, reset } = useToolState("brake-pressure", DEFAULTS);
  const pedalForceLb = Number(values.pedal ?? DEFAULTS.pedal) || 0;
  const pedalRatio = Number(values.ratio ?? DEFAULTS.ratio) || 0;
  const mcBore = Number(values.mc ?? DEFAULTS.mc) || 0;
  const pistonsInput = values.pistons ?? DEFAULTS.pistons;
  const padFriction = Number(values.mu ?? DEFAULTS.mu) || 0;
  const effectiveRadiusIn = Number(values.radius ?? DEFAULTS.radius) || 0;

  const pistonBores = useMemo(
    () => pistonsInput.split(",").map((s) => Number(s.trim()) || 0),
    [pistonsInput],
  );
  const totalPistonArea = useMemo(
    () => pistonBores.reduce((sum, bore) => sum + pistonArea(bore), 0),
    [pistonBores],
  );

  const chain = useMemo(
    () =>
      brakePressureChain({ pedalForceLb, pedalRatio, masterCylinderBoreIn: mcBore, caliperPistonAreaIn2: totalPistonArea, padFriction, effectiveRadiusIn }),
    [pedalForceLb, pedalRatio, mcBore, totalPistonArea, padFriction, effectiveRadiusIn],
  );

  const summary = [
    `${pedalForceLb}lb pedal, ${pedalRatio}:1 ratio, ${mcBore}" MC, pistons ${pistonBores.join("+")}", mu ${padFriction}, ${effectiveRadiusIn}" radius`,
    `Line pressure: ${round(chain.linePsi, 0)} psi`,
    `Clamp force: ${round(chain.clampForceLb, 0)} lb`,
    `Torque at the rotor: ${round(chain.torqueLbFt, 0)} lb·ft`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">PEDAL TO ROTOR, THE FULL CHAIN</span>
        <h2 id="calculator-title">Every stage of the hydraulic multiplication</h2>
        <p>
          Pedal force is multiplied by the pedal ratio, converted to hydraulic pressure by the master
          cylinder bore, multiplied again by the caliper pistons into clamp force, and finally converted
          to torque by the pad friction and the rotor&apos;s effective radius.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Pedal force" value={values.pedal ?? DEFAULTS.pedal} onChange={(v) => set("pedal", v)} step={5} min={10} max={300} suffix="lb" />
        <StepField label="Pedal ratio" value={values.ratio ?? DEFAULTS.ratio} onChange={(v) => set("ratio", v)} step={0.1} min={2} max={8} hint="Pedal-to-pushrod mechanical advantage" />
        <StepField label="Master cylinder bore" value={values.mc ?? DEFAULTS.mc} onChange={(v) => set("mc", v)} step={0.0625} min={0.5} max={1.5} suffix="in" />
      </div>

      <div className="tool-inputs triple">
        <label className="tool-field">
          <span className="tool-field-label">Caliper piston bores</span>
          <span className="tool-field-input">
            <input value={values.pistons ?? DEFAULTS.pistons} onChange={(e) => set("pistons", e.target.value)} autoComplete="off" />
          </span>
          <small>Comma-separated, inches — e.g. 1.75,1.75 for a twin-piston caliper</small>
        </label>
        <StepField label="Pad friction coefficient" value={values.mu ?? DEFAULTS.mu} onChange={(v) => set("mu", v)} step={0.02} min={0.25} max={0.6} hint="0.35-0.45 is typical for street compounds" />
        <StepField label="Effective rotor radius" value={values.radius ?? DEFAULTS.radius} onChange={(v) => set("radius", v)} step={0.1} min={2} max={9} suffix="in" hint="Centre of rotor to centre of pad contact" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Line pressure" value={`${round(chain.linePsi, 0)} psi`} note={`From ${round(chain.pushrodForceLb, 0)} lb pushrod force`} tone="good" />
        <Metric label="Clamp force" value={`${round(chain.clampForceLb, 0)} lb`} note={`Across ${round(totalPistonArea, 2)} in² of piston`} />
        <Metric label="Friction force" value={`${round(chain.frictionForceLb, 0)} lb`} note="Both pad faces" />
        <Metric label="Torque at the rotor" value={`${round(chain.torqueLbFt, 0)} lb·ft`} note="Per wheel" tone="good" />
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Comparing this torque against the front axle to check bias?{" "}
        <Link href={`/tools/brake-bias-calculator?front=${round(chain.torqueLbFt, 0)}`}>
          The brake bias calculator
        </Link>{" "}
        takes torque from both axles.
      </p>
    </section>
  );
}
