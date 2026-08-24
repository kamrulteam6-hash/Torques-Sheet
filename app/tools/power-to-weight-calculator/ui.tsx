"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { powerToWeight } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { weight: "3500", hp: "300" };

const REFERENCE_POINTS = [
  { label: "Typical family sedan", hpPerTon: 100 },
  { label: "Sporty hatchback", hpPerTon: 140 },
  { label: "Quick sports sedan", hpPerTon: 180 },
  { label: "Serious sports car", hpPerTon: 250 },
  { label: "Supercar territory", hpPerTon: 350 },
  { label: "Formula 1 car (approx.)", hpPerTon: 1500 },
];

export function PowerToWeightCalculator() {
  const { values, set, reset } = useToolState("power-weight", DEFAULTS);
  const weight = Number(values.weight ?? DEFAULTS.weight) || 0;
  const hp = Number(values.hp ?? DEFAULTS.hp) || 0;

  const result = useMemo(() => powerToWeight(weight, hp), [weight, hp]);

  const nearest = REFERENCE_POINTS.reduce((best, point) =>
    Math.abs(point.hpPerTon - result.hpPerTon) < Math.abs(best.hpPerTon - result.hpPerTon) ? point : best,
  );

  const summary = [
    `${weight} lb, ${hp} hp`,
    `${round(result.hpPerTon, 1)} hp/ton`,
    `${round(result.poundsPerHp, 2)} lb per hp`,
    `${round(result.wattsPerKg, 1)} W/kg`,
    `${round(result.kwPerTonne, 1)} kW/tonne`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EVERY UNIT AT ONCE</span>
        <h2 id="calculator-title">Power to weight, in the unit you need</h2>
        <p>
          Enter weight with a driver aboard and power at the crank. The figure moves in whichever unit
          your source material uses — hp/ton in American road tests, W/kg in the metric world, kW/tonne
          on European spec sheets.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField
          label="Weight"
          value={values.weight ?? DEFAULTS.weight}
          onChange={(v) => set("weight", v)}
          step={25}
          min={1000}
          max={9000}
          suffix="lb"
          hint="Curb weight plus driver, not the spec-sheet dry weight"
        />
        <StepField
          label="Power"
          value={values.hp ?? DEFAULTS.hp}
          onChange={(v) => set("hp", v)}
          step={5}
          min={30}
          max={1500}
          suffix="hp"
          hint="At the crank — this is what specification sheets quote"
        />
      </div>

      <div className="tool-metrics wide">
        <Metric label="hp per ton" value={round(result.hpPerTon, 1).toString()} note="2000 lb per ton" tone="good" />
        <Metric label="lb per hp" value={round(result.poundsPerHp, 2).toString()} note="Lower is quicker" />
        <Metric label="W per kg" value={round(result.wattsPerKg, 1).toString()} note="SI equivalent" />
        <Metric label="kW per tonne" value={round(result.kwPerTonne, 1).toString()} note="European spec-sheet unit" />
      </div>

      <p className="tool-next">
        Closest reference point: <b>{nearest.label}</b> sits around {nearest.hpPerTon} hp/ton — this
        vehicle is at {round(result.hpPerTon, 0)}.
      </p>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Typical hp/ton</th>
              <th>Your figure</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE_POINTS.map((point) => (
              <tr key={point.label} className={point === nearest ? "row-active" : undefined}>
                <th>{point.label}</th>
                <td>~{point.hpPerTon}</td>
                <td>{point === nearest ? `${round(result.hpPerTon, 0)}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Want an acceleration estimate from these same figures?{" "}
        <Link href={`/tools/quarter-mile-calculator?weight=${weight}&hp=${hp}`}>
          Run them through the quarter-mile calculator
        </Link>
        .
      </p>
    </section>
  );
}
