"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { shockTravelForWheelTravel, wheelTravelFromShockTravel } from "../suspension-math";
import { round } from "../tire-math";

const DEFAULTS = { solve: "wheel", shock: "3.0", wheel: "5.0", motion: "0.6" };

export function WheelTravelCalculator() {
  const { values, set, reset } = useToolState("wheel-travel", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const shockTravel = Number(values.shock ?? DEFAULTS.shock) || 0;
  const wheelTravel = Number(values.wheel ?? DEFAULTS.wheel) || 0;
  const motionRatio = Number(values.motion ?? DEFAULTS.motion) || 0;

  const solvedWheelTravel = useMemo(() => wheelTravelFromShockTravel(shockTravel, motionRatio), [shockTravel, motionRatio]);
  const solvedShockTravel = useMemo(() => shockTravelForWheelTravel(wheelTravel, motionRatio), [wheelTravel, motionRatio]);

  const summary =
    solve === "wheel"
      ? `${shockTravel}" shock travel, ${motionRatio} motion ratio -> ${round(solvedWheelTravel, 2)}" wheel travel`
      : `${wheelTravel}" target wheel travel, ${motionRatio} motion ratio -> ${round(solvedShockTravel, 2)}" shock travel needed`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SOLVE EITHER DIRECTION</span>
        <h2 id="calculator-title">Wheel travel from shock travel, or the reverse</h2>
        <p>
          A shock&apos;s stroke and the wheel&apos;s actual travel are rarely the same number — the
          suspension&apos;s motion ratio scales one into the other. Solve for whichever you don&apos;t
          already have.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        <button type="button" className={solve === "wheel" ? "active" : ""} onClick={() => set("solve", "wheel")}>
          Solve for wheel travel
        </button>
        <button type="button" className={solve === "shock" ? "active" : ""} onClick={() => set("solve", "shock")}>
          Solve for shock travel
        </button>
      </div>

      <div className="tool-inputs triple">
        {solve === "wheel" ? (
          <StepField label="Shock travel" value={values.shock ?? DEFAULTS.shock} onChange={(v) => set("shock", v)} step={0.1} min={1} max={10} suffix="in" />
        ) : (
          <StepField label="Target wheel travel" value={values.wheel ?? DEFAULTS.wheel} onChange={(v) => set("wheel", v)} step={0.1} min={1} max={16} suffix="in" />
        )}
        <StepField label="Motion ratio" value={values.motion ?? DEFAULTS.motion} onChange={(v) => set("motion", v)} step={0.01} min={0.3} max={1.5} hint="Wheel travel ÷ spring/shock travel" />
      </div>

      <div className="tool-metrics wide">
        {solve === "wheel" ? (
          <Metric label="Wheel travel" value={`${round(solvedWheelTravel, 2)}"`} note="From shock travel ÷ motion ratio" tone="good" />
        ) : (
          <Metric label="Shock travel needed" value={`${round(solvedShockTravel, 2)}"`} note="Target wheel travel × motion ratio" tone="good" />
        )}
        <Metric label="Motion ratio" value={motionRatio.toString()} note="Below 1.0 amplifies wheel travel" />
        <Metric label="Amplification" value={`${round(1 / motionRatio, 2)}×`} note="Wheel movement per unit shock movement" />
        <Metric label="Entered value" value={`${solve === "wheel" ? shockTravel : wheelTravel}"`} note={solve === "wheel" ? "Shock travel" : "Target wheel travel"} />
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
