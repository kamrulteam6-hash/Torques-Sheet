"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { boreForDisplacement, displacement, strokeForDisplacement } from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = { solve: "bore", displacement: "350", bore: "4", stroke: "3.48", cyl: "8" };

const SOLVE_OPTIONS = [
  { key: "bore", label: "Solve for bore" },
  { key: "stroke", label: "Solve for stroke" },
  { key: "check", label: "Check a combination" },
];

export function BoreStrokeCalculator() {
  const { values, set, reset } = useToolState("bore-stroke", DEFAULTS);
  const solve = values.solve ?? DEFAULTS.solve;
  const targetCi = Number(values.displacement ?? DEFAULTS.displacement) || 0;
  const bore = Number(values.bore ?? DEFAULTS.bore) || 0;
  const stroke = Number(values.stroke ?? DEFAULTS.stroke) || 0;
  const cyl = Math.round(Number(values.cyl ?? DEFAULTS.cyl)) || 0;

  const solvedBore = useMemo(() => boreForDisplacement(targetCi, stroke, cyl), [targetCi, stroke, cyl]);
  const solvedStroke = useMemo(() => strokeForDisplacement(targetCi, bore, cyl), [targetCi, bore, cyl]);
  const checkResult = useMemo(() => displacement(bore, stroke, cyl), [bore, stroke, cyl]);

  const effectiveBore = solve === "bore" ? solvedBore : bore;
  const effectiveStroke = solve === "stroke" ? solvedStroke : stroke;
  const ratio = effectiveStroke > 0 ? effectiveBore / effectiveStroke : 0;
  const character = ratio > 1.02 ? "oversquare" : ratio < 0.98 ? "undersquare" : "square";

  const summary =
    solve === "bore"
      ? `${targetCi} ci target, ${stroke}" stroke, ${cyl} cyl → bore = ${round(solvedBore, 3)}"`
      : solve === "stroke"
        ? `${targetCi} ci target, ${bore}" bore, ${cyl} cyl → stroke = ${round(solvedStroke, 3)}"`
        : `${bore}" bore × ${stroke}" stroke × ${cyl} cyl = ${round(checkResult.totalCi, 1)} ci`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">SOLVE EITHER DIRECTION</span>
        <h2 id="calculator-title">Bore, stroke or displacement — solve for the one you need</h2>
        <p>
          Displacement, bore and stroke are locked together by one formula. Most calculators only go
          forward — bore and stroke to displacement. This also solves backwards: give it a target
          displacement and a fixed stroke, and it finds the bore that hits it, or vice versa.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose what to solve for">
        {SOLVE_OPTIONS.map((option) => (
          <button type="button" key={option.key} className={solve === option.key ? "active" : ""} onClick={() => set("solve", option.key)}>
            {option.label}
          </button>
        ))}
      </div>

      {solve !== "check" && (
        <div className="tool-inputs single">
          <StepField label="Target displacement" value={values.displacement ?? DEFAULTS.displacement} onChange={(v) => set("displacement", v)} step={5} min={50} max={1000} suffix="ci" />
        </div>
      )}

      <div className="tool-inputs triple">
        {solve !== "bore" && (
          <StepField label="Bore" value={values.bore ?? DEFAULTS.bore} onChange={(v) => set("bore", v)} step={0.005} min={1} max={7} suffix="in" />
        )}
        {solve !== "stroke" && (
          <StepField label="Stroke" value={values.stroke ?? DEFAULTS.stroke} onChange={(v) => set("stroke", v)} step={0.01} min={1} max={7} suffix="in" />
        )}
        <StepField label="Cylinders" value={values.cyl ?? DEFAULTS.cyl} onChange={(v) => set("cyl", v)} step={1} min={1} max={16} suffix="cyl" />
      </div>

      <div className="tool-metrics wide">
        {solve === "bore" && (
          <Metric label="Bore required" value={`${round(solvedBore, 3)}"`} note={`${round(solvedBore * 25.4, 1)} mm`} tone="good" />
        )}
        {solve === "stroke" && (
          <Metric label="Stroke required" value={`${round(solvedStroke, 3)}"`} note={`${round(solvedStroke * 25.4, 1)} mm`} tone="good" />
        )}
        {solve === "check" && (
          <Metric label="Displacement" value={`${round(checkResult.totalCi, 1)} ci`} note={`${round(checkResult.totalLitres, 2)} L`} tone="good" />
        )}
        <Metric label="Bore / stroke ratio" value={round(ratio, 3).toFixed(3)} note={character} />
        <Metric label="Bore" value={`${round(effectiveBore, 3)}"`} note={`${round(effectiveBore * 25.4, 1)} mm`} />
        <Metric label="Stroke" value={`${round(effectiveStroke, 3)}"`} note={`${round(effectiveStroke * 25.4, 1)} mm`} />
      </div>

      {solve !== "check" && (
        <div className="table-scroll">
          <table className="diagnostic-table">
            <thead>
              <tr>
                <th>If {solve === "bore" ? "stroke" : "bore"} were</th>
                <th>Required {solve === "bore" ? "bore" : "stroke"}</th>
                <th>Bore/stroke ratio</th>
              </tr>
            </thead>
            <tbody>
              {(solve === "bore" ? [3.0, 3.25, 3.48, 3.75, 4.0] : [3.5, 3.75, 4.0, 4.25, 4.5]).map((v) => {
                const solved = solve === "bore" ? boreForDisplacement(targetCi, v, cyl) : strokeForDisplacement(targetCi, v, cyl);
                const r = solve === "bore" ? solved / v : v / solved;
                return (
                  <tr key={v} className={Math.abs(v - (solve === "bore" ? stroke : bore)) < 0.01 ? "row-active" : undefined}>
                    <th>{v.toFixed(2)}&quot;</th>
                    <td>{round(solved, 3)}&quot;</td>
                    <td>{round(r, 3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Building compression to match?{" "}
        <Link
          href={`/tools/compression-ratio-calculator?bore=${round(effectiveBore, 3)}&stroke=${round(effectiveStroke, 3)}`}
        >
          Carry these figures into the compression ratio calculator
        </Link>
        .
      </p>
    </section>
  );
}
