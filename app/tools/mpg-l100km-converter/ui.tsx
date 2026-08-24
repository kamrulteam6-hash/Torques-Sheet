"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { mpgToL100km, l100kmToMpg } from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = { mpg: "30" };

const COMMON = [
  { mpg: 15, use: "Full-size truck, towing" },
  { mpg: 20, use: "Full-size SUV" },
  { mpg: 25, use: "Midsize sedan" },
  { mpg: 35, use: "Compact car" },
  { mpg: 45, use: "Hybrid sedan" },
  { mpg: 55, use: "Efficient hybrid, highway" },
];

export function MpgL100kmConverter() {
  const { values, set, reset } = useToolState("mpg-l100km", DEFAULTS);
  const [active, setActive] = useState<"mpg" | "l100km">("mpg");
  const [l100kmDraft, setL100kmDraft] = useState("");

  const mpg = Number(values.mpg ?? DEFAULTS.mpg) || 0;
  const l100km = mpgToL100km(mpg);

  const mpgDisplay = active === "mpg" ? (values.mpg ?? DEFAULTS.mpg) : round(mpg, 1).toString();
  const l100kmDisplay = active === "l100km" ? l100kmDraft : round(l100km, 2).toString();

  const onMpgChange = (v: string) => {
    setActive("mpg");
    set("mpg", v.replace(/[^\d.]/g, ""));
  };
  const onL100kmChange = (v: string) => {
    setActive("l100km");
    const cleaned = v.replace(/[^\d.]/g, "");
    setL100kmDraft(cleaned);
    set("mpg", String(l100kmToMpg(Number(cleaned) || 0)));
  };

  const summary = `${round(mpg, 1)} MPG = ${round(l100km, 2)} L/100km`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EITHER DIRECTION</span>
        <h2 id="calculator-title">Convert MPG and L/100km</h2>
        <p>
          Type into either field. These are inverse measures of the same thing — one counts distance per
          fuel, the other counts fuel per distance — which is why the same constant, 235.215, converts
          both directions.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field label="MPG (US)" value={mpgDisplay} onChange={onMpgChange} inputMode="decimal" suffix="mpg" />
        <Field label="L/100km" value={l100kmDisplay} onChange={onL100kmChange} inputMode="decimal" suffix="L/100km" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="MPG (US)" value={round(mpg, 1).toString()} note="miles per US gallon" tone="good" />
        <Metric label="L/100km" value={round(l100km, 2).toString()} note="litres per 100 km" tone="good" />
        <Metric label="km per litre" value={round(mpg * 0.425144, 2).toString()} note="an alternative metric figure" />
        <Metric label="MPG (imperial)" value={round(mpg * 1.20095, 1).toString()} note="UK gallon is larger" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Typical economy</th>
              <th>MPG (US)</th>
              <th>L/100km</th>
              <th>Where you see it</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((row) => (
              <tr key={row.mpg} className={Math.abs(row.mpg - mpg) < 1.5 ? "row-active" : undefined}>
                <th>{row.mpg} mpg</th>
                <td>{row.mpg}</td>
                <td>{round(mpgToL100km(row.mpg), 1)}</td>
                <td>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Want cost per mile and trip cost too?{" "}
        <Link href="/tools/fuel-cost-calculator">The MPG and fuel cost calculator</Link> starts from a
        real fill-up and works out what your driving actually costs.
      </p>
    </section>
  );
}
