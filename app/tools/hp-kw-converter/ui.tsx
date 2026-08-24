"use client";

import { useState } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { hpToKw, hpToPs, kwToHp } from "../engine-math";
import { round } from "../tire-math";

const DEFAULTS = { hp: "300" };

const COMMON = [
  { hp: 100, use: "Small economy car" },
  { hp: 200, use: "Midsize sedan, upper trim" },
  { hp: 300, use: "Sports sedan / performance V6" },
  { hp: 450, use: "Muscle car, modern V8" },
  { hp: 700, use: "Supercar territory" },
  { hp: 1000, use: "Hypercar / top-tier EV" },
];

export function HpKwConverter() {
  const { values, set, reset } = useToolState("hp-kw", DEFAULTS);
  const [active, setActive] = useState<"hp" | "kw">("hp");
  const [kwDraft, setKwDraft] = useState("");

  const hp = Number(values.hp ?? DEFAULTS.hp) || 0;
  const kw = hpToKw(hp);

  const hpDisplay = active === "hp" ? (values.hp ?? DEFAULTS.hp) : round(hp, 1).toString();
  const kwDisplay = active === "kw" ? kwDraft : round(kw, 1).toString();

  const onHpChange = (v: string) => {
    setActive("hp");
    set("hp", v.replace(/[^\d.]/g, ""));
  };
  const onKwChange = (v: string) => {
    setActive("kw");
    const cleaned = v.replace(/[^\d.]/g, "");
    setKwDraft(cleaned);
    set("hp", String(kwToHp(Number(cleaned) || 0)));
  };

  const summary = `${round(hp, 1)} hp = ${round(kw, 1)} kW = ${round(hpToPs(hp), 1)} PS`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EITHER DIRECTION, PLUS PS</span>
        <h2 id="calculator-title">Convert horsepower and kilowatts</h2>
        <p>
          Type into either field. One mechanical horsepower is 0.7457 kW exactly. Metric horsepower (PS)
          is shown alongside, because it is a third figure that gets confused with both.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field label="Horsepower (hp)" value={hpDisplay} onChange={onHpChange} inputMode="decimal" suffix="hp" />
        <Field label="Kilowatts (kW)" value={kwDisplay} onChange={onKwChange} inputMode="decimal" suffix="kW" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Horsepower" value={round(hp, 1).toString()} note="mechanical hp, 745.7 W" tone="good" />
        <Metric label="Kilowatts" value={round(kw, 1).toString()} note="SI unit" tone="good" />
        <Metric label="PS (metric hp)" value={round(hpToPs(hp), 1).toString()} note="1.4% larger than hp" />
        <Metric label="Watts" value={Math.round(kw * 1000).toString()} note="kW × 1000" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Typical power</th>
              <th>hp</th>
              <th>kW</th>
              <th>PS</th>
              <th>Where you see it</th>
            </tr>
          </thead>
          <tbody>
            {COMMON.map((row) => (
              <tr key={row.hp} className={Math.abs(row.hp - hp) < 25 ? "row-active" : undefined}>
                <th>{row.hp} hp</th>
                <td>{row.hp}</td>
                <td>{round(hpToKw(row.hp), 0)}</td>
                <td>{round(hpToPs(row.hp), 0)}</td>
                <td>{row.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Need torque and RPM too?{" "}
        <Link href="/tools/horsepower-torque-rpm-calculator">
          The horsepower, torque and RPM calculator
        </Link>{" "}
        solves for any one of the three from the other two.
      </p>
    </section>
  );
}
