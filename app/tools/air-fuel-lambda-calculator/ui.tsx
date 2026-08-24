"use client";

import { useState } from "react";
import { Metric, ShareRow, useToolState } from "../tool-kit";
import { FUELS, afrToLambda, lambdaToAfr } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { fuel: "gasoline", afr: "14.7" };

export function AirFuelLambdaCalculator() {
  const { values, set, reset } = useToolState("afr-lambda", DEFAULTS);
  const fuelKey = values.fuel ?? DEFAULTS.fuel;
  const fuel = FUELS.find((f) => f.key === fuelKey) ?? FUELS[0];

  const [active, setActive] = useState<"afr" | "lambda">("afr");
  const [lambdaDraft, setLambdaDraft] = useState("");

  const afr = Number(values.afr ?? DEFAULTS.afr) || 0;
  const lambda = afrToLambda(afr, fuel.stoichAfr);

  const afrDisplay = active === "afr" ? (values.afr ?? DEFAULTS.afr) : round(afr, 2).toString();
  const lambdaDisplay = active === "lambda" ? lambdaDraft : round(lambda, 3).toString();

  const onAfrChange = (v: string) => {
    setActive("afr");
    set("afr", v.replace(/[^\d.]/g, ""));
  };
  const onLambdaChange = (v: string) => {
    setActive("lambda");
    const cleaned = v.replace(/[^\d.]/g, "");
    setLambdaDraft(cleaned);
    set("afr", String(lambdaToAfr(Number(cleaned) || 0, fuel.stoichAfr)));
  };

  const mixture = lambda < 0.98 ? "rich" : lambda > 1.02 ? "lean" : "at stoichiometric";

  const summary = [
    `Fuel: ${fuel.label} (stoich AFR ${fuel.stoichAfr}:1)`,
    `AFR: ${round(afr, 2)}:1`,
    `Lambda: ${round(lambda, 3)}`,
    `Mixture: ${mixture}`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EITHER DIRECTION, EIGHT FUELS</span>
        <h2 id="calculator-title">Convert AFR and lambda</h2>
        <p>
          Lambda is AFR normalized against a fuel&apos;s own stoichiometric point, which is what makes it
          portable across fuels — lambda 1.0 always means the chemically ideal mixture, whatever the fuel.
          Pick the fuel first, since the same lambda means a different AFR on each one.
        </p>
      </div>

      <div className="tool-inputs single">
        <label className="tool-field">
          <span className="tool-field-label">Fuel</span>
          <span className="tool-field-input">
            <select value={fuelKey} onChange={(e) => set("fuel", e.target.value)} className="tool-select">
              {FUELS.map((f) => (
                <option key={f.key} value={f.key}>
                  {f.label} — {f.stoichAfr}:1 stoich
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <div className="tool-inputs pair">
        <label className="tool-field">
          <span className="tool-field-label">AFR (air-fuel ratio)</span>
          <span className="tool-field-input">
            <input value={afrDisplay} onChange={(e) => onAfrChange(e.target.value)} inputMode="decimal" autoComplete="off" />
            <em>:1</em>
          </span>
        </label>
        <label className="tool-field">
          <span className="tool-field-label">Lambda (λ)</span>
          <span className="tool-field-input">
            <input value={lambdaDisplay} onChange={(e) => onLambdaChange(e.target.value)} inputMode="decimal" autoComplete="off" />
          </span>
        </label>
      </div>

      <div className="tool-metrics wide">
        <Metric label="AFR" value={`${round(afr, 2)}:1`} note={fuel.label} tone="good" />
        <Metric label="Lambda" value={round(lambda, 3).toString()} note="1.0 = stoichiometric" tone="good" />
        <Metric label="Mixture" value={mixture} note={lambda < 1 ? "More fuel than stoich" : lambda > 1 ? "Less fuel than stoich" : "Chemically ideal"} />
        <Metric label="Stoichiometric AFR" value={`${fuel.stoichAfr}:1`} note={`For ${fuel.label}`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Fuel</th>
              <th>Stoichiometric AFR</th>
              <th>AFR at your lambda ({round(lambda, 2)})</th>
            </tr>
          </thead>
          <tbody>
            {FUELS.map((f) => (
              <tr key={f.key} className={f.key === fuelKey ? "row-active" : undefined}>
                <th>{f.label}</th>
                <td>{f.stoichAfr}:1</td>
                <td>{round(lambdaToAfr(lambda, f.stoichAfr), 2)}:1</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
