// ============================================================================
// template-loader.ts — Server-side template discovery
//
// Templates are file-based. Each template lives in its own folder:
//   /templates/<Name>/html.html      — the template source
//   /templates/<Name>/preview.png    — thumbnail for the picker
//
// The html.html <head> contains meta tags the loader reads:
//   <meta name="mp-template" content="Minimalist">
//   <meta name="mp-accent"   content="#2c2c29">
//   <meta name="mp-order"    content="5">
//
// Templates are also copied to /public/templates/<Name>/ so the browser can
// fetch the HTML at runtime for live preview rendering.
// ============================================================================

import fs from 'node:fs';
import path from 'node:path';

export interface TemplateMeta {
  id: string;            // folder name, e.g. "Minimalist"
  name: string;          // from mp-template meta (falls back to id)
  accent: string;        // from mp-accent meta
  order: number;         // from mp-order meta (sort weight, ascending)
  htmlUrl: string;       // public URL to fetch the template HTML on the client
  previewUrl: string;    // public URL of the preview.png thumbnail
}

const TEMPLATES_DIR = path.join(process.cwd(), 'public', 'templates');
const PUBLIC_URL_BASE = '/templates';

/**
 * Scan the /templates folder and return every template's metadata, sorted by
 * mp-order ascending then by name. Called server-side (in the page component).
 */
export function getTemplates(): TemplateMeta[] {
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    // templates folder missing — return empty
    return [];
  }

  const metas: TemplateMeta[] = entries
    .filter((name) => fs.existsSync(path.join(TEMPLATES_DIR, name, 'html.html')))
    .map((name) => {
      const html = fs.readFileSync(path.join(TEMPLATES_DIR, name, 'html.html'), 'utf8');
      const meta = parseMeta(html);
      return {
        id: name,
        name: meta.name || name,
        accent: meta.accent || '#3f7d74',
        order: meta.order,
        htmlUrl: `${PUBLIC_URL_BASE}/${encodeURIComponent(name)}/html.html`,
        previewUrl: `${PUBLIC_URL_BASE}/${encodeURIComponent(name)}/preview.png`,
      };
    });

  metas.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  return metas;
}

/** Parse the mp-template / mp-accent / mp-order meta tags from template HTML. */
function parseMeta(html: string): { name?: string; accent?: string; order: number } {
  const pick = (key: string): string | undefined => {
    const re = new RegExp(`<meta\\s+name=["']${key}["']\\s+content=["']([^"']+)["']`, 'i');
    const m = html.match(re);
    return m?.[1];
  };
  const name = pick('mp-template');
  const accent = pick('mp-accent');
  const orderStr = pick('mp-order');
  const order = orderStr ? parseInt(orderStr, 10) : 100;
  return { name, accent, order: Number.isFinite(order) ? order : 100 };
}
