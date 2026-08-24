"use client";

import { useMemo } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { BOLT_GRADES, K_FACTOR_PRESETS, boltTorque, mmPitchToTpi } from "../bolt-math";
import { round } from "../tire-math";

const DEFAULTS = { diameter: "10", pitch: "1.5", grade: "sae5", k: "0.2" };

export function BoltTorqueCalculator() {
  const { values, set, reset } = useToolState("bolt-torque", DEFAULTS);
  const diameterMm = Number(values.diameter ?? DEFAULTS.diameter) || 0;
  const pitchMm = Number(values.pitch ?? DEFAULTS.pitch) || 0;
  const gradeKey = values.grade ?? DEFAULTS.grade;
  const k = Number(values.k ?? DEFAULTS.k) || 0;

  const grade = BOLT_GRADES.find((g) => g.key === gradeKey) ?? BOLT_GRADES[1];

  const result = useMemo(
    () => boltTorque({ diameterMm, pitchMm, proofMpa: grade.proofMpa, k }),
    [diameterMm, pitchMm, grade.proofMpa, k],
  );

  const summary = [
    `M${diameterMm}x${pitchMm}, ${grade.label}, K=${k}`,
    `Target clamp load: ${round(result.clampLoadLbf, 0)} lbf (${round(result.clampLoadN, 0)} N)`,
    `Estimated torque: ${round(result.torqueLbFt, 1)} lb·ft (${round(result.torqueNm, 1)} Nm)`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">T = K × D × P</span>
        <h2 id="calculator-title">Starting torque from bolt grade and friction</h2>
        <p>
          A tightening torque estimate from the bolt&apos;s size, its grade (which sets proof strength),
          and the friction condition of the threads and underhead surface. This is a starting point for
          an unspecified fastener — a manufacturer&apos;s own torque spec always takes priority.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Nominal diameter" value={values.diameter ?? DEFAULTS.diameter} onChange={(v) => set("diameter", v)} step={0.5} min={3} max={24} suffix="mm" />
        <StepField label="Thread pitch" value={values.pitch ?? DEFAULTS.pitch} onChange={(v) => set("pitch", v)} step={0.05} min={0.5} max={3} suffix="mm" />
        <label className="tool-field">
          <span className="tool-field-label">Bolt grade</span>
          <span className="tool-field-input">
            <select value={gradeKey} onChange={(e) => set("grade", e.target.value)} className="tool-select">
              {BOLT_GRADES.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <div className="quick-sizes">
        <small>Friction condition (K-factor)</small>
        {K_FACTOR_PRESETS.map((preset) => (
          <button type="button" key={preset.key} className={String(preset.k) === values.k ? "active" : ""} onClick={() => set("k", String(preset.k))}>
            {preset.label} ({preset.k})
          </button>
        ))}
      </div>

      <div className="tool-metrics wide">
        <Metric label="Estimated torque" value={`${round(result.torqueLbFt, 1)} lb·ft`} note={`${round(result.torqueNm, 1)} Nm`} tone="good" />
        <Metric label="Target clamp load" value={`${round(result.clampLoadLbf, 0)} lbf`} note={`${round(result.clampLoadN, 0)} N`} tone="good" />
        <Metric label="Threads per inch" value={round(mmPitchToTpi(pitchMm), 1).toString()} note="Equivalent TPI" />
        <Metric label="Proof strength" value={`${grade.proofMpa} MPa`} note={`${grade.proofPsi.toLocaleString()} psi`} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>K-factor</th>
              <th>Condition</th>
              <th>Estimated torque</th>
            </tr>
          </thead>
          <tbody>
            {K_FACTOR_PRESETS.map((preset) => {
              const r = boltTorque({ diameterMm, pitchMm, proofMpa: grade.proofMpa, k: preset.k });
              return (
                <tr key={preset.key} className={preset.k === k ? "row-active" : undefined}>
                  <th>{preset.k}</th>
                  <td>{preset.label}</td>
                  <td>{round(r.torqueLbFt, 1)} lb·ft</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
