"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { convertPressure } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { psi: "32" };

const COMMON = [
  { psi: 15, use: "Vintage bias-ply tires" },
  { psi: 26, use: "Compact car, front axle" },
  { psi: 32, use: "Typical passenger car placard" },
  { psi: 36, use: "Light truck, unladen" },
  { psi: 44, use: "Sidewall maximum, common passenger tire" },
  { psi: 80, use: "Light truck sidewall maximum (LT-metric)" },
];

export function PsiBarConverter() {
  const { values, set, reset } = useToolState("psi-bar", DEFAULTS);
  // Which field the user is actively typing in — local only, not persisted,
  // because it has no meaning to a reader arriving from a shared link.
  const [active, setActive] = useState<"psi" | "bar">("psi");
  const [barDraft, setBarDraft] = useState("");

  const psi = Number(values.psi ?? DEFAULTS.psi) || 0;
  const bar = convertPressure(psi, "psi", "bar");

  const psiDisplay = active === "psi" ? (values.psi ?? DEFAULTS.psi) : round(psi, 2).toString();
  const barDisplay = active === "bar" ? barDraft : round(bar, 3).toString();

  const onPsiChange = (v: string) => {
    setActive("psi");
    set("psi", v.replace(/[^\d.]/g, ""));
  };
  const onBarChange = (v: string) => {
    setActive("bar");
    const cleaned = v.replace(/[^\d.]/g, "");
    setBarDraft(cleaned);
    set("psi", String(convertPressure(Number(cleaned) || 0, "bar", "psi")));
  };

  const summary = `${round(psi, 2)} psi = ${round(bar, 3)} bar`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EITHER DIRECTION</span>
        <h2 id="calculator-title">Convert psi and bar</h2>
        <p>
          Type into either field — the other updates immediately. One bar is defined as exactly 100,000
          pascals, which works out to 14.5038 psi.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field label="PSI" value={psiDisplay} onChange={onPsiChange} inputMode="decimal" suffix="psi" />
        <Field label="Bar" value={barDisplay} onChange={onBarChange} inputMode="decimal" suffix="bar" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="PSI" value={round(psi, 2).toString()} note="pounds per square inch" tone="good" />
        <Metric label="Bar" value={round(bar, 3).toString()} note="100,000 Pa" tone="good" />
        <Metric label="kPa" value={round(convertPressure(psi, "psi", "kPa"), 1).toString()} note="SI unit" />
        <Metric label="atm" value={round(convertPressure(psi, "psi", "atm"), 3).toString()} note="standard atmosphere" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Typical pressure</th>
              <th>psi</th>
              <th>bar</th>
              <th>Where you see it</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((row) => (
              <tr key={row.psi} className={Math.abs(row.psi - psi) < 0.5 ? "row-active" : undefined}>
                <th>{row.psi} psi</th>
                <td>{row.psi}</td>
                <td>{round(convertPressure(row.psi, "psi", "bar"), 2)}</td>
                <td>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Checking against your vehicle&apos;s placard, or need kPa and kgf/cm² too?{" "}
        <Link href="/tools/tire-pressure-converter">The full pressure converter</Link> covers all five
        units at once and flags under-inflation against FMVSS 138.
      </p>
    </section>
  );
}
