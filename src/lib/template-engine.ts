// ============================================================================
// MemorialPrintables — Template Engine
// Fetches template HTML, parses it, fills data-field bindings, injects into preview
// ============================================================================

export interface TemplateManifestItem {
  id: string;
  name: string;
  accent: string;
  order: number;
  html: string;
  preview: string;
}

export type FormData = {
  fullName: string;
  dates: string;
  orderOfService: string;
  obituary: string;
  withGratitude: string;
  poem: string;
  reflections: string;
  photoUrl: string | null;
};

// ---------------------------------------------------------------------------
// Fetch and cache manifest
// ---------------------------------------------------------------------------
let cachedManifest: TemplateManifestItem[] | null = null;

export async function loadManifest(): Promise<TemplateManifestItem[]> {
  if (cachedManifest) return cachedManifest;
  const res = await fetch('/templates-manifest.json');
  if (!res.ok) throw new Error('Failed to load templates manifest');
  cachedManifest = await res.json();
  return cachedManifest;
}

// ---------------------------------------------------------------------------
// Fetch and parse a template's HTML
// ---------------------------------------------------------------------------
let htmlCache = new Map<string, Document>();

export async function fetchTemplateHtml(htmlUrl: string): Promise<Document> {
  const cached = htmlCache.get(htmlUrl);
  if (cached) return cached;

  const res = await fetch(htmlUrl);
  if (!res.ok) throw new Error(`Failed to fetch template: ${htmlUrl}`);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  htmlCache.set(htmlUrl, doc);
  return doc;
}

// ---------------------------------------------------------------------------
// Extract the active format block + styles from a parsed template
// ---------------------------------------------------------------------------
export function extractFormatBlock(
  doc: Document,
  format: 'single' | 'bifold' | 'trifold'
): { sheets: HTMLElement[]; styles: string } {
  // Extract <style> content
  const styleEl = doc.querySelector('style');
  const styles = styleEl ? styleEl.textContent || '' : '';

  // Find the matching data-format block
  const formatBlock = doc.querySelector(`[data-format="${format}"]`);
  if (!formatBlock) {
    // Fallback: if no matching block, try to use the first one
    const firstBlock = doc.querySelector('[data-format]');
    if (!firstBlock) throw new Error(`No format block found for: ${format}`);
    return getSheetsFromBlock(firstBlock, styles);
  }

  return getSheetsFromBlock(formatBlock, styles);
}

function getSheetsFromBlock(block: Element, styles: string): { sheets: HTMLElement[]; styles: string } {
  const sheets: HTMLElement[] = [];
  // Collect all .sheet elements within this block
  const sheetEls = block.querySelectorAll('.sheet');
  sheetEls.forEach(s => sheets.push(s as HTMLElement));

  return { sheets, styles };
}

// ---------------------------------------------------------------------------
// Fill data-field elements in a cloned set of sheets
// ---------------------------------------------------------------------------
export function fillTemplateFields(
  sheets: HTMLElement[],
  formData: FormData
): HTMLElement[] {
  const filled = sheets.map(sheet => {
    const clone = sheet.cloneNode(true) as HTMLElement;
    const fields = clone.querySelectorAll('[data-field]');
    fields.forEach(field => {
      const key = field.getAttribute('data-field');
      if (!key || !formData.hasOwnProperty(key)) return;

      if (key === 'photo') {
        // Photo: set inline background-image from data URL
        if (formData.photoUrl) {
          field.style.backgroundImage = `url(${formData.photoUrl})`;
        }
      } else {
        // Text fields: set textContent
        const value = (formData as Record<string, string | null>)[key];
        if (value) {
          field.textContent = value;
        }
      }
    });
    return clone;
  });

  return filled;
}

// ---------------------------------------------------------------------------
// Build preview HTML from a template
// ---------------------------------------------------------------------------
export function buildPreviewHtml(
  format: 'single' | 'bifold' | 'trifold',
  sheets: HTMLElement[],
  styles: string,
  accent: string,
  sheetLabels: string[]
): string {
  const sheetsHtml = sheets.map((sheet, i) => {
    const label = sheetLabels[i] || '';
    return `
      <div class="mp-sheet-label">${label}</div>
      ${sheet.outerHTML}
    `;
  }).join('\n');

  return `
    <style>
      ${styles}
      /* Override accent for preview */
      :root { --accent: ${accent} !important; }
      /* Hide editor chrome */
      .mp-editor-note, .mp-fmt-label { display: none !important; }
      /* Ensure sheets are centered */
      .mp-sheet-label {
        font-family: var(--body, system-ui, sans-serif);
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #9aa196;
        text-align: center;
        margin-bottom: -24px;
      }
      body { margin: 0; padding: 0; }
    </style>
    ${sheetsHtml}
  `;
}

// ---------------------------------------------------------------------------
// PDF Export using html2canvas + jsPDF
// ---------------------------------------------------------------------------
export async function exportPdf(
  format: 'single' | 'bifold' | 'trifold',
  sheets: HTMLElement[],
  styles: string,
  accent: string,
  formData: FormData,
  lastName: string,
  showGuides: boolean
): Promise<void> {
  // Dynamic import for code splitting
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import('html2canvas-pro'),
    import('jspdf'),
  ]);

  // Page dimensions in points (for jsPDF)
  const SINGLE_W = 612; // 8.5in
  const SINGLE_H = 792; // 11in
  const LANDSCAPE_W = 792; // 11in
  const LANDSCAPE_H = 612; // 8.5in

  const isLandscape = format !== 'single';
  const pdfW = isLandscape ? LANDSCAPE_W : SINGLE_W;
  const pdfH = isLandscape ? LANDSCAPE_H : SINGLE_H;

  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'pt',
    format: [pdfW, pdfH],
  });

  const sheetLabels: string[] = [];
  if (format === 'single') sheetLabels.push('Front · 8.5 × 11', 'Back');
  else if (format === 'bifold') sheetLabels.push('Outside', 'Inside');
  else sheetLabels.push('Outside', 'Inside');

  // Render each sheet off-screen
  for (let i = 0; i < sheets.length; i++) {
    const container = document.createElement('div');
    container.innerHTML = buildPreviewHtml(format, [sheets[i]], styles, accent, [sheetLabels[i]]);

    // Set up off-screen rendering at true pixel dimensions
    const SCALE = 2; // 2x for ~144 DPI
    const ptToPx = 96 / 72;

    Object.assign(container.style, {
      position: 'fixed',
      left: '-9999px',
      top: '0',
      width: `${pdfW * ptToPx}px`,
      background: '#fff',
      zIndex: '-1',
    });

    document.body.appendChild(container);

    // Remove transform scale from sheets for rendering
    const sheetEl = container.querySelector('.sheet') as HTMLElement;
    if (sheetEl) {
      sheetEl.style.transform = 'none';
    }

    try {
      const canvas = await html2canvas(container, {
        scale: SCALE,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: pdfW * ptToPx,
        windowWidth: pdfW * ptToPx,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage([pdfW, pdfH], isLandscape ? 'landscape' : 'portrait');
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
    } finally {
      document.body.removeChild(container);
    }
  }

  const filename = lastName
    ? `funeral-program-${lastName.toLowerCase()}.pdf`
    : 'funeral-program.pdf';
  pdf.save(filename);
}
