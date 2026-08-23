"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import {
  HP_CONSTANT,
  horsepowerFrom,
  hpToKw,
  hpToPs,
  lbftToNm,
  rpmFrom,
  torqueFrom,
} from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = { solve: "hp", hp: "400", tq: "400", rpm: "5252" };

const SOLVE_FOR = [
  { key: "hp", label: "Horsepower" },
  { key: "tq", label: "Torque" },
  { key: "rpm", label: "RPM" },
];

export function PowerCalculator() {
  const { values, set, reset } = useToolState("power", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const hpIn = Number(values.hp ?? DEFAULTS.hp) || 0;
  const tqIn = Number(values.tq ?? DEFAULTS.tq) || 0;
  const rpmIn = Number(values.rpm ?? DEFAULTS.rpm) || 0;

  const { hp, tq, rpm } = useMemo(() => {
    if (solve === "hp") return { hp: horsepowerFrom(tqIn, rpmIn), tq: tqIn, rpm: rpmIn };
    if (solve === "tq") return { hp: hpIn, tq: torqueFrom(hpIn, rpmIn), rpm: rpmIn };
    return { hp: hpIn, tq: tqIn, rpm: rpmFrom(hpIn, tqIn) };
  }, [solve, hpIn, tqIn, rpmIn]);

  const answer = solve === "hp" ? hp : solve === "tq" ? tq : rpm;
  const answerLabel = solve === "hp" ? "Horsepower" : solve === "tq" ? "Torque" : "Engine speed";
  const answerUnit = solve === "hp" ? "hp" : solve === "tq" ? "lb·ft" : "rpm";

  const summary = [
    `${round(hp, 1)} hp @ ${Math.round(rpm)} rpm`,
    `${round(tq, 1)} lb·ft at the same point`,
    `Metric: ${round(hpToKw(hp), 1)} kW, ${round(lbftToNm(tq), 1)} Nm, ${round(hpToPs(hp), 1)} PS`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">ONE FORMULA, THREE UNKNOWNS</span>
        <h2 id="calculator-title">Solve for whichever figure you are missing</h2>
        <p>
          Horsepower, torque and engine speed are locked together by a single relationship. Give the
          calculator any two and it produces the third — there is no separate formula for each.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        {SOLVE_FOR.map((option) => (
          <button
            type="button"
            key={option.key}
            className={solve === option.key ? "active" : ""}
            onClick={() => set("solve", option.key)}
          >
            Solve for {option.label.toLowerCase()}
          </button>
        ))}
      </div>

      <div className="tool-inputs triple">
        {solve !== "hp" && (
          <StepField label="Horsepower" value={values.hp ?? DEFAULTS.hp} onChange={(v) => set("hp", v)} step={5} min={1} max={3000} suffix="hp" />
        )}
        {solve !== "tq" && (
          <StepField label="Torque" value={values.tq ?? DEFAULTS.tq} onChange={(v) => set("tq", v)} step={5} min={1} max={3000} suffix="lb·ft" />
        )}
        {solve !== "rpm" && (
          <StepField label="Engine speed" value={values.rpm ?? DEFAULTS.rpm} onChange={(v) => set("rpm", v)} step={100} min={100} max={12000} suffix="rpm" />
        )}
      </div>

      <div className="tool-metrics wide">
        <Metric label={answerLabel} value={`${round(answer, 1)}`} note={answerUnit} tone="good" />
        <Metric label="Horsepower" value={round(hp, 1).toFixed(1)} note={`${round(hpToKw(hp), 1)} kW · ${round(hpToPs(hp), 1)} PS`} />
        <Metric label="Torque" value={round(tq, 1).toFixed(1)} note={`${round(lbftToNm(tq), 1)} Nm`} />
        <Metric label="Engine speed" value={String(Math.round(rpm))} note="rpm" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Engine speed</th>
              <th>Horsepower at {round(tq, 0)} lb·ft</th>
              <th>Torque needed for {round(hp, 0)} hp</th>
            </tr>
          </thead>
          <tbody>
            {[2000, 3000, 4000, 5252, 6000, 7000].map((speed) => (
              <tr key={speed} className={speed === HP_CONSTANT ? "row-active" : undefined}>
                <th>
                  {speed.toLocaleString()}
                  {speed === HP_CONSTANT ? " (crossover)" : ""}
                </th>
                <td>{round(horsepowerFrom(tq, speed), 1)} hp</td>
                <td>{round(torqueFrom(hp, speed), 1)} lb·ft</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Working out what the engine is turning at a given road speed?{" "}
        <Link href="/tools/gear-ratio-calculator">
          The gear ratio calculator does RPM from axle ratio and tire size
        </Link>
        .
      </p>
    </section>
  );
}
