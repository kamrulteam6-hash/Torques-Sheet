"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Field, Metric, ShareRow, useToolState } from "../tool-kit";
import { TORQUE_UNITS, convertTorque, type TorqueUnit } from "../perf-math";
import { round } from "../tire-math";

const DEFAULTS = { value: "100", from: "N·m" };

const COMMON_SPECS = [
  { label: "Lug nut (passenger car)", lowNm: 90, highNm: 135 },
  { label: "Lug nut (light truck)", lowNm: 135, highNm: 190 },
  { label: "Spark plug", lowNm: 20, highNm: 30 },
  { label: "Oil drain plug", lowNm: 25, highNm: 45 },
  { label: "Head bolt (typical, staged)", lowNm: 60, highNm: 110 },
];

export function TorqueConverter() {
  const { values, set, reset } = useToolState("torque", DEFAULTS);
  const value = Number(values.value ?? DEFAULTS.value) || 0;
  const from = (values.from ?? DEFAULTS.from) as TorqueUnit;

  const results = useMemo(
    () => TORQUE_UNITS.map((unit) => ({ unit, value: convertTorque(value, from, unit) })),
    [value, from],
  );

  const summary = [
    `${value} ${from}`,
    ...results.filter((r) => r.unit !== from).map((r) => `= ${round(r.value, 3)} ${r.unit}`),
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">FOUR UNITS AT ONCE</span>
        <h2 id="calculator-title">Convert a torque figure</h2>
        <p>
          Enter a value in whichever unit your spec, wrench or manual uses. Every other unit updates
          together, so you never have to convert twice to check a figure both ways.
        </p>
      </div>

      <div className="tool-inputs pair">
        <Field
          label="Value"
          value={values.value ?? DEFAULTS.value}
          onChange={(v) => set("value", v.replace(/[^\d.-]/g, ""))}
          inputMode="decimal"
        />
        <label className="tool-field">
          <span className="tool-field-label">From unit</span>
          <span className="tool-field-input">
            <select value={from} onChange={(e) => set("from", e.target.value)} className="tool-select">
              {TORQUE_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <div className="quick-sizes">
        <small>Jump to a unit</small>
        {TORQUE_UNITS.map((unit) => (
          <button
            type="button"
            key={unit}
            className={unit === from ? "active" : ""}
            onClick={() => set("from", unit)}
          >
            {unit}
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        {results.map((r) => (
          <Metric
            key={r.unit}
            label={r.unit}
            value={round(r.value, r.value < 10 ? 3 : 2).toString()}
            note={r.unit === from ? "entered value" : "converted"}
            tone={r.unit === from ? "good" : "neutral"}
          />
        ))}
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Typical fastener</th>
              <th>Range (N·m)</th>
              <th>Range (lb·ft)</th>
              <th>Range (lb·in)</th>
            </tr>
          </thead>
          <tbody>
            {COMMON_SPECS.map((spec) => (
              <tr key={spec.label}>
                <th>{spec.label}</th>
                <td>
                  {spec.lowNm}–{spec.highNm}
                </td>
                <td>
                  {round(convertTorque(spec.lowNm, "N·m", "lb·ft"), 0)}–
                  {round(convertTorque(spec.highNm, "N·m", "lb·ft"), 0)}
                </td>
                <td>
                  {round(convertTorque(spec.lowNm, "N·m", "lb·in"), 0)}–
                  {round(convertTorque(spec.highNm, "N·m", "lb·in"), 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Setting a wheel? <Link href="/tools/bolt-pattern-calculator">Confirm the bolt pattern</Link> before
        you torque it down, and check the exact figure on the vehicle&apos;s{" "}
        <Link href="/category/torque-specs">torque specification page</Link>.
      </p>
    </section>
  );
}
