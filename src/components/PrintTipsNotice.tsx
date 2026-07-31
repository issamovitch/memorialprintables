"use client";

import { useState } from "react";
/**
 * PrintTipsNotice
 * A small, self-contained notice that reminds users which print-dialog
 * settings to choose for a correct funeral program. Drop it near the
 * Print / Download buttons in the generator page:
 *
 *   <PrintTipsNotice />
 *
 * No external CSS or UI library needed — styles are inline and scoped.
 */
import ImageMagnifier from "@/components/ImageMagnifier";


const tips: { label: string; value: string }[] = [
  { label: "Paper size", value: 'Letter 8.5" × 11"' },
  { label: "Margins", value: "None (or Minimum)" },
  { label: "Two-sided", value: "On — flip on short edge" },
  { label: "Background graphics", value: "On" },
  { label: "Scale", value: "Default (100%)" },
];

export default function PrintTipsNotice() {
  const [open, setOpen] = useState(true);

  return (
    <aside style={styles.card} aria-label="Print settings tips">
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <span style={styles.icon} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v7H6v-7Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h3 style={styles.title}>Before you print</h3>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          style={styles.toggle}
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      {open && (
        <>
          <p style={styles.lead}>
            In the print window, open <strong>More settings</strong> and match these
            so the design prints edge to edge and folds correctly:
          </p>
          <figure style={styles.figure}>
            <ImageMagnifier
                src="/screenshot.png"
                alt="Chrome print dialog showing the paper size set to Letter 8.5 by 11 inches"
                style={styles.img}
                loading="lazy"
                zoom={2.5}
                lensSize={220}
            />
            <figcaption style={styles.caption}>
              Set Paper size to Letter 8.5&quot; × 11&quot;
            </figcaption>
          </figure>
          <ul style={styles.list}>
            {tips.map((t) => (
              <li key={t.label} style={styles.item}>
                <span style={styles.label}>{t.label}</span>
                <span style={styles.value}>{t.value}</span>
              </li>
            ))}
          </ul>
          <p style={styles.foot}>
            Prefer no setup? Use <strong>Download PDF</strong> — it exports the exact
            design, sized and ready to print.
          </p>
        </>
      )}
    </aside>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 420,
    background: "#ffffff",
    border: "1px solid #dde5d8",
    borderRadius: 12,
    padding: "14px 16px",
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    lineHeight: 1.5,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  titleRow: { display: "flex", alignItems: "center", gap: 8 },
  icon: {
    display: "inline-flex"
  },
  title: { margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: "0.01em" },
  toggle: {
    background: "transparent",
    border: "none",
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    padding: "2px 4px",
  },
  lead: { margin: "10px 0 10px", fontSize: 13},
  figure: { margin: "0 0 12px" },
  img: {
    display: "block",
    width: "100%",
    height: "auto",
    borderRadius: 8,
    border: "1px solid #dde5d8",
  },
  caption: {
    marginTop: 6,
    fontSize: 11.5,
    textAlign: "center",
  },
  list: { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 },
  item: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 12,
    fontSize: 13,
    paddingBottom: 6,
    borderBottom: "1px solid #e7ede3",
  },
  label: { color: "#6b756d" },
  value: { fontWeight: 600, color: "#2f3d35", textAlign: "right" },
  foot: {
    margin: "12px 0 0",
    fontSize: 12.5,
    color: "#5b665e",
    background: "#eef3ea",
    borderRadius: 8,
    padding: "8px 10px",
  },
};
