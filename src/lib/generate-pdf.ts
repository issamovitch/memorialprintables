import jsPDF from "jspdf";
import type { FuneralProgramState, PaperSize } from "./funeral-program-store";

const SIZES: Record<PaperSize, { w: number; h: number }> = {
  letter: { w: 215.9, h: 279.4 },
  a4: { w: 210, h: 297 },
};

const MARGIN = 19.05; // 0.75in in mm

export async function generatePDF(state: FuneralProgramState): Promise<Blob> {
  const { w, h } = SIZES[state.paperSize];
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [w, h],
  });

  const contentW = w - MARGIN * 2;
  let y = MARGIN;

  const pageHeader = () => {
    doc.setFontSize(10);
    doc.setTextColor(110, 110, 115);
    doc.text("MemorialPrintables.com", w / 2, h - MARGIN, {
      align: "center",
    });
  };

  if (state.layout === "bifold") {
    // Front cover
    y = drawCover(doc, state, w, h, MARGIN, contentW);
    pageHeader();

    // Inside left
    doc.addPage([w, h]);
    y = MARGIN;
    doc.setFontSize(12);
    doc.setTextColor(61, 90, 115);
    doc.text("Order of Service", MARGIN, y);
    y += 8;

    state.serviceItems.forEach((item, idx) => {
      if (y > h - MARGIN - 20) return;
      doc.setFontSize(11);
      doc.setTextColor(44, 44, 46);
      doc.text(`${idx + 1}. ${item.title}`, MARGIN + 4, y);
      y += 5;
      if (item.description) {
        doc.setFontSize(9);
        doc.setTextColor(110, 110, 115);
        const lines = doc.splitTextToSize(item.description, contentW - 12);
        doc.text(lines, MARGIN + 8, y);
        y += lines.length * 4 + 2;
      }
      y += 3;
    });
    pageHeader();

    // Inside right
    doc.addPage([w, h]);
    y = MARGIN;
    doc.setFontSize(12);
    doc.setTextColor(61, 90, 115);
    doc.text("Obituary", MARGIN, y);
    y += 8;

    if (state.obituary) {
      doc.setFontSize(10);
      doc.setTextColor(44, 44, 46);
      const lines = doc.splitTextToSize(state.obituary, contentW);
 doc.text(lines, MARGIN, y);
      y += lines.length * 4.5 + 8;
    }

    if (state.pallbearers) {
      if (y < h - MARGIN - 30) {
        doc.setFontSize(12);
        doc.setTextColor(61, 90, 115);
        doc.text("Pallbearers", MARGIN, y);
        y += 7;
        doc.setFontSize(10);
        doc.setTextColor(44, 44, 46);
        const lines = doc.splitTextToSize(state.pallbearers, contentW);
        doc.text(lines, MARGIN, y);
        y += lines.length * 4.5 + 8;
      }
    }
    pageHeader();

    // Back cover
    doc.addPage([w, h]);
    y = MARGIN + 40;

    if (state.poemOrScripture) {
      doc.setFontSize(12);
      doc.setTextColor(61, 90, 115);
      doc.text("In Loving Memory", w / 2, y, { align: "center" });
      y += 10;
      doc.setFontSize(10);
      doc.setTextColor(44, 44, 46);
      const lines = doc.splitTextToSize(
        state.poemOrScripture,
        contentW
      );
      doc.text(lines, w / 2, y, { align: "center" });
      y += lines.length * 4.5 + 10;
    }

    if (state.acknowledgements && y < h - MARGIN - 20) {
      doc.setFontSize(10);
      doc.setTextColor(110, 110, 115);
      const lines = doc.splitTextToSize(
        state.acknowledgements,
        contentW - 20
      );
      doc.text(lines, w / 2, y, { align: "center" });
    }
    pageHeader();

    // Add fold mark for bifold
    for (let p = 0; p < doc.getNumberOfPages(); p++) {
      doc.setPage(p + 1);
      doc.setDrawColor(200, 200, 200);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(w / 2, 0, w / 2, 4);
      doc.line(w / 2, h - 4, w / 2, h);
    }
  } else if (state.layout === "trifold") {
    // Trifold: 3 panels per side, front and back
    const panelW = contentW / 3;

    // Page 1: inside (3 panels)
    // Panel 1 - Order of service
    y = MARGIN;
    doc.setFontSize(11);
    doc.setTextColor(61, 90, 115);
    doc.text("Order of Service", MARGIN, y);
    y += 7;

    state.serviceItems.forEach((item, idx) => {
      if (y > h - MARGIN - 10) return;
      doc.setFontSize(9);
      doc.setTextColor(44, 44, 46);
      const text = item.description
        ? `${idx + 1}. ${item.title} — ${item.description}`
        : `${idx + 1}. ${item.title}`;
      const lines = doc.splitTextToSize(text, panelW - 4);
      doc.text(lines, MARGIN + 2, y);
      y += lines.length * 4 + 1;
    });
    pageHeader();

    // Panel 2 - Obituary
    y = MARGIN;
    doc.setFontSize(11);
    doc.setTextColor(61, 90, 115);
    doc.text("Obituary", MARGIN + panelW, y);
    y += 7;
    if (state.obituary) {
      doc.setFontSize(9);
      doc.setTextColor(44, 44, 46);
      const lines = doc.splitTextToSize(state.obituary, panelW - 4);
      doc.text(lines, MARGIN + panelW + 2, y);
    }

    // Panel 3 - Poem/Scripture
    y = MARGIN;
    doc.setFontSize(11);
    doc.setTextColor(61, 90, 115);
    doc.text("In Remembrance", MARGIN + panelW * 2, y);
    y += 7;
    if (state.poemOrScripture) {
      doc.setFontSize(9);
      doc.setTextColor(44, 44, 46);
      const lines = doc.splitTextToSize(
        state.poemOrScripture,
        panelW - 4
      );
      doc.text(lines, MARGIN + panelW * 2 + 2, y);
    }

    // Page 2: cover + back
    doc.addPage([w, h]);
    drawCover(doc, state, w, h, MARGIN, contentW);
    pageHeader();

    // Fold marks for trifold
    for (let p = 0; p < doc.getNumberOfPages(); p++) {
      doc.setPage(p + 1);
      doc.setDrawColor(200, 200, 200);
      doc.setLineDashPattern([2, 2], 0);
      const x1 = MARGIN + panelW;
      const x2 = MARGIN + panelW * 2;
      doc.line(x1, 0, x1, 4);
      doc.line(x1, h - 4, x1, h);
      doc.line(x2, 0, x2, 4);
      doc.line(x2, h - 4, x2, h);
    }
  } else if (state.layout === "booklet") {
    // 8-page booklet: cover, 6 inner pages, back
    // Cover
    drawCover(doc, state, w, h, MARGIN, contentW);
    pageHeader();

    // Inner pages
    for (let page = 0; page < 6; page++) {
      doc.addPage([w, h]);
      y = MARGIN + 10;

      if (page === 0) {
        // Order of Service
        doc.setFontSize(14);
        doc.setTextColor(61, 90, 115);
        doc.text("Order of Service", MARGIN, MARGIN);
        y = MARGIN + 12;

        state.serviceItems.forEach((item, idx) => {
          if (y > h - MARGIN - 15) return;
          doc.setFontSize(11);
          doc.setTextColor(44, 44, 46);
          doc.text(`${idx + 1}. ${item.title}`, MARGIN + 4, y);
          y += 6;
          if (item.description) {
            doc.setFontSize(9);
            doc.setTextColor(110, 110, 115);
            const lines = doc.splitTextToSize(item.description, contentW - 12);
            doc.text(lines, MARGIN + 8, y);
            y += lines.length * 4.5 + 2;
          }
          y += 4;
        });
      } else if (page === 1 || page === 2) {
        // Obituary (may span 2 pages)
        doc.setFontSize(14);
        doc.setTextColor(61, 90, 115);
        doc.text("Obituary", MARGIN, MARGIN);
        y = MARGIN + 12;
        if (state.obituary) {
          doc.setFontSize(10);
          doc.setTextColor(44, 44, 46);
          const fullText =
            page === 1 ? state.obituary : "";
          if (fullText) {
            const lines = doc.splitTextToSize(fullText, contentW);
            const startLine = page === 2 ? Math.floor(lines.length / 2) : 0;
            const endLine = page === 1 ? Math.ceil(lines.length / 2) : lines.length;
            const pageLines = lines.slice(startLine, endLine);
            doc.text(pageLines, MARGIN, y);
          }
        }
      } else if (page === 3) {
        // Pallbearers + Acknowledgements
        doc.setFontSize(14);
        doc.setTextColor(61, 90, 115);
        doc.text("Pallbearers", MARGIN, MARGIN);
        y = MARGIN + 12;
        if (state.pallbearers) {
          doc.setFontSize(10);
          doc.setTextColor(44, 44, 46);
          const lines = doc.splitTextToSize(state.pallbearers, contentW);
          doc.text(lines, MARGIN, y);
          y += lines.length * 5 + 12;
        }
        if (state.acknowledgements) {
          doc.setFontSize(14);
          doc.setTextColor(61, 90, 115);
          doc.text("Acknowledgements", MARGIN, y);
          y += 10;
          doc.setFontSize(10);
          doc.setTextColor(44, 44, 46);
          const lines = doc.splitTextToSize(state.acknowledgements, contentW);
          doc.text(lines, MARGIN, y);
        }
      } else if (page === 4) {
        // Poem/Scripture
        doc.setFontSize(14);
        doc.setTextColor(61, 90, 115);
        doc.text("In Loving Memory", w / 2, MARGIN, { align: "center" });
        y = MARGIN + 16;
        if (state.poemOrScripture) {
          doc.setFontSize(11);
          doc.setTextColor(44, 44, 46);
          const lines = doc.splitTextToSize(state.poemOrScripture, contentW - 20);
          doc.text(lines, w / 2, y, { align: "center" });
        }
      } else if (page === 5) {
        // Photo page (if photo exists)
        if (state.photo) {
          try {
            doc.addImage(state.photo, "JPEG", MARGIN, MARGIN, contentW, h - MARGIN * 2);
          } catch {
            // Photo may fail to render
          }
        }
      }
      pageHeader();
    }

    // Back cover
    doc.addPage([w, h]);
    y = h / 2 - 20;
    doc.setFontSize(14);
    doc.setTextColor(61, 90, 115);
    doc.text("In Loving Memory", w / 2, y, { align: "center" });
    y += 10;
    if (state.name) {
      doc.setFontSize(18);
      doc.setTextColor(44, 44, 46);
      doc.text(state.name, w / 2, y, { align: "center" });
    }
    pageHeader();
  } else {
    // Single sheet
    y = drawCover(doc, state, w, h, MARGIN, contentW);
    pageHeader();
  }

  return doc.output("blob");
}

function drawCover(
  doc: jsPDF,
  state: FuneralProgramState,
  w: number,
  h: number,
  margin: number,
  contentW: number
): number {
  let y = margin;

  // Decorative top line
  doc.setDrawColor(143, 163, 150);
  doc.setLineWidth(0.5);
  doc.line(margin + 20, y, w - margin - 20, y);
  y += 12;

  // "In Loving Memory Of"
  doc.setFontSize(12);
  doc.setTextColor(143, 163, 150);
  doc.text("In Loving Memory Of", w / 2, y, { align: "center" });
  y += 14;

  // Name
  if (state.name) {
    doc.setFontSize(24);
    doc.setTextColor(44, 44, 46);
    const nameLines = doc.splitTextToSize(state.name, contentW - 20);
    doc.text(nameLines, w / 2, y, { align: "center" });
    y += nameLines.length * 10 + 8;
  }

  // Dates
  if (state.birthDate || state.deathDate) {
    doc.setFontSize(12);
    doc.setTextColor(110, 110, 115);
    const birth = state.birthDate || "";
    const death = state.deathDate || "";
    const dateStr =
      birth && death ? `${birth} — ${death}` : birth || death;
    if (dateStr) {
      doc.text(dateStr, w / 2, y, { align: "center" });
      y += 14;
    }
  }

  // Photo
  if (state.photo) {
    try {
      const photoMaxH = Math.min(80, (h - y - margin - 20) * 0.5);
      const photoMaxW = contentW * 0.6;
      // Calculate aspect-ratio-preserving size
      doc.addImage(
        state.photo,
        "JPEG",
        w / 2 - photoMaxW / 2,
        y,
        photoMaxW,
        photoMaxH
      );
      y += photoMaxH + 12;
    } catch {
      y += 4;
    }
  }

  // Decorative bottom line
  doc.setDrawColor(143, 163, 150);
  doc.setLineWidth(0.5);
  doc.line(margin + 20, h - margin - 10, w - margin - 20, h - margin - 10);

  return y;
}
