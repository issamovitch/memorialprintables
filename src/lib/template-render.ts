// ============================================================================
// template-render.ts — Client-side template rendering engine
//
// Fetches a template's HTML, parses it, extracts the sheet matching the chosen
// format, fills in the editable [data-field] spots, and returns a complete
// HTML document string suitable for an iframe srcDoc.
//
// TEMPLATE CONTRACT (shared by all file-based templates):
// - Layout blocks are tagged data-format="single|bifold|trifold".
//   Each block IS a sheet: .page (single) or .spread (bifold/trifold).
//   Multiple sheets per format are distinguished by data-side="front|back|outside|inside".
// - Editable spots are data-field="NAME". Text fields get textContent; the
//   photo field (data-field="photo") gets background-image.
// - Standalone-only chrome is tagged data-mp-chrome (hidden in-app).
// - Panel widths are FIXED in inches: .page 8.5×11, .spread 11×8.5,
//   .panel-bifold 5.5×8.5, .panel-trifold 3.6667×8.5.
// ============================================================================

import type { Format } from './funeral-config';

export interface TemplateFields {
  [key: string]: string | null;
}

export interface RenderedSheet {
  srcDoc: string;
  sheetHtml: string;
  label: string;
  widthPx: number;
  heightPx: number;
}

const DPI = 96;
const IN = (n: number) => n * DPI;

// Sheet dimensions per format (inches → px at 96dpi)
const SHEET_DIMS: Record<Format, { w: number; h: number }> = {
  single: { w: IN(8.5), h: IN(11) },
  bifold: { w: IN(11), h: IN(8.5) },
  trifold: { w: IN(11), h: IN(8.5) },
};

// Human labels per format + side
const SHEET_LABELS: Record<Format, Record<string, string>> = {
  single: { front: 'Front · 8.5 × 11"', back: 'Back · 8.5 × 11"' },
  bifold: { outside: 'Outside · fold down the middle', inside: 'Inside · two panels' },
  trifold: { outside: 'Outside · cover on right', inside: 'Inside · three panels' },
};

// CSS overrides applied on top of the template's own <style>.
// These strip standalone-viewing chrome (box-shadow, margins) so the sheet
// renders cleanly inside a sized iframe.
const OVERRIDE_CSS = `
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background: transparent !important;
    overflow: hidden !important;
  }
  .page, .spread {
    box-shadow: none !important;
    margin: 0 !important;
  }
  [data-mp-chrome] { display: none !important; }
  /* Ensure multiline text fields honour newlines */
  [data-field] { white-space: pre-line; }
  /* Force photo wrapper to square so border-radius:50% makes a true circle */
  .photo-wrap { aspect-ratio: 1 !important; }
  /* Force all photo fields to be circular and fill their container */
  [data-field="photo"] {
    border-radius: 50% !important;
    background-size: cover !important;
    background-position: center !important;
  }
`;

/**
 * Render a template into one or more iframe-ready HTML documents.
 *
 * @param htmlString  The raw template HTML (fetched from /templates/<Name>/html.html)
 * @param format      The chosen fold format
 * @param fields      Key/value map of editable field contents
 * @returns           Array of rendered sheets (one per physical page)
 */
export function renderTemplate(
  htmlString: string,
  format: Format,
  fields: TemplateFields
): RenderedSheet[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // Extract the template's <style> content (all CSS lives in one style block)
  const styleEl = doc.querySelector('style');
  let styles = styleEl ? styleEl.textContent || '' : '';

  // Fix: replace url('../img.png') with a path that works when injected into the page.
  // The preview is injected into the generator page at /free-funeral-program-generator,
  // so url('../img.png') resolves to http://localhost:3000/img.png which is wrong.
  // We want to point to /api/templates/img.png which our API route handles.
  styles = styles.replace(/url\(['"]?\.\.\/img\.png['"]?\)/g, 'url("/api/templates/img.png")');

// Extract Google Font stylesheets and convert to @import for cleaner injection
  const ALL_FONT_IMPORTS = `@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Parisienne&family=Pinyon+Script&family=Poppins:wght@300;400;500;600;700&family=Sacramento&display=swap");`;
  const fontLinks = ALL_FONT_IMPORTS;

  // Remove standalone-only chrome elements from the entire document
  doc.querySelectorAll('[data-mp-chrome]').forEach((el) => el.remove());

  // Find all sheet elements matching the chosen format.
  // Each [data-format="X"] element IS a sheet (.page or .spread).
  const sheetEls = Array.from(
    doc.querySelectorAll<HTMLElement>(`[data-format="${format}"]`)
  );

  if (sheetEls.length === 0) {
    return [];
  }

  const dims = SHEET_DIMS[format];

  return sheetEls.map((sheetEl) => {
    // Clone so we don't mutate the parsed doc
    const clone = sheetEl.cloneNode(true) as HTMLElement;

    // Fill every [data-field] element within this sheet.
    // NOTE: the 'photo' field is deliberately NOT embedded in the srcDoc —
    // embedding a data URL in the srcDoc causes some browsers to hang when
    // the iframe parses the large inline style. Instead, the photo is applied
    // to the iframe's contentDocument AFTER it loads (see applyPhotoToDocument).
    clone.querySelectorAll<HTMLElement>('[data-field]').forEach((el) => {
      const key = el.getAttribute('data-field');
      if (!key || key === 'photo') return;

      if (format !== 'trifold' && (key === 'poem' || key === 'reflections')) {
        el.parentElement?.remove();
        return;
      }

      const value = fields[key];
      if (value != null && value !== '') {
        // Text field: set textContent (safe — no HTML injection)
        el.textContent = value;
      }
    });

    const side = clone.getAttribute('data-side') || '';
    const label = SHEET_LABELS[format]?.[side] || '';

    const srcDoc = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
${fontLinks}
${styles}
${OVERRIDE_CSS}
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`;

    return {
      srcDoc,
      sheetHtml: `<style>${fontLinks}\n${styles}\n${OVERRIDE_CSS}</style>${clone.outerHTML}`,
      label,
      widthPx: dims.w,
      heightPx: dims.h,
    };
  });
}

/**
 * Apply (or remove) the photo on an iframe's content document.
 * Called AFTER the iframe has loaded its srcDoc, and again whenever the
 * photo changes — without reloading the iframe.
 */
export function applyPhotoToDocument(
  root: ParentNode | null | undefined,
  photoDataUrl: string | null
): void {
  if (!root) return;
  const els = root.querySelectorAll<HTMLElement>('[data-field="photo"]');
  els.forEach((el) => {
    if (photoDataUrl) {
      el.style.backgroundImage = `url("${photoDataUrl}")`;
    } else {
      el.style.backgroundImage = '';
    }
  });
}

/**
 * Fetch a template's HTML source (with light in-memory caching).
 */
const htmlCache = new Map<string, string>();

export async function fetchTemplateHtml(htmlUrl: string, force: boolean = false): Promise<string> {
  if (!force) {
    const cached = htmlCache.get(htmlUrl);
    if (cached) return cached;
  }

  const res = await fetch(htmlUrl);
  if (!res.ok) throw new Error(`Failed to fetch template: ${htmlUrl}`);
  const html = await res.text();
  htmlCache.set(htmlUrl, html);
  return html;
}
