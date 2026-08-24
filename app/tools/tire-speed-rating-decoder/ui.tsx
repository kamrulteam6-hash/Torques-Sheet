"use client";

import { useMemo } from "react";
import { Metric, ShareRow, useToolState } from "../tool-kit";
import { SPEED_RATINGS, speedRating } from "../tire-id-math";

const DEFAULTS = { symbol: "H" };

export function TireSpeedRatingDecoder() {
  const { values, set, reset } = useToolState("speed-rating", DEFAULTS);
  const symbol = (values.symbol ?? DEFAULTS.symbol).toUpperCase();
  const rating = useMemo(() => speedRating(symbol), [symbol]);

  const summary = rating
    ? `Speed rating ${symbol}: ${rating.mph} mph / ${rating.kmh} km/h max sustained speed`
    : `${symbol} is not a standard speed rating letter`;

  return (
    <section className="tool-panel" id="calculator" aria-labelledby="calculator-title">
      <div className="tool-panel-head">
        <span className="kicker">L THROUGH Y, EVERY LETTER</span>
        <h2 id="calculator-title">Decode a tire speed rating</h2>
        <p>
          The letter at the end of a tire size — the H in 225/65R17 <b>98H</b> — names the maximum speed
          the tire is certified to sustain, defined in km/h with the mph figure derived from it.
        </p>
      </div>

      <div className="tool-inputs single">
        <label className="tool-field">
          <span className="tool-field-label">Speed rating letter</span>
          <span className="tool-field-input">
            <select value={symbol} onChange={(e) => set("symbol", e.target.value)} className="tool-select">
              {SPEED_RATINGS.map((r) => (
                <option key={r.symbol} value={r.symbol}>
                  {r.symbol}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>

      <div className="quick-sizes">
        <small>Common ratings</small>
        {["S", "T", "H", "V", "W", "Y"].map((s) => (
          <button type="button" key={s} className={symbol === s ? "active" : ""} onClick={() => set("symbol", s)}>
            {s}
          </button>
        ))}
      </div>

      {rating && (
        <div className="tool-metrics wide">
          <Metric label="Speed rating" value={symbol} note="Sidewall letter" tone="good" />
          <Metric label="Maximum speed (mph)" value={`${rating.mph} mph`} note="Sustained, not momentary" tone="good" />
          <Metric label="Maximum speed (km/h)" value={`${rating.kmh} km/h`} note="The defining figure" />
          <Metric label="Standard used" value="ISO/ETRTO" note="Defined in km/h, mph derived" />
        </div>
      )}

      <div className="table-scroll">
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Letter</th>
              <th>mph</th>
              <th>km/h</th>
            </tr>
          </thead>
          <tbody>
            {SPEED_RATINGS.map((r) => (
              <tr key={r.symbol} className={r.symbol === symbol ? "row-active" : undefined}>
                <th>{r.symbol}</th>
                <td>{r.mph}</td>
                <td>{r.kmh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ShareRow summary={summary} onReset={reset} />
    </section>
  );
}
