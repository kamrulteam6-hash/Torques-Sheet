"use client";

import { useState } from "react";
import type { Diagram, SpecValue } from "./chevy350-content";

const ORANGE = "#ff6b00",
  BLUE = "#34a3ff",
  BG = "#070c0f",
  PANEL = "#10191e",
  LINE = "#33454f",
  TEXT = "#f5f7f8",
  MUTED = "#93a4ac";

function box(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r = 16,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
  ctx.stroke();
}
function wrap(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  max: number,
  lineHeight: number,
  maxLines = 3,
) {
  const words = text.split(" ");
  let line = "",
    lines = 0;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max && line) {
      ctx.fillText(line, x, y + lines * lineHeight);
      lines++;
      line = word;
      if (lines === maxLines - 1) break;
    } else line = test;
  }
  if (lines < maxLines) ctx.fillText(line, x, y + lines * lineHeight);
}
function brand(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(72, 54);
  ctx.fillStyle = ORANGE;
  ctx.beginPath();
  ctx.moveTo(28, 0);
  ctx.lineTo(54, 14);
  ctx.lineTo(54, 44);
  ctx.lineTo(28, 59);
  ctx.lineTo(2, 44);
  ctx.lineTo(2, 14);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = BG;
  ctx.beginPath();
  ctx.moveTo(28, 8);
  ctx.lineTo(47, 18);
  ctx.lineTo(47, 40);
  ctx.lineTo(28, 51);
  ctx.lineTo(9, 40);
  ctx.lineTo(9, 18);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = TEXT;
  ctx.font = "800 15px Arial";
  ctx.textAlign = "center";
  ctx.fillText("TS", 28, 35);
  ctx.restore();
  ctx.textAlign = "left";
  ctx.fillStyle = TEXT;
  ctx.font = "800 28px Arial";
  ctx.fillText("TORQUE", 142, 82);
  ctx.fillStyle = ORANGE;
  ctx.fillText("SHEET", 260, 82);
  ctx.fillStyle = MUTED;
  ctx.font = "700 11px monospace";
  ctx.fillText("MECHANICAL REFERENCE", 144, 102);
}
function sequence(
  ctx: CanvasRenderingContext2D,
  diagram: Diagram,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const points = diagram.points,
    cols = Math.min(points.length, 6),
    rows = Math.ceil(points.length / cols),
    gap = 18,
    cellW = Math.min(116, (w - gap * (cols - 1)) / cols),
    cellH = 78,
    totalW = cols * cellW + (cols - 1) * gap,
    startX = x + (w - totalW) / 2,
    startY = y + (h - rows * cellH - (rows - 1) * gap) / 2;
  points.forEach((p, i) => {
    const col = i % cols,
      row = Math.floor(i / cols),
      px = startX + col * (cellW + gap),
      py = startY + row * (cellH + gap);
    if (i < points.length - 1) {
      const ni = i + 1,
        ncol = ni % cols,
        nrow = Math.floor(ni / cols);
      ctx.strokeStyle = "#315061";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(px + cellW / 2, py + cellH / 2);
      ctx.lineTo(
        startX + ncol * (cellW + gap) + cellW / 2,
        startY + nrow * (cellH + gap) + cellH / 2,
      );
      ctx.stroke();
    }
    ctx.fillStyle = i === 0 ? "#44220e" : "#111d23";
    ctx.strokeStyle = i === 0 ? ORANGE : "#426171";
    box(ctx, px, py, cellW, cellH, 12);
    ctx.fillStyle = i === 0 ? ORANGE : BLUE;
    ctx.font = "800 13px monospace";
    ctx.fillText(String(i + 1).padStart(2, "0"), px + 12, py + 21);
    ctx.fillStyle = TEXT;
    ctx.font = "800 17px Arial";
    ctx.textAlign = "center";
    ctx.fillText(p.toUpperCase(), px + cellW / 2, py + 51);
    ctx.textAlign = "left";
  });
}
function wheel(
  ctx: CanvasRenderingContext2D,
  points: string[],
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const cx = x + w / 2,
    cy = y + h / 2,
    r = Math.min(w, h) * 0.32;
  ctx.lineWidth = 34;
  ctx.strokeStyle = "#1a2931";
  ctx.beginPath();
  ctx.arc(cx, cy, r + 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 3;
  ctx.strokeStyle = LINE;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 70, 0, Math.PI * 2);
  ctx.stroke();
  points.forEach((p, i) => {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / points.length,
      px = cx + Math.cos(a) * r,
      py = cy + Math.sin(a) * r;
    ctx.fillStyle = i === 0 ? "#44220e" : "#111d23";
    ctx.strokeStyle = i === 0 ? ORANGE : "#426171";
    ctx.beginPath();
    ctx.arc(px, py, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = TEXT;
    ctx.font = "800 18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(p, px, py + 6);
  });
  ctx.fillStyle = MUTED;
  ctx.font = "800 15px monospace";
  ctx.fillText("STAR", cx, cy - 5);
  ctx.fillText("PATTERN", cx, cy + 16);
  ctx.textAlign = "left";
}
function banks(
  ctx: CanvasRenderingContext2D,
  diagram: Diagram,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const cx = x + w / 2,
    top = y + 38,
    gap = 200,
    cw = 105,
    ch = 58;
  ctx.fillStyle = MUTED;
  ctx.font = "700 12px monospace";
  ctx.textAlign = "center";
  ctx.fillText("FRONT OF ENGINE", cx, top - 13);
  [
    [1, 3, 5, 7],
    [2, 4, 6, 8],
  ].forEach((bank, bi) =>
    bank.forEach((c, i) => {
      const bx = cx + (bi ? gap / 2 : -gap / 2) - cw / 2,
        by = top + i * 68;
      ctx.fillStyle = c === Number(diagram.points[0]) ? "#44220e" : "#111d23";
      ctx.strokeStyle = c === Number(diagram.points[0]) ? ORANGE : "#426171";
      box(ctx, bx, by, cw, ch, 29);
      ctx.fillStyle = TEXT;
      ctx.font = "800 21px Arial";
      ctx.fillText(String(c), bx + cw / 2, by + 37);
    }),
  );
  ctx.fillStyle = "#142127";
  ctx.strokeStyle = LINE;
  box(ctx, cx - 55, top + 65, 110, 150, 18);
  ctx.fillStyle = TEXT;
  ctx.font = "800 25px Arial";
  ctx.fillText("350", cx, top + 135);
  ctx.fillStyle = MUTED;
  ctx.font = "700 12px monospace";
  ctx.fillText("5.7L V8", cx, top + 157);
  const sy = y + h - 92,
    chip = 67,
    total = diagram.points.length * chip + (diagram.points.length - 1) * 8,
    sx = x + (w - total) / 2;
  diagram.points.forEach((p, i) => {
    ctx.fillStyle = i === 0 ? ORANGE : "#142128";
    ctx.strokeStyle = i === 0 ? ORANGE : LINE;
    box(ctx, sx + i * (chip + 8), sy, chip, 50, 8);
    ctx.fillStyle = i === 0 ? BG : TEXT;
    ctx.font = "800 17px Arial";
    ctx.fillText(p, sx + i * (chip + 8) + chip / 2, sy + 32);
  });
  ctx.textAlign = "left";
}
function timing(
  ctx: CanvasRenderingContext2D,
  points: string[],
  x: number,
  y: number,
  w: number,
) {
  ctx.fillStyle = MUTED;
  ctx.font = "700 11px monospace";
  ["TDC", "10°", "20°", "30°", "40°"].forEach((v, i) =>
    ctx.fillText(v, x + (i * w) / 4, y + 20),
  );
  ctx.strokeStyle = LINE;
  ctx.beginPath();
  ctx.moveTo(x, y + 31);
  ctx.lineTo(x + w, y + 31);
  ctx.stroke();
  points.forEach((p, i) => {
    const py = y + 75 + i * 95;
    ctx.fillStyle = i === 0 ? ORANGE : BLUE;
    ctx.fillRect(x, py, (i === 0 ? 0.3 : 0.8) * w, 22);
    ctx.fillStyle = TEXT;
    ctx.font = "800 17px Arial";
    ctx.fillText(p, x, py + 53);
  });
}
function makeAsset(
  title: string,
  diagram: Diagram,
  values: SpecValue[],
  sourceUrl: string,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 1600;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, 1600, 1000);
  ctx.strokeStyle = "#13232b";
  for (let x = 0; x < 1600; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1000);
    ctx.stroke();
  }
  for (let y = 0; y < 1000; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1600, y);
    ctx.stroke();
  }
  brand(ctx);
  ctx.fillStyle = MUTED;
  ctx.font = "700 12px monospace";
  ctx.textAlign = "right";
  ctx.fillText("PRINT-READY TECHNICAL DIAGRAM", 1528, 82);
  ctx.textAlign = "left";
  ctx.fillStyle = TEXT;
  ctx.font = "800 42px Arial";
  wrap(ctx, title, 72, 164, 1040, 48, 2);
  ctx.fillStyle = ORANGE;
  ctx.fillRect(72, 224, 120, 5);
  const dx = 72,
    dy = 265,
    dw = 930,
    dh = 560;
  ctx.fillStyle = "#0b1317";
  ctx.strokeStyle = LINE;
  box(ctx, dx, dy, dw, dh, 18);
  if (diagram.type === "firing" || diagram.type === "valve")
    banks(ctx, diagram, dx + 20, dy + 25, dw - 40, dh - 50);
  else if (diagram.type === "wheel")
    wheel(ctx, diagram.points, dx + 20, dy + 20, dw - 40, dh - 40);
  else if (diagram.type === "timing")
    timing(ctx, diagram.points, dx + 65, dy + 75, dw - 130);
  else sequence(ctx, diagram, dx + 40, dy + 40, dw - 80, dh - 80);
  ctx.fillStyle = PANEL;
  ctx.strokeStyle = LINE;
  box(ctx, 1040, 265, 488, 560, 18);
  ctx.fillStyle = BLUE;
  ctx.font = "800 13px monospace";
  ctx.fillText("KEY SPECIFICATIONS", 1080, 310);
  values.slice(0, 5).forEach((v, i) => {
    const py = 350 + i * 93;
    ctx.fillStyle = MUTED;
    ctx.font = "700 11px monospace";
    ctx.fillText(v.label.toUpperCase(), 1080, py);
    ctx.fillStyle = TEXT;
    ctx.font = "800 22px Arial";
    wrap(ctx, v.value, 1080, py + 30, 405, 27, 2);
    ctx.strokeStyle = "#263840";
    ctx.beginPath();
    ctx.moveTo(1080, py + 65);
    ctx.lineTo(1488, py + 65);
    ctx.stroke();
  });
  ctx.save();
  ctx.globalAlpha = 0.075;
  ctx.translate(790, 545);
  ctx.rotate(-Math.PI / 9);
  ctx.textAlign = "center";
  ctx.fillStyle = TEXT;
  ctx.font = "900 70px Arial";
  ctx.fillText("TORQUESHEET.COM", 0, 0);
  ctx.restore();
  ctx.fillStyle = "#0a1115";
  ctx.fillRect(0, 875, 1600, 125);
  ctx.fillStyle = TEXT;
  ctx.font = "800 18px Arial";
  ctx.fillText("TORQUESHEET.COM", 72, 916);
  ctx.fillStyle = MUTED;
  ctx.font = "600 13px Arial";
  ctx.fillText(
    "Free to republish with visible attribution and a followed link to the source page.",
    72,
    943,
  );
  ctx.fillStyle = BLUE;
  ctx.font = "600 12px monospace";
  ctx.fillText(sourceUrl, 72, 970);
  ctx.textAlign = "right";
  ctx.fillStyle = "#62747d";
  ctx.font = "700 11px monospace";
  ctx.fillText("© TORQUESHEET MECHANICAL REFERENCE", 1528, 941);
  ctx.fillText("VERIFY THE EXACT APPLICATION BEFORE SERVICE", 1528, 965);
  return canvas;
}

function DiagramGraphic({
  diagram,
  active,
  setActive,
}: {
  diagram: Diagram;
  active: number;
  setActive: (i: number) => void;
}) {
  const buttons = diagram.points.map((p, i) => (
    <button
      key={`${p}-${i}`}
      className={active === i ? "diagram-point active" : "diagram-point"}
      onClick={() => setActive(i)}
      aria-label={`Step ${i + 1}: ${p}`}
    >
      <b>{i + 1}</b>
      <span>{p}</span>
    </button>
  ));
  if (diagram.type === "firing" || diagram.type === "valve")
    return (
      <div className={`diagram-graphic ${diagram.type}-graphic`}>
        <div className="engine-front">FRONT OF ENGINE</div>
        <div className="engine-banks">
          <div>
            {[1, 3, 5, 7].map((c) => (
              <span
                key={c}
                className={
                  diagram.points[active] === String(c) ? "active" : undefined
                }
              >
                {c}
              </span>
            ))}
          </div>
          <div className="engine-valley">
            350
            <br />
            <small>5.7L V8</small>
          </div>
          <div>
            {[2, 4, 6, 8].map((c) => (
              <span
                key={c}
                className={
                  diagram.points[active] === String(c) ? "active" : undefined
                }
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="sequence-strip">{buttons}</div>
      </div>
    );
  if (diagram.type === "wheel")
    return (
      <div className="diagram-graphic wheel-graphic">
        <div className="wheel-ring">{buttons}</div>
        <div className="wheel-label">
          5-LUG
          <br />
          <small>STAR PATTERN</small>
        </div>
      </div>
    );
  if (diagram.type === "spark")
    return (
      <div className="diagram-graphic spark-graphic">
        <div className="spark-body">
          <i />
          <i />
          <i />
          <strong>GAP</strong>
        </div>
        <div className="choice-row">{buttons}</div>
      </div>
    );
  if (diagram.type === "timing")
    return (
      <div className="diagram-graphic timing-graphic">
        <div className="degree-scale">
          <span>TDC</span>
          <span>10°</span>
          <span>20°</span>
          <span>30°</span>
          <span>40°</span>
        </div>
        {diagram.points.map((p, i) => (
          <button
            key={p}
            className={active === i ? "timing-bar active" : "timing-bar"}
            onClick={() => setActive(i)}
          >
            <span style={{ width: i === 0 ? "30%" : "80%" }} />
            <b>{p}</b>
          </button>
        ))}
      </div>
    );
  if (diagram.type === "oil" || diagram.type === "rod")
    return (
      <div
        className={`diagram-graphic workflow-graphic ${diagram.type}-graphic`}
      >
        <div className="workflow-line" />
        {buttons}
      </div>
    );
  if (diagram.type === "main")
    return (
      <div className="diagram-graphic main-graphic">
        <div className="crank-line" />
        <div className="cap-grid">{buttons}</div>
      </div>
    );
  return (
    <div className={`diagram-graphic bolt-graphic ${diagram.type}-graphic`}>
      <div className="component-outline" />
      <div className="bolt-grid">{buttons}</div>
    </div>
  );
}

export function SpecVisual({
  diagram,
  values,
  copyText,
}: {
  diagram: Diagram;
  values: SpecValue[];
  copyText: string;
}) {
  const [tab, setTab] = useState<"diagram" | "table" | "checklist">("diagram"),
    [active, setActive] = useState(0),
    [notice, setNotice] = useState("");
  const lines = copyText.split("\n"),
    title = lines[0],
    sourceUrl = (
      lines.find((l) => l.startsWith("Source: ")) ||
      "Source: https://torquesheet.com"
    ).slice(8),
    fileSlug =
      sourceUrl.split("/specs/")[1]?.replaceAll("/", "-") || "torquesheet-spec";
  const notify = (s: string) => {
    setNotice(s);
    setTimeout(() => setNotice(""), 1600);
  };
  const copy = async () => {
    await navigator.clipboard.writeText(copyText);
    notify("Specs copied");
  };
  const png = () => {
    const canvas = makeAsset(title, diagram, values, sourceUrl);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob),
        a = document.createElement("a");
      a.href = url;
      a.download = `${fileSlug}-diagram-torquesheet.png`;
      a.click();
      URL.revokeObjectURL(url);
      notify("PNG downloaded");
    }, "image/png");
  };
  const pdf = async () => {
    const canvas = makeAsset(title, diagram, values, sourceUrl),
      { jsPDF } = await import("jspdf"),
      doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });
    doc.setProperties({
      title: `${title} - TorqueSheet`,
      subject: diagram.caption,
      author: "TorqueSheet",
      creator: "torquesheet.com",
      keywords: `${title}, TorqueSheet, automotive specifications`,
    });
    doc.addImage(
      canvas.toDataURL("image/png"),
      "PNG",
      0,
      0,
      297,
      210,
      undefined,
      "FAST",
    );
    doc.link(12, 193, 273, 10, { url: sourceUrl });
    doc.save(`${fileSlug}-diagram-torquesheet.pdf`);
    notify("PDF downloaded");
  };
  return (
    <section className="visual-module" aria-labelledby="visual-title">
      <div className="visual-head">
        <div>
          <span className="kicker">WORKBENCH VIEW</span>
          <h2 id="visual-title">{diagram.title}</h2>
        </div>
        <div className="visual-actions">
          <button onClick={copy}>Copy specs</button>
          <button className="download-action" onClick={png}>
            ↓ PNG
          </button>
          <button className="download-action" onClick={pdf}>
            ↓ PDF
          </button>
          <button onClick={() => window.print()}>Print</button>
        </div>
      </div>
      <div
        className="visual-tabs"
        role="tablist"
        aria-label="Specification views"
      >
        <button
          className={tab === "diagram" ? "active" : undefined}
          onClick={() => setTab("diagram")}
          role="tab"
          aria-selected={tab === "diagram"}
        >
          Diagram
        </button>
        <button
          className={tab === "table" ? "active" : undefined}
          onClick={() => setTab("table")}
          role="tab"
          aria-selected={tab === "table"}
        >
          Table
        </button>
        <button
          className={tab === "checklist" ? "active" : undefined}
          onClick={() => setTab("checklist")}
          role="tab"
          aria-selected={tab === "checklist"}
        >
          Text view
        </button>
      </div>
      <div className="visual-body">
        {tab === "diagram" && (
          <>
            <DiagramGraphic
              diagram={diagram}
              active={active}
              setActive={setActive}
            />
            <div className="active-readout">
              <small>SELECTED</small>
              <strong>{diagram.points[active]}</strong>
              <span>
                Position {active + 1} of {diagram.points.length}
              </span>
              <button
                onClick={() => setActive((active + 1) % diagram.points.length)}
              >
                Next →
              </button>
            </div>
          </>
        )}
        {tab === "table" && (
          <div className="table-scroll">
            <table className="spec-table visual-table">
              <thead>
                <tr>
                  <th>ITEM</th>
                  <th>VALUE</th>
                  <th>DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {values.map((v) => (
                  <tr key={v.label}>
                    <td>{v.label}</td>
                    <td>{v.value}</td>
                    <td>{v.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "checklist" && (
          <ol className="text-equivalent">
            {diagram.points.map((p, i) => (
              <li key={`${p}-${i}`}>
                <b>{i + 1}</b>
                <span>{p}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
      <div className="download-credit">
        <span className="brand-mini">TS</span>
        <p>
          <strong>Branded downloads included</strong>
          <small>
            PNG and PDF exports carry the TorqueSheet logo, torquesheet.com,
            source-page URL, and republishing attribution request. The PDF
            source link is clickable.
          </small>
        </p>
        {notice && <em role="status">{notice}</em>}
      </div>
      <p className="diagram-caption">{diagram.caption}</p>
    </section>
  );
}
