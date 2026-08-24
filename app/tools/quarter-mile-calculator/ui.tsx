"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { TRACTION_PRESETS, dragEstimate } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { weight: "3500", hp: "300", drive: "rwd" };

export function QuarterMileCalculator() {
  const { values, set, reset } = useToolState("quarter-mile", DEFAULTS);
  const weight = Number(values.weight ?? DEFAULTS.weight) || 0;
  const hp = Number(values.hp ?? DEFAULTS.hp) || 0;
  const driveKey = values.drive ?? DEFAULTS.drive;
  const preset = TRACTION_PRESETS.find((p) => p.key === driveKey) ?? TRACTION_PRESETS[2];

  const result = useMemo(
    () => dragEstimate({ weightLb: weight, hp, efficiency: preset.efficiency }),
    [weight, hp, preset.efficiency],
  );

  const summary = [
    `${weight} lb, ${hp} hp, ${preset.label}`,
    `Quarter mile ET (Hale): ${round(result.etHale, 2)} s`,
    `Trap speed: ${round(result.trapSpeed, 1)} mph`,
    `0-60 estimate: ${round(result.zeroToSixty, 2)} s`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EMPIRICAL FORMULAS, NOT A SIMULATION</span>
        <h2 id="calculator-title">Estimate ET, trap speed and 0–60</h2>
        <p>
          Enter weight with a driver and crank horsepower. The quarter-mile figures use the Hale formula,
          fitted against decades of real timeslips. Treat every result here as a range to expect, not a
          number to bet on.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField
          label="Weight"
          value={values.weight ?? DEFAULTS.weight}
          onChange={(v) => set("weight", v)}
          step={25}
          min={1500}
          max={9000}
          suffix="lb"
          hint="With driver and a full tank"
        />
        <StepField
          label="Power"
          value={values.hp ?? DEFAULTS.hp}
          onChange={(v) => set("hp", v)}
          step={5}
          min={30}
          max={1500}
          suffix="hp"
          hint="Crank horsepower"
        />
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose drivetrain and launch traction">
        {TRACTION_PRESETS.map((p) => (
          <button type="button" key={p.key} className={driveKey === p.key ? "active" : ""} onClick={() => set("drive", p.key)}>
            {p.label}
          </button>
        ))}
      </div>
      <p className="tool-next">{preset.note} — this only affects the 0–60 estimate, not ET or trap speed.</p>

      <Verdict
        tone="warn"
        headline={`Hale estimate: ${round(result.etHale, 2)}s @ ${round(result.trapSpeed, 1)} mph`}
        detail="These formulas were fitted to real drag-strip results, but they know nothing about your specific car's launch, tires, gearing or the surface it runs on. Trap speed is the more trustworthy of the two figures, because it depends far less on driver technique than elapsed time does."
      />

      <div className="tool-metrics wide">
        <Metric label="Quarter-mile ET (Hale)" value={`${round(result.etHale, 2)}s`} note="Fitted to modern data" tone="good" />
        <Metric label="Trap speed" value={`${round(result.trapSpeed, 1)} mph`} note="Less sensitive to launch technique" tone="good" />
        <Metric label="0-60 mph (estimate)" value={`${round(result.zeroToSixty, 2)}s`} note={`Energy method, ${preset.label.toLowerCase()}`} />
        <Metric label="ET (older Fox formula)" value={`${round(result.etFox, 2)}s`} note="For comparison — Hale is the primary figure" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Drivetrain / traction</th>
              <th>0–60 estimate</th>
              <th>Assumed efficiency</th>
            </tr>
          </thead>
          <tbody>
            {TRACTION_PRESETS.map((p) => {
              const est = dragEstimate({ weightLb: weight, hp, efficiency: p.efficiency });
              return (
                <tr key={p.key} className={p.key === driveKey ? "row-active" : undefined}>
                  <th>{p.label}</th>
                  <td>{round(est.zeroToSixty, 2)}s</td>
                  <td>{round(p.efficiency * 100, 0)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Not sure what power figure to use?{" "}
        <Link href={`/tools/power-to-weight-calculator?weight=${weight}&hp=${hp}`}>
          Check the power-to-weight ratio first
        </Link>
        .
      </p>
    </section>
  );
}
