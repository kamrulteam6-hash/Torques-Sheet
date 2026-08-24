"use client";

import { useMemo, useState } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { LOAD_INDEX_TABLE, loadIndexCapacity, loadIndexForCapacityLbs } from "../tire-id-math";

const DEFAULTS = { index: "91", target: "1500" };

export function TireLoadIndexCalculator() {
  const { values, set, reset } = useToolState("load-index", DEFAULTS);
  const [mode, setMode] = useState<"decode" | "find">("decode");
  const index = Math.round(Number(values.index ?? DEFAULTS.index)) || 0;
  const targetLbs = Number(values.target ?? DEFAULTS.target) || 0;

  const decoded = useMemo(() => loadIndexCapacity(index), [index]);
  const found = useMemo(() => loadIndexForCapacityLbs(targetLbs), [targetLbs]);

  const summary =
    mode === "decode"
      ? decoded
        ? `Load index ${index} = ${decoded.lbs} lbs / ${decoded.kg} kg per tire`
        : `Load index ${index} is not in the standard 60-126 table`
      : `Target ${targetLbs} lbs per tire -> minimum load index ${found.index} (${found.lbs} lbs)`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">THE FULL PUBLISHED TABLE, 60-126</span>
        <h2 id="calculator-title">Decode a load index, or find the one you need</h2>
        <p>
          The two- or three-digit number after a tire size — 91 in 225/65R91 — is not arbitrary. It maps
          to a specific maximum load capacity per tire, set by a standards table rather than a formula.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Choose a direction">
        <button type="button" className={mode === "decode" ? "active" : ""} onClick={() => setMode("decode")}>
          Decode an index
        </button>
        <button type="button" className={mode === "find" ? "active" : ""} onClick={() => setMode("find")}>
          Find the index I need
        </button>
      </div>

      <div className="tool-inputs single">
        {mode === "decode" ? (
          <StepField label="Load index" value={values.index ?? DEFAULTS.index} onChange={(v) => set("index", v)} step={1} min={60} max={126} />
        ) : (
          <StepField label="Target load per tire" value={values.target ?? DEFAULTS.target} onChange={(v) => set("target", v)} step={25} min={250} max={3800} suffix="lbs" />
        )}
      </div>

      {mode === "decode" && decoded && (
        <div className="tool-metrics wide">
          <Metric label="Load index" value={String(index)} note="Sidewall figure" tone="good" />
          <Metric label="Max load (lbs)" value={`${decoded.lbs} lbs`} note="Per tire, at max pressure" tone="good" />
          <Metric label="Max load (kg)" value={`${decoded.kg} kg`} note="Per tire, at max pressure" />
          <Metric label="Four-tire total" value={`${decoded.lbs * 4} lbs`} note="Not the same as vehicle GVWR" />
        </div>
      )}

      {mode === "find" && (
        <div className="tool-metrics wide">
          <Metric label="Minimum load index" value={String(found.index)} note="First index at or above target" tone="good" />
          <Metric label="Actual capacity" value={`${found.lbs} lbs`} note={`${found.kg} kg`} tone="good" />
          <Metric label="Margin over target" value={`${found.lbs - targetLbs} lbs`} note="Headroom above the target" />
        </div>
      )}

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Load index</th>
              <th>lbs</th>
              <th>kg</th>
            </tr>
          </thead>
          <tbody>
            {LOAD_INDEX_TABLE.filter((row) => row.index >= (mode === "decode" ? index - 4 : found.index - 4) && row.index <= (mode === "decode" ? index + 4 : found.index + 4)).map((row) => (
              <tr key={row.index} className={row.index === (mode === "decode" ? index : found.index) ? "row-active" : undefined}>
                <th>{row.index}</th>
                <td>{row.lbs}</td>
                <td>{row.kg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
