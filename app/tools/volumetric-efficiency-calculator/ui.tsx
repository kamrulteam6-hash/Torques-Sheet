"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { theoreticalAirflowCfm, volumetricEfficiency } from "../fuel-air-math";
import { round } from "../tire-math";

const DEFAULTS = { displacement: "350", rpm: "6000", cfm: "550" };

export function VolumetricEfficiencyCalculator() {
  const { values, set, reset } = useToolState("ve", DEFAULTS);
  const displacementCi = Number(values.displacement ?? DEFAULTS.displacement) || 0;
  const rpm = Number(values.rpm ?? DEFAULTS.rpm) || 0;
  const actualCfm = Number(values.cfm ?? DEFAULTS.cfm) || 0;

  const theoretical = useMemo(() => theoreticalAirflowCfm(displacementCi, rpm), [displacementCi, rpm]);
  const ve = useMemo(() => volumetricEfficiency(actualCfm, displacementCi, rpm), [actualCfm, displacementCi, rpm]);

  const band =
    ve < 75 ? { tone: "warn" as const, label: "Below typical NA range" }
    : ve <= 85 ? { tone: "good" as const, label: "Typical naturally aspirated range" }
    : ve <= 100 ? { tone: "good" as const, label: "Well-tuned naturally aspirated peak" }
    : { tone: "warn" as const, label: "Above 100% — forced induction territory" };

  const summary = [
    `${displacementCi} ci @ ${rpm} rpm, ${actualCfm} CFM actual airflow`,
    `Theoretical 100% VE airflow: ${round(theoretical, 1)} CFM`,
    `Volumetric efficiency: ${round(ve, 1)}%`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">HOW WELL THE CYLINDER ACTUALLY FILLS</span>
        <h2 id="calculator-title">Volumetric efficiency from measured airflow</h2>
        <p>
          VE compares the air an engine actually ingests against the air its displacement alone would
          suggest at that RPM. It is measured, not assumed — enter an airflow figure from a flow bench,
          a MAF-based estimate, or a dyno&apos;s calculated airflow.
        </p>
      </div>

      <div className="tool-inputs triple">
        <StepField label="Displacement" value={values.displacement ?? DEFAULTS.displacement} onChange={(v) => set("displacement", v)} step={5} min={50} max={1000} suffix="ci" />
        <StepField label="Engine speed" value={values.rpm ?? DEFAULTS.rpm} onChange={(v) => set("rpm", v)} step={100} min={500} max={10000} suffix="rpm" />
        <StepField label="Actual airflow" value={values.cfm ?? DEFAULTS.cfm} onChange={(v) => set("cfm", v)} step={5} min={10} max={2000} suffix="CFM" hint="Measured or estimated" />
      </div>

      <Verdict
        tone={band.tone}
        headline={`${round(ve, 1)}% VE — ${band.label}`}
        detail={
          ve > 100
            ? "Volumetric efficiency above 100% means the engine is ingesting more air than its displacement alone predicts at that speed — normal and expected under boost, where the turbo or supercharger is force-feeding the cylinders beyond what atmospheric pressure alone could fill them with."
            : `Naturally aspirated engines typically peak somewhere in the 80-95% range with a well-tuned intake and exhaust, usually around the RPM of peak torque. Falling well below that at a given RPM points at a restriction — intake, exhaust, cam timing, or head flow — rather than anything wrong with the calculation itself.`
        }
      />

      <div className="tool-metrics wide">
        <Metric label="Volumetric efficiency" value={`${round(ve, 1)}%`} note="Actual ÷ theoretical" tone={band.tone} />
        <Metric label="Theoretical 100% VE airflow" value={`${round(theoretical, 1)} CFM`} note={`At ${rpm} rpm`} />
        <Metric label="Actual airflow entered" value={`${actualCfm} CFM`} note="Measured or estimated" />
        <Metric label="Airflow shortfall/surplus" value={`${round(actualCfm - theoretical, 1)} CFM`} note={actualCfm >= theoretical ? "Surplus" : "Shortfall"} />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Engine speed</th>
              <th>Theoretical 100% VE airflow</th>
              <th>Airflow at your VE ({round(ve, 0)}%)</th>
            </tr>
          </thead>
          <tbody>
            {[2000, 3000, 4000, 5000, 6000, 7000].map((r) => {
              const t = theoreticalAirflowCfm(displacementCi, r);
              return (
                <tr key={r} className={r === rpm ? "row-active" : undefined}>
                  <th>{r.toLocaleString()} rpm</th>
                  <td>{round(t, 0)} CFM</td>
                  <td>{round((t * ve) / 100, 0)} CFM</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Sizing a carburetor or throttle body from this figure?{" "}
        <Link href="/tools/engine-displacement-calculator">Confirm your exact displacement</Link> first —
        VE calculations are only as accurate as the displacement figure behind them.
      </p>
    </section>
  );
}
