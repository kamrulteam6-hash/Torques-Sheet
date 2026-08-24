"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { convertPressure } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { psi: "32" };

const COMMON = [
  { kpa: 180, use: "Small car, low placard" },
  { kpa: 220, use: "Typical passenger car placard" },
  { kpa: 250, use: "Loaded or performance placard" },
  { kpa: 300, use: "Light truck / SUV placard" },
  { kpa: 350, use: "Heavy load or towing placard" },
  { kpa: 550, use: "Light truck sidewall maximum (LT-metric)" },
];

export function PsiKpaConverter() {
  const { values, set, reset } = useToolState("psi-kpa", DEFAULTS);
  const [active, setActive] = useState<"psi" | "kpa">("psi");
  const [kpaDraft, setKpaDraft] = useState("");

  const psi = Number(values.psi ?? DEFAULTS.psi) || 0;
  const kpa = convertPressure(psi, "psi", "kPa");

  const psiDisplay = active === "psi" ? (values.psi ?? DEFAULTS.psi) : round(psi, 2).toString();
  const kpaDisplay = active === "kpa" ? kpaDraft : round(kpa, 1).toString();

  const onPsiChange = (v: string) => {
    setActive("psi");
    set("psi", v.replace(/[^\d.]/g, ""));
  };
  const onKpaChange = (v: string) => {
    setActive("kpa");
    const cleaned = v.replace(/[^\d.]/g, "");
    setKpaDraft(cleaned);
    set("psi", String(convertPressure(Number(cleaned) || 0, "kPa", "psi")));
  };

  const summary = `${round(psi, 2)} psi = ${round(kpa, 1)} kPa`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EITHER DIRECTION</span>
        <h2 id="calculator-title">Convert psi and kPa</h2>
        <p>
          Type into either field. One psi is exactly 6.894757 kilopascals — kPa is the SI pressure unit,
          and appears on many import vehicle placards and workshop compressor gauges.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field label="PSI" value={psiDisplay} onChange={onPsiChange} inputMode="decimal" suffix="psi" />
        <Field label="kPa" value={kpaDisplay} onChange={onKpaChange} inputMode="decimal" suffix="kPa" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="PSI" value={round(psi, 2).toString()} note="pounds per square inch" tone="good" />
        <Metric label="kPa" value={round(kpa, 1).toString()} note="kilopascals, SI unit" tone="good" />
        <Metric label="Bar" value={round(convertPressure(psi, "psi", "bar"), 3).toString()} note="100 kPa" />
        <Metric label="atm" value={round(convertPressure(psi, "psi", "atm"), 3).toString()} note="101.325 kPa" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Typical pressure</th>
              <th>kPa</th>
              <th>psi</th>
              <th>Where you see it</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((row) => (
              <tr key={row.kpa} className={Math.abs(row.kpa - kpa) < 5 ? "row-active" : undefined}>
                <th>{row.kpa} kPa</th>
                <td>{row.kpa}</td>
                <td>{round(convertPressure(row.kpa, "kPa", "psi"), 1)}</td>
                <td>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Checking against your vehicle&apos;s placard?{" "}
        <Link href="/tools/tire-pressure-converter">The full pressure converter</Link> covers all five
        units at once and flags under-inflation against FMVSS 138.
      </p>
    </section>
  );
}
