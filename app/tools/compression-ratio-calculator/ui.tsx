"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Metric, ShareRow, StepField, Verdict, useToolState } from "../tool-kit";
import { compressionRatio } from "../engine-math";
import { round, signed } from "../tire-math";

const DEFAULTS = {
  bore: "4",
  stroke: "3.48",
  chamber: "64",
  gbore: "4.1",
  gthick: "0.041",
  deck: "0.025",
  piston: "0",
};

const BANDS: Record<string, { tone: "good" | "warn" | "bad"; headline: string; detail: string }> = {
  low: {
    tone: "warn",
    headline: "Low compression",
    detail:
      "Below about 8.5:1 the engine will run on anything but gives up efficiency and low-end response. This is normal territory for a boosted build, where the ratio is deliberately kept down to leave room for cylinder pressure. On a naturally aspirated engine it usually means a thick gasket, a large chamber or a dished piston doing more than intended.",
  },
  "pump-friendly": {
    tone: "good",
    headline: "Comfortable on pump fuel",
    detail:
      "Between roughly 8.5:1 and 10.5:1 is where a naturally aspirated engine on regular pump fuel wants to be. There is enough compression for good efficiency and throttle response, with margin against detonation across a range of conditions and fuel quality.",
  },
  premium: {
    tone: "warn",
    headline: "Premium fuel territory",
    detail:
      "Above about 10.5:1 you are relying on higher octane, and on the rest of the build being right — aluminium heads, a camshaft that bleeds off some cylinder pressure at low RPM, and correct ignition timing. Workable, but the margin against detonation is thinner and hot weather will find it.",
  },
  race: {
    tone: "bad",
    headline: "Race fuel or serious control needed",
    detail:
      "Beyond about 12:1 pump fuel is no longer adequate on a naturally aspirated engine. This ratio expects race fuel, ethanol, or knock control good enough to pull timing before damage occurs. Dynamic compression, cam timing and chamber design all matter more than the static figure at this level.",
  },
};

export function CompressionRatioCalculator() {
  const { values, set, reset } = useToolState("compression", DEFAULTS);
  const num = (key: string) => Number(values[key] ?? DEFAULTS[key as keyof typeof DEFAULTS]) || 0;

  // Memoised so the object identity is stable across renders and the result
  // below can depend on it directly rather than on seven separate fields.
  const input = useMemo(
    () => ({
      bore: num("bore"),
      stroke: num("stroke"),
      chamberCc: num("chamber"),
      gasketBore: num("gbore"),
      gasketThickness: num("gthick"),
      deckClearance: num("deck"),
      pistonCc: num("piston"),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.bore, values.stroke, values.chamber, values.gbore, values.gthick, values.deck, values.piston],
  );

  const result = useMemo(() => compressionRatio(input), [input]);

  const band = BANDS[result.band];

  const contributions = [
    { label: "Combustion chamber", cc: result.chamberCc, note: "Cast or machined into the cylinder head" },
    { label: "Head gasket", cc: result.gasketCc, note: `${input.gasketBore}" bore × ${input.gasketThickness}" compressed` },
    { label: "Deck clearance", cc: result.deckCc, note: input.deckClearance >= 0 ? "Piston below the deck at TDC" : "Piston protruding above the deck" },
    { label: "Piston crown", cc: result.pistonCc, note: input.pistonCc > 0 ? "Dish — adds volume" : input.pistonCc < 0 ? "Dome — displaces volume" : "Flat top" },
  ];

  const summary = [
    `${input.bore}" bore × ${input.stroke}" stroke`,
    `Swept volume: ${round(result.sweptCc, 1)} cc per cylinder`,
    `Chamber ${result.chamberCc} cc + gasket ${round(result.gasketCc, 1)} cc + deck ${round(result.deckCc, 1)} cc + piston ${round(result.pistonCc, 1)} cc`,
    `Clearance volume: ${round(result.clearanceCc, 1)} cc`,
    `Static compression ratio: ${round(result.ratio, 2)}:1`,
  ].join("\n");

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">EVERY VOLUME ABOVE THE PISTON</span>
        <h2 id="calculator-title">Static compression, itemised</h2>
        <p>
          Compression ratio compares the cylinder volume at bottom dead centre against the volume left
          at top dead centre. Four separate things make up that second figure, and leaving any of them
          out is why hand calculations come out optimistic.
        </p>
      </div>

      <div className="tool-inputs pair">
        <StepField label="Bore" value={values.bore ?? DEFAULTS.bore} onChange={(v) => set("bore", v)} step={0.005} min={1} max={7} suffix="in" />
        <StepField label="Stroke" value={values.stroke ?? DEFAULTS.stroke} onChange={(v) => set("stroke", v)} step={0.01} min={1} max={7} suffix="in" />
      </div>

      <div className="tool-inputs triple">
        <StepField label="Chamber volume" value={values.chamber ?? DEFAULTS.chamber} onChange={(v) => set("chamber", v)} step={1} min={20} max={140} suffix="cc" hint="From the head casting or a burette check" />
        <StepField label="Gasket bore" value={values.gbore ?? DEFAULTS.gbore} onChange={(v) => set("gbore", v)} step={0.01} min={1} max={7} suffix="in" hint="Usually slightly larger than the bore" />
        <StepField label="Gasket thickness" value={values.gthick ?? DEFAULTS.gthick} onChange={(v) => set("gthick", v)} step={0.001} min={0.01} max={0.15} suffix="in" hint="Compressed, not as supplied" />
      </div>

      <div className="tool-inputs pair">
        <StepField label="Deck clearance" value={values.deck ?? DEFAULTS.deck} onChange={(v) => set("deck", v)} step={0.005} min={-0.1} max={0.2} suffix="in" hint="Positive if the piston sits below the deck at TDC" />
        <StepField label="Piston crown volume" value={values.piston ?? DEFAULTS.piston} onChange={(v) => set("piston", v)} step={1} min={-40} max={40} suffix="cc" hint="Positive for a dish, negative for a dome, zero for flat top" />
      </div>

      <Verdict tone={band.tone} headline={`${round(result.ratio, 2).toFixed(2)}:1 — ${band.headline}`} detail={band.detail} />

      <div className="tool-metrics wide">
        <Metric label="Compression ratio" value={`${round(result.ratio, 2).toFixed(2)}:1`} note="Static, at bottom dead centre" tone={band.tone === "good" ? "good" : band.tone} />
        <Metric label="Swept volume" value={`${round(result.sweptCc, 1)} cc`} note="Per cylinder" />
        <Metric label="Clearance volume" value={`${round(result.clearanceCc, 1)} cc`} note="Everything above the piston at TDC" />
        <Metric label="Effect of ±1 cc" value={`${round(Math.abs(result.ratio - (result.sweptCc + result.clearanceCc + 1) / (result.clearanceCc + 1)), 2)}`} note="How much one cc moves the ratio" />
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Clearance volume component</th>
              <th>Volume</th>
              <th>Share</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((item) => (
              <tr key={item.label}>
                <th>{item.label}</th>
                <td>{signed(item.cc, 1)} cc</td>
                <td>{result.clearanceCc > 0 ? `${round((item.cc / result.clearanceCc) * 100, 0)}%` : "—"}</td>
                <td>{item.note}</td>
              </tr>
            ))}
            <tr className="row-active">
              <th>Total clearance volume</th>
              <td>{round(result.clearanceCc, 1)} cc</td>
              <td>100%</td>
              <td>Divided into the swept volume to give the ratio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>If the gasket were</th>
              <th>Gasket volume</th>
              <th>Compression ratio</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {[0.028, 0.039, 0.041, 0.051, 0.065].map((thickness) => {
              const alt = compressionRatio({ ...input, gasketThickness: thickness });
              return (
                <tr key={thickness} className={Math.abs(thickness - input.gasketThickness) < 0.0005 ? "row-active" : undefined}>
                  <th>{thickness.toFixed(3)}&quot;</th>
                  <td>{round(alt.gasketCc, 1)} cc</td>
                  <td>{round(alt.ratio, 2).toFixed(2)}:1</td>
                  <td>{Math.abs(thickness - input.gasketThickness) < 0.0005 ? "current" : signed(alt.ratio - result.ratio, 2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />

      <p className="tool-next">
        Need the capacity as well?{" "}
        <Link href={`/tools/engine-displacement-calculator?bore=${input.bore}&stroke=${input.stroke}`}>
          Run the same bore and stroke through the displacement calculator
        </Link>
        .
      </p>
    </section>
  );
}
