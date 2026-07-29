// ============================================================================
// MemorialPrintables — PDF Export Engine (pdf-lib)
// Generates print-ready PDFs with correct fold geometry.
// ============================================================================

import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import { Format, TemplatePreset } from './funeral-config';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PT_PER_IN = 72;
const SAFE_MARGIN_IN = 0.25;
const SAFE_MARGIN_PT = SAFE_MARGIN_IN * PT_PER_IN;
const FOLD_GUIDE_COLOR = rgb(0.8, 0.8, 0.8);

// Sheet sizes in points
const SHEET_LANDSCAPE_W = 792; // 11 in
const SHEET_LANDSCAPE_H = 612; // 8.5 in
const SHEET_PORTRAIT_W = 612; // 8.5 in
const SHEET_PORTRAIT_H = 792; // 11 in

// Panel widths in points
const BIFOLD_PANEL_W = 396; // 5.5 in
const TRIFOLD_PANEL_W = 264; // 3.6667 in

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface PdfContent {
  fullName: string;
  dates: string;
  serviceDate: string;
  serviceDetails: string;
  orderOfService: string;
  obituary: string;
  withGratitude: string;
  poem: string;
  reflections: string;
  photoBytes?: Uint8Array | null;
  photoMimeType?: string;
  showGuides: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16) / 255,
    g: parseInt(h.substring(2, 4), 16) / 255,
    b: parseInt(h.substring(4, 6), 16) / 255,
  };
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const lines: string[] = [];
  const paragraphs = text.split('\n');
  for (const para of paragraphs) {
    if (para.trim() === '') {
      lines.push('');
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

function drawFoldGuide(page: PDFPage, x: number, y: number, height: number) {
  page.drawLine({
    start: { x, y },
    end: { x, y: y + height },
    thickness: 0.5,
    color: FOLD_GUIDE_COLOR,
    dashArray: [6, 4],
  });
}

async function embedPhoto(pdf: PDFDoc, bytes: Uint8Array, mimeType: string) {
  try {
    if (mimeType === 'image/png') {
      return await pdf.embedPng(bytes);
    }
    return await pdf.embedJpg(bytes);
  } catch {
    // Try the other format if the first fails
    try {
      return await pdf.embedPng(bytes);
    } catch {
      try {
        return await pdf.embedJpg(bytes);
      } catch {
        return null;
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Draw a panel region
// ---------------------------------------------------------------------------
interface DrawPanelOptions {
  page: PDFPage;
  x: number; // left edge of panel
  y: number; // bottom edge of panel
  width: number;
  height: number;
  content: PdfContent;
  template: TemplatePreset;
  fonts: { serif: PDFFont; sans: PDFFont };
  panelType: 'cover' | 'back' | 'service' | 'obituary' | 'reflections' | 'poem' | 'inside-left' | 'inside-right' | 'back-content';
  accentRgb: { r: number; g: number; b: number };
  showGuides: boolean;
}

function drawPanel(opts: DrawPanelOptions) {
  const { page, x, y, width, height, content, template, fonts, panelType, accentRgb, showGuides } = opts;
  const { serif, sans } = fonts;
  const innerX = x + SAFE_MARGIN_PT;
  const innerW = width - 2 * SAFE_MARGIN_PT;
  const innerTop = y + height - SAFE_MARGIN_PT;
  const lineHeight = (fontSize: number) => fontSize * 1.4;

  // Draw accent border at top
  page.drawRectangle({
    x,
    y: y + height - 6,
    width,
    height: 6,
    color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
  });

  let currentY = innerTop - 8; // Start below the accent bar

  // ---- COVER PANEL ----
  if (panelType === 'cover') {
    // "IN LOVING MEMORY" header
    const headerText = 'IN LOVING MEMORY';
    const headerFont = sans;
    const headerSize = 11;
    page.drawText(headerText, {
      x: x + (width - headerFont.widthOfTextAtSize(headerText, headerSize)) / 2,
      y: currentY,
      size: headerSize,
      font: headerFont,
      color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
    });
    currentY -= lineHeight(headerSize) + 12;

    // Photo frame
    const photoFrameH = height * 0.4;
    const photoFrameW = innerW * 0.85;
    const photoX = x + (width - photoFrameW) / 2;
    const photoY = currentY - photoFrameH;

    page.drawRectangle({
      x: photoX,
      y: photoY,
      width: photoFrameW,
      height: photoFrameH,
      borderColor: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
      borderWidth: 1,
      opacity: 0.3,
    });

    // Placeholder text if no photo
    page.drawText(content.fullName || 'Photo', {
      x: x + (width - sans.widthOfTextAtSize(content.fullName || 'Photo', 10)) / 2,
      y: photoY + photoFrameH / 2 - 5,
      size: 10,
      font: sans,
      color: rgb(0.7, 0.7, 0.7),
    });

    // We'll embed the actual photo in the caller — return the photo frame position
    currentY = photoY - 16;

    // Full name
    const nameSize = 18;
    const nameText = content.fullName || 'Full Name';
    const nameLines = wrapText(nameText, serif, nameSize, innerW);
    for (const line of nameLines) {
      const lineW = serif.widthOfTextAtSize(line, nameSize);
      page.drawText(line, {
        x: x + (width - lineW) / 2,
        y: currentY,
        size: nameSize,
        font: serif,
        color: rgb(0.15, 0.15, 0.15),
      });
      currentY -= lineHeight(nameSize);
    }
    currentY -= 8;

    // Decorative divider
    const divW = 80;
    page.drawLine({
      start: { x: x + (width - divW) / 2, y: currentY },
      end: { x: x + (width + divW) / 2, y: currentY },
      thickness: 0.8,
      color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
    });
    currentY -= 12;

    // Dates
    const datesText = content.dates || '';
    if (datesText) {
      const dateLines = wrapText(datesText, sans, 10, innerW);
      for (const line of dateLines) {
        const lineW = sans.widthOfTextAtSize(line, 10);
        page.drawText(line, {
          x: x + (width - lineW) / 2,
          y: currentY,
          size: 10,
          font: sans,
          color: rgb(0.4, 0.4, 0.4),
        });
        currentY -= lineHeight(10);
      }
    }
    currentY -= 12;

    // Service Date
    const serviceDateText = content.serviceDate || '';
    if (serviceDateText) {
      const dateLines = wrapText(serviceDateText, serif, 14, innerW);
      for (const line of dateLines) {
        const lineW = serif.widthOfTextAtSize(line, 14);
        page.drawText(line, {
          x: x + (width - lineW) / 2,
          y: currentY,
          size: 14,
          font: serif,
          color: rgb(0.15, 0.15, 0.15),
        });
        currentY -= lineHeight(14);
      }
      currentY -= 4;
    }

    // Service Details
    const serviceDetailsText = content.serviceDetails || '';
    if (serviceDetailsText) {
      const detailLines = wrapText(serviceDetailsText, sans, 10, innerW);
      for (const line of detailLines) {
        const lineW = sans.widthOfTextAtSize(line, 10);
        page.drawText(line, {
          x: x + (width - lineW) / 2,
          y: currentY,
          size: 10,
          font: sans,
          color: rgb(0.4, 0.4, 0.4),
        });
        currentY -= lineHeight(10);
      }
    }
    return;
  }

  // ---- BACK PANEL ----
  if (panelType === 'back') {
    // Simple centered text on back cover
    const backText = 'Thank you for being here today.\nYour presence means the world to our family.';
    const backLines = wrapText(backText, serif, 12, innerW);
    // Center vertically
    const totalH = backLines.length * lineHeight(12);
    let startY = y + (height - totalH) / 2;
    for (const line of backLines) {
      const lineW = serif.widthOfTextAtSize(line, 12);
      page.drawText(line, {
        x: x + (width - lineW) / 2,
        y: startY,
        size: 12,
        font: serif,
        color: rgb(0.3, 0.3, 0.3),
      });
      startY -= lineHeight(12);
    }
    return;
  }

  // ---- BACK CONTENT (single format) ----
  if (panelType === 'back-content') {
    // Acknowledgments on the back
    currentY -= 4;
    const title = 'Acknowledgments';
    const titleSize = 16;
    page.drawText(title, {
      x: x + (width - serif.widthOfTextAtSize(title, titleSize)) / 2,
      y: currentY,
      size: titleSize,
      font: serif,
      color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
    });
    currentY -= lineHeight(titleSize) + 4;
    page.drawLine({
      start: { x: innerX, y: currentY },
      end: { x: innerX + innerW, y: currentY },
      thickness: 0.5,
      color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
    });
    currentY -= 8;
    drawWrappedText(page, innerX, currentY, innerW, content.withGratitude || '', serif, 10, rgb(0.2, 0.2, 0.2));
    return;
  }

  // ---- CONTENT PANELS (service, obituary, reflections, poem, inside-left, inside-right) ----
  const titles: Record<string, string> = {
    service: 'Order of Service',
    obituary: 'Obituary',
    reflections: 'Reflections',
    poem: 'In Loving Memory',
    'inside-left': 'Order of Service',
    'inside-right': 'Obituary',
  };
  const title = titles[panelType] || 'Content';
  const titleSize = 14;

  page.drawText(title, {
    x: innerX,
    y: currentY,
    size: titleSize,
    font: serif,
    color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
  });
  currentY -= lineHeight(titleSize) + 2;

  // Underline
  page.drawLine({
    start: { x: innerX, y: currentY },
    end: { x: innerX + innerW, y: currentY },
    thickness: 0.5,
    color: rgb(accentRgb.r, accentRgb.g, accentRgb.b),
  });
  currentY -= 8;

  // Body text
  let bodyText = '';
  let bodyFont = serif;
  switch (panelType) {
    case 'service':
    case 'inside-left':
      bodyText = content.orderOfService || '';
      bodyFont = sans;
      break;
    case 'obituary':
    case 'inside-right':
      bodyText = content.obituary || '';
      break;
    case 'reflections':
      bodyText = content.reflections || '';
      bodyFont = serif;
      break;
    case 'poem':
      bodyText = content.poem || '';
      bodyFont = serif;
      break;
  }

  drawWrappedText(page, innerX, currentY, innerW, bodyText, bodyFont, 9.5, rgb(0.2, 0.2, 0.2));
}

function drawWrappedText(
  page: PDFPage,
  x: number,
  y: number,
  maxWidth: number,
  text: string,
  font: PDFFont,
  fontSize: number,
  color: { r: number; g: number; b: number }
) {
  const lines = wrapText(text, font, fontSize, maxWidth);
  let currentY = y;
  const lh = fontSize * 1.45;
  for (const line of lines) {
    if (currentY < 10) break; // Don't draw below safe area
    if (line === '') {
      currentY -= lh * 0.5;
      continue;
    }
    page.drawText(line, {
      x,
      y: currentY,
      size: fontSize,
      font,
      color,
    });
    currentY -= lh;
  }
}

// ---------------------------------------------------------------------------
// Main export function
// ---------------------------------------------------------------------------
type PDFDoc = PDFDocument;

export async function generateFuneralPdf(
  format: Format,
  content: PdfContent,
  template: TemplatePreset,
  photoBytes?: Uint8Array | null,
  photoMimeType?: string
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const sansBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const fonts = { serif, sans: sansBold };

  const accentRgb = hexToRgb(template.accent);

  const mergedContent: PdfContent = { ...content, photoBytes, photoMimeType };

  if (format === 'single') {
    // ---- SINGLE FORMAT: 2 portrait pages ----
    // Page 1: Cover
    const page1 = pdf.addPage([SHEET_PORTRAIT_W, SHEET_PORTRAIT_H]);
    drawPanel({
      page: page1,
      x: 0, y: 0,
      width: SHEET_PORTRAIT_W, height: SHEET_PORTRAIT_H,
      content: mergedContent, template, fonts,
      panelType: 'cover', accentRgb,
      showGuides: content.showGuides,
    });

    // Embed photo on cover if available
    if (photoBytes) {
      const img = await embedPhoto(pdf, photoBytes, photoMimeType || 'image/jpeg');
      if (img) {
        const frameW = (SHEET_PORTRAIT_W - 2 * SAFE_MARGIN_PT) * 0.85;
        const frameH = SHEET_PORTRAIT_H * 0.4;
        const imgX = (SHEET_PORTRAIT_W - frameW) / 2;
        // Photo Y: calculate based on where we drew the placeholder
        // The cover panel draws: header at top, then photo frame, then name, then dates
        // Photo starts after header + spacing. Let's calculate:
        const headerH = 11 * 1.4 + 12 + 8; // font line + spacing
        const photoY = SHEET_PORTRAIT_H - SAFE_MARGIN_PT - headerH - frameH;
        drawFittedImage(page1, img, imgX, photoY, frameW, frameH);
      }
    }

    // Page 2: Back content
    const page2 = pdf.addPage([SHEET_PORTRAIT_W, SHEET_PORTRAIT_H]);
    drawPanel({
      page: page2,
      x: 0, y: 0,
      width: SHEET_PORTRAIT_W, height: SHEET_PORTRAIT_H,
      content: mergedContent, template, fonts,
      panelType: 'back-content', accentRgb,
      showGuides: content.showGuides,
    });
  }

  if (format === 'bifold') {
    // ---- BIFOLD: 2 landscape pages, 2 panels each ----
    // Outside: [back cover | front cover]
    const pageOutside = pdf.addPage([SHEET_LANDSCAPE_W, SHEET_LANDSCAPE_H]);
    drawPanel({
      page: pageOutside,
      x: 0, y: 0,
      width: BIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'back', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageOutside,
      x: BIFOLD_PANEL_W, y: 0,
      width: BIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'cover', accentRgb,
      showGuides: content.showGuides,
    });
    if (content.showGuides) {
      drawFoldGuide(pageOutside, BIFOLD_PANEL_W, 0, SHEET_LANDSCAPE_H);
    }
    // Embed photo on front cover
    if (photoBytes) {
      const img = await embedPhoto(pdf, photoBytes, photoMimeType || 'image/jpeg');
      if (img) {
        const frameW = (BIFOLD_PANEL_W - 2 * SAFE_MARGIN_PT) * 0.85;
        const frameH = SHEET_LANDSCAPE_H * 0.4;
        const panelX = BIFOLD_PANEL_W;
        const headerH = 11 * 1.4 + 12 + 8;
        const photoY = SHEET_LANDSCAPE_H - SAFE_MARGIN_PT - headerH - frameH;
        drawFittedImage(pageOutside, img, panelX + (BIFOLD_PANEL_W - frameW) / 2, photoY, frameW, frameH);
      }
    }

    // Inside: [inside-left | inside-right]
    const pageInside = pdf.addPage([SHEET_LANDSCAPE_W, SHEET_LANDSCAPE_H]);
    drawPanel({
      page: pageInside,
      x: 0, y: 0,
      width: BIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'inside-left', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageInside,
      x: BIFOLD_PANEL_W, y: 0,
      width: BIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'inside-right', accentRgb,
      showGuides: content.showGuides,
    });
    if (content.showGuides) {
      drawFoldGuide(pageInside, BIFOLD_PANEL_W, 0, SHEET_LANDSCAPE_H);
    }
  }

  if (format === 'trifold') {
    // ---- TRIFOLD: 2 landscape pages, 3 panels each ----
    // Outside (left to right): [back | poem | front cover]
    const pageOutside = pdf.addPage([SHEET_LANDSCAPE_W, SHEET_LANDSCAPE_H]);
    drawPanel({
      page: pageOutside,
      x: 0, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'back', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageOutside,
      x: TRIFOLD_PANEL_W, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'poem', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageOutside,
      x: TRIFOLD_PANEL_W * 2, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'cover', accentRgb,
      showGuides: content.showGuides,
    });
    if (content.showGuides) {
      drawFoldGuide(pageOutside, TRIFOLD_PANEL_W, 0, SHEET_LANDSCAPE_H);
      drawFoldGuide(pageOutside, TRIFOLD_PANEL_W * 2, 0, SHEET_LANDSCAPE_H);
    }
    // Embed photo on front cover
    if (photoBytes) {
      const img = await embedPhoto(pdf, photoBytes, photoMimeType || 'image/jpeg');
      if (img) {
        const frameW = (TRIFOLD_PANEL_W - 2 * SAFE_MARGIN_PT) * 0.85;
        const frameH = SHEET_LANDSCAPE_H * 0.4;
        const panelX = TRIFOLD_PANEL_W * 2;
        const headerH = 11 * 1.4 + 12 + 8;
        const photoY = SHEET_LANDSCAPE_H - SAFE_MARGIN_PT - headerH - frameH;
        drawFittedImage(pageOutside, img, panelX + (TRIFOLD_PANEL_W - frameW) / 2, photoY, frameW, frameH);
      }
    }

    // Inside (left to right): [order of service | obituary | reflections]
    const pageInside = pdf.addPage([SHEET_LANDSCAPE_W, SHEET_LANDSCAPE_H]);
    drawPanel({
      page: pageInside,
      x: 0, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'service', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageInside,
      x: TRIFOLD_PANEL_W, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'obituary', accentRgb,
      showGuides: content.showGuides,
    });
    drawPanel({
      page: pageInside,
      x: TRIFOLD_PANEL_W * 2, y: 0,
      width: TRIFOLD_PANEL_W, height: SHEET_LANDSCAPE_H,
      content: mergedContent, template, fonts,
      panelType: 'reflections', accentRgb,
      showGuides: content.showGuides,
    });
    if (content.showGuides) {
      drawFoldGuide(pageInside, TRIFOLD_PANEL_W, 0, SHEET_LANDSCAPE_H);
      drawFoldGuide(pageInside, TRIFOLD_PANEL_W * 2, 0, SHEET_LANDSCAPE_H);
    }
  }

  return pdf.save();
}

// ---------------------------------------------------------------------------
// Draw image fitted (contain, centered)
// ---------------------------------------------------------------------------
function drawFittedImage(
  page: PDFPage,
  img: Awaited<ReturnType<PDFDocument['embedPng']>> | Awaited<ReturnType<PDFDocument['embedJpg']>>,
  x: number,
  y: number,
  maxW: number,
  maxH: number
) {
  if (!img) return;
  const { width: imgW, height: imgH } = img.scale(1);
  const scale = Math.min(maxW / imgW, maxH / imgH);
  const drawW = imgW * scale;
  const drawH = imgH * scale;
  const drawX = x + (maxW - drawW) / 2;
  const drawY = y + (maxH - drawH) / 2;
  page.drawImage(img, {
    x: drawX,
    y: drawY,
    width: drawW,
    height: drawH,
  });
}
