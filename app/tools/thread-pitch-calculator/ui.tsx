"use client";

import { useState } from "react";
import { Metric, ShareRow, StepField, useToolState } from "../tool-kit";
import { mmPitchToTpi, pitchDiameter, threadLeadAngle, tpiToMmPitch } from "../bolt-math";
import { round } from "../tire-math";

const DEFAULTS = { pitch: "1.5", diameter: "10" };

export function ThreadPitchCalculator() {
  const { values, set, reset } = useToolState("thread-pitch", DEFAULTS);
  const [active, setActive] = useState<"mm" | "tpi">("mm");
  const [tpiDraft, setTpiDraft] = useState("");

  const pitchMm = Number(values.pitch ?? DEFAULTS.pitch) || 0;
  const diameterMm = Number(values.diameter ?? DEFAULTS.diameter) || 0;
  const tpi = mmPitchToTpi(pitchMm);

  const pitchDisplay = active === "mm" ? (values.pitch ?? DEFAULTS.pitch) : round(pitchMm, 3).toString();
  const tpiDisplay = active === "tpi" ? tpiDraft : round(tpi, 2).toString();

  const onPitchChange = (v: string) => {
    setActive("mm");
    set("pitch", v.replace(/[^\d.]/g, ""));
  };
  const onTpiChange = (v: string) => {
    setActive("tpi");
    const cleaned = v.replace(/[^\d.]/g, "");
    setTpiDraft(cleaned);
    set("pitch", String(tpiToMmPitch(Number(cleaned) || 0)));
  };

  const lead = threadLeadAngle(pitchMm, diameterMm);
  const pd = pitchDiameter(diameterMm, pitchMm);

  const summary = [
    `Pitch: ${round(pitchMm, 3)} mm (${round(tpi, 2)} TPI)`,
    `Major diameter: ${diameterMm} mm`,
    `Pitch diameter: ${round(pd, 3)} mm`,
    `Lead angle: ${round(lead, 2)}°`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">PITCH, TPI, AND THE GEOMETRY THEY IMPLY</span>
        <h2 id="calculator-title">Thread pitch, lead angle and pitch diameter</h2>
        <p>
          Pitch and threads-per-inch describe the same spacing in two unit systems. Enter either one, and
          this also works out the lead angle and pitch diameter a given major diameter and pitch imply.
        </p>
      </div>

      <div className="tool-inputs pair">
        <label className="tool-field">
          <span className="tool-field-label">Pitch (mm)</span>
          <span className="tool-field-input">
            <input value={pitchDisplay} onChange={(e) => onPitchChange(e.target.value)} inputMode="decimal" autoComplete="off" />
            <em>mm</em>
          </span>
        </label>
        <label className="tool-field">
          <span className="tool-field-label">Threads per inch (TPI)</span>
          <span className="tool-field-input">
            <input value={tpiDisplay} onChange={(e) => onTpiChange(e.target.value)} inputMode="decimal" autoComplete="off" />
          </span>
        </label>
      </div>

      <div className="tool-inputs single">
        <StepField label="Major diameter" value={values.diameter ?? DEFAULTS.diameter} onChange={(v) => set("diameter", v)} step={0.5} min={2} max={30} suffix="mm" />
      </div>

      <div className="tool-metrics wide">
        <Metric label="Pitch" value={`${round(pitchMm, 3)} mm`} note="Distance between threads" tone="good" />
        <Metric label="Threads per inch" value={round(tpi, 2).toString()} note="TPI" tone="good" />
        <Metric label="Pitch diameter" value={`${round(pd, 3)} mm`} note="Where thread flanks meet" />
        <Metric label="Lead angle" value={`${round(lead, 2)}°`} note="Helix angle of the thread" />
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
