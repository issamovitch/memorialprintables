'use client';

import { jsPDF } from 'jspdf';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { DEFAULT_CONFIG, Format, extractLastName, type TemplatePreset, type FuneralConfig } from '@/lib/funeral-config';
import type { TemplateMeta } from '@/lib/template-loader';
import { fetchTemplateHtml, renderTemplate, applyPhotoToDocument, type TemplateFields } from '@/lib/template-manager';
import { ImageCropModal } from '@/components/image-crop-modal';
import { toPng } from 'html-to-image';
import PrintTipsNotice from "@/components/PrintTipsNotice";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
);
const PrintIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-3a2 2 0 012-2h16a2 2 0 012 2v3a2 2 0 01-2 2h-2M6 14h12v8H6z" /></svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" /></svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
);
const ResetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
);

// ---------------------------------------------------------------------------
// Preview iframe — renders a single sheet via srcDoc, scaled to fit.
// The photo is applied SEPARATELY (after the iframe loads) via direct DOM
// manipulation. This avoids re-serialising a large data URL into the srcDoc
// on every field change, and means swapping the photo doesn't reload the iframe.
// ---------------------------------------------------------------------------
function SheetFrame({
  srcDoc,
  widthPx,
  heightPx,
  scale,
  photo,
}: {
  srcDoc: string;
  widthPx: number;
  heightPx: number;
  scale: number;
  photo: string | null;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Apply the photo to the iframe's contentDocument.
  // Runs after the iframe loads AND whenever the photo changes.
  const applyPhoto = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      applyPhotoToDocument(iframe.contentDocument, photo);
    } catch {
      // cross-origin or not ready yet — ignore, will retry on next change
    }
  }, [photo]);

  // Re-apply the photo whenever it changes (without reloading the iframe)
  useEffect(() => {
    applyPhoto();
  }, [applyPhoto]);

  return (
    <div
      className="sheet-frame-wrap"
      style={{ width: widthPx * scale, height: heightPx * scale }}
    >
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        title="Program preview"
        onLoad={applyPhoto}
        style={{
          width: widthPx,
          height: heightPx,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          border: 'none',
          background: '#fff',
          display: 'block',
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function FuneralMaker({ templates, config }: { templates: TemplateMeta[]; config?: FuneralConfig }) {
  const cfg = config || DEFAULT_CONFIG;
  const [format, setFormat] = useState<Format>('single');
  const [tplIdx, setTplIdx] = useState(0);
  const [name, setName] = useState(cfg.defaultName);
  const [dates, setDates] = useState(cfg.defaultDates);
  const [serviceDate, setServiceDate] = useState('Saturday, 18 January 2026');
  const [serviceDetails, setServiceDetails] = useState('Eleven o\'clock in the morning\nGrace Chapel, 123 Main Street, Any City');
  const [order, setOrder] = useState(cfg.defaultOrderOfService);
  const [obit, setObit] = useState(cfg.defaultObituary);
  const [gratitude, setGratitude] = useState(cfg.defaultWithGratitude);
  const [poem, setPoem] = useState(cfg.defaultPoem);
  const [reflections, setReflections] = useState(cfg.defaultReflections);
  const [photo, setPhoto] = useState<string | null>('/img.png');
  const [photoBytes, setPhotoBytes] = useState<Uint8Array | null>(null);
  const [photoMime, setPhotoMime] = useState<string | undefined>(undefined);
  const [downloading, setDownloading] = useState(false);
  const [tplHtml, setTplHtml] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [previewScale, setPreviewScale] = useState(0.5);
  const [cropOpen, setCropOpen] = useState(false);
  // The ORIGINAL uploaded photo (data URL). We keep this separate from `photo`
  // so that re-editing always starts from the un-cropped source image.
  const [originalPhoto, setOriginalPhoto] = useState<string | null>('/img.png');

  const handleReset = useCallback(() => {
    setName(cfg.defaultName);
    setDates(cfg.defaultDates);
    setServiceDate('Saturday, 18 January 2026');
    setServiceDetails('Eleven o\'clock in the morning\nGrace Chapel, 123 Main Street, Any City');
    setOrder(cfg.defaultOrderOfService);
    setObit(cfg.defaultObituary);
    setGratitude(cfg.defaultWithGratitude);
    setPoem(cfg.defaultPoem);
    setReflections(cfg.defaultReflections);
    setPhoto('/img.png');
    setOriginalPhoto('/img.png');
    setRefreshTrigger(prev => prev + 1);
    fetch('/img.png')
      .then(res => res.arrayBuffer())
      .then(buf => {
        setPhotoBytes(new Uint8Array(buf));
        setPhotoMime('image/png');
      })
      .catch(console.error);
  }, [cfg]);

  const fileRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);

  // Fetch cross-origin stylesheets (e.g. Google Fonts) and inline the font
  // files as base64 data URIs so html-to-image can embed them in the capture.
  const buildFontEmbedCss = useCallback(async (doc: Document): Promise<string> => {
    // Stylesheet URLs can come from <link rel="stylesheet"> tags...
    const cssUrls = Array.from(
      doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
    ).filter(l => l.href).map(l => l.href);

    // ...or from @import rules inside <style> tags (how the templates load Google Fonts)
    const importRegex = /@import\s+url\((['"]?)([^'")]+)\1\)/g;
    for (const styleEl of Array.from(doc.querySelectorAll('style'))) {
      for (const m of (styleEl.textContent ?? '').matchAll(importRegex)) {
        cssUrls.push(new URL(m[2], doc.baseURI).href);
      }
    }

    const uniqueUrls = Array.from(new Set(cssUrls));

    const cssChunks = await Promise.all(uniqueUrls.map(async (cssHref) => {
      try {
        const cssText = await (await fetch(cssHref)).text();
        const urlRegex = /url\((['"]?)([^'")]+)\1\)/g;
        const urls = Array.from(new Set(
          Array.from(cssText.matchAll(urlRegex)).map(m => m[2])
        ));
        const replacements = await Promise.all(urls.map(async (u) => {
          try {
            const abs = new URL(u, cssHref).href;
            const blob = await (await fetch(abs)).blob();
            const dataUrl: string = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            return [u, dataUrl] as const;
          } catch {
            return [u, u] as const;
          }
        }));
        let inlined = cssText;
        for (const [orig, dataUrl] of replacements) {
          inlined = inlined.split(`url(${orig})`).join(`url(${dataUrl})`)
            .split(`url('${orig}')`).join(`url('${dataUrl}')`)
            .split(`url("${orig}")`).join(`url("${dataUrl}")`);
        }
        return inlined;
      } catch {
        return '';
      }
    }));

    return cssChunks.join('\n');
  }, []);

  const captureImages = useCallback(async (): Promise<string[]> => {
    if (!previewRef.current) return [];
    
    const sheetElements = previewRef.current.querySelectorAll('.sheet-group');
    if (sheetElements.length === 0) return [];

    const capturedImages = [];

    for (let i = 0; i < sheetElements.length; i++) {
      const sheet = sheetElements[i] as HTMLElement;
      const iframe = sheet.querySelector('iframe');
      const elementToCapture = (iframe && iframe.contentDocument 
        ? (iframe.contentDocument.querySelector('.page') || 
           iframe.contentDocument.querySelector('.spread') || 
           iframe.contentDocument.body) 
        : sheet) as HTMLElement;

      const originalBoxShadow = elementToCapture.style.boxShadow;
      elementToCapture.style.boxShadow = 'none';

      try {
        // Ensure fonts are loaded before capturing
        if (iframe?.contentDocument?.fonts) {
          await iframe.contentDocument.fonts.ready;
          // Explicitly load fonts if ready didn't catch them
          await Promise.all(
            Array.from(iframe.contentDocument.fonts).map(font => font.load().catch(() => {}))
          );
          // Small delay to allow layout engine to apply fonts
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        const embedCss = iframe?.contentDocument
          ? await buildFontEmbedCss(iframe.contentDocument)
          : '';
        // Never pass an empty string: it would disable html-to-image's own font embedding
        const fontEmbedCSS = embedCss.trim() ? embedCss : undefined;

        const dataUrl = await toPng(elementToCapture, {
          pixelRatio: 2,
          cacheBust: true,
          fontEmbedCSS,
        });
        capturedImages.push(dataUrl);
      } finally {
        elementToCapture.style.boxShadow = originalBoxShadow;
      }
    }
    return capturedImages;
  }, [buildFontEmbedCss]);

  const handlePrint = useCallback(async () => {
    setDownloading(true);

    try {
      const images = await captureImages();
      if (images.length === 0) return;

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print');
        return;
      }

      printWindow.document.write('<html><head><title>Print</title>');
      const pageSize = format === 'single' ? '8.5in 11in' : '11in 8.5in';
      printWindow.document.write('<style>@page { size: ' + pageSize + '; margin: 0; } html, body { margin: 0; padding: 0; } img { width: 100%; height: 100%; display: block; page-break-after: always; }</style>');
      printWindow.document.write('</head><body></body></html>');

      let loadedImages = 0;
      images.forEach((imgData) => {
        const img = printWindow.document.createElement('img');
        img.src = imgData;
        img.onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            printWindow.print();
            printWindow.close();
          }
        };
        printWindow.document.body.appendChild(img);
      });

      printWindow.document.close();
    } finally {
      setDownloading(false);
    }
  }, [format, buildFontEmbedCss]);

  // Guard against undefined templates during dev remounts
  const tpl = templates?.[tplIdx] ?? templates?.[0];

  // Fetch the selected template's HTML source
  useEffect(() => {
    if (!tpl) return;
    let cancelled = false;
    fetchTemplateHtml(tpl.htmlUrl, refreshTrigger > 0)
      .then((html) => { if (!cancelled) setTplHtml(html); })
      .catch(() => { if (!cancelled) setTplHtml(''); });
    return () => { cancelled = true; };
  }, [tpl, refreshTrigger]);

  // Load default photo bytes
  useEffect(() => {
    fetch('/img.png')
      .then(res => res.arrayBuffer())
      .then(buf => {
        setPhotoBytes(new Uint8Array(buf));
        setPhotoMime('image/png');
      })
      .catch(console.error);
  }, []);

  // Compute the preview scale from the preview column width
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const compute = () => {
      const avail = el.clientWidth - 32; // padding
      if (avail <= 0) return;
      // Landscape sheets are wider (1056px) than portrait (816px)
      const sheetW = format === 'single' ? 816 : 1056;
      const scale = Math.min(0.62, avail / sheetW);
      setPreviewScale(Math.max(0.2, scale));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [format]);

  // Update --accent on the .tool div ONLY (not the whole page)
  /*
  useEffect(() => {
    const el = toolRef.current;
    if (el && tpl) {
      el.style.setProperty('--accent', tpl.accent);
      // Compute --accent-dark and --accent-soft from the hex
      const hex = tpl.accent.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      el.style.setProperty('--accent-dark', `rgb(${Math.round(r * 0.75)},${Math.round(g * 0.75)},${Math.round(b * 0.75)})`);
      el.style.setProperty('--accent-soft', `rgb(${Math.round(r + (255 - r) * 0.88)},${Math.round(g + (255 - g) * 0.88)},${Math.round(b + (255 - b) * 0.88)})`);
    }
  }, [tpl]);
  */

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setPhoto(dataUrl);
      setOriginalPhoto(dataUrl);
      setPhotoMime(file.type);
      const byteReader = new FileReader();
      byteReader.onload = (bv) => {
        setPhotoBytes(new Uint8Array(bv.target?.result as ArrayBuffer));
      };
      byteReader.readAsArrayBuffer(file);
    };
    reader.readAsDataURL(file);
  }, []);

  const clearPhoto = useCallback(() => {
    setPhoto(null);
    setOriginalPhoto(null);
    setPhotoBytes(null);
    setPhotoMime(undefined);
    if (fileRef.current) fileRef.current.value = '';
  }, []);

  // Called when the user applies a crop in the modal. Updates the photo + bytes
  // so both the preview iframe and the PDF generator pick up the cropped image.
  const handleCropComplete = useCallback((croppedDataUrl: string, croppedBytes: Uint8Array) => {
    setPhoto(croppedDataUrl);
    setPhotoBytes(croppedBytes);
    setPhotoMime('image/jpeg');
  }, []);

  // Build the fields map for the template renderer.
  // NOTE: `photo` is NOT included here — it is applied to the iframe's
  // contentDocument after load (see SheetFrame), not embedded in the srcDoc.
  const fields: TemplateFields = useMemo(() => ({
    fullName: name,
    dates,
    serviceDate,
    serviceDetails,
    orderOfService: order,
    obituary: obit,
    withGratitude: gratitude,
    poem: format === 'trifold' ? poem : '',
    poemTitle: format === 'trifold' ? 'In Remembrance' : '',
    reflections: format === 'trifold' ? reflections : '',
    subtitle: '',
    subtitleSmall: '',
    pallbearers: '',
  }), [name, dates, serviceDate, serviceDetails, order, obit, gratitude, poem, reflections, format]);

  // Render the template into sheet srcDocs
  const sheets = useMemo(() => {
    if (!tplHtml || !tpl) return [];
    try {
      const baseUrl = tpl.htmlUrl.replace('html.html', '');
      return renderTemplate(tplHtml, format, fields, baseUrl);
    } catch {
      return [];
    }
  }, [tplHtml, tpl, format, fields]);

  // Derive a TemplatePreset for the PDF generator (uses accent colour)
  const tplPreset: TemplatePreset = useMemo(() => {
    if (!tpl) return { id: 'default', name: 'Default', accent: '#3f7d74', accentLight: '#eef4f2', headingFont: 'serif' as const };
    // Build a light tint from the accent hex
    const hex = tpl.accent.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const light = `#${Math.round(r + (255 - r) * 0.88).toString(16).padStart(2, '0')}${Math.round(g + (255 - g) * 0.88).toString(16).padStart(2, '0')}${Math.round(b + (255 - b) * 0.88).toString(16).padStart(2, '0')}`;
    return {
      id: tpl.id,
      name: tpl.name,
      accent: tpl.accent,
      accentLight: light,
      headingFont: 'serif' as const,
    };
  }, [tpl]);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const images = await captureImages();
      if (images.length === 0) return;

      // jsPDF units are points (1pt = 1/72 inch)
      // Letter: 8.5 x 11 inches = 612 x 792 points
      const orientation = format === 'single' ? 'p' : 'l';
      const pdf = new jsPDF({
        orientation,
        unit: 'in',
        format: 'letter'
      });

      images.forEach((imgData, i) => {
        if (i > 0) pdf.addPage('letter', orientation);
        // Draw image edge-to-edge (0, 0, full width, full height)
        // Letter size in inches: 8.5 x 11
        const w = orientation === 'p' ? 8.5 : 11;
        const h = orientation === 'p' ? 11 : 8.5;
        pdf.addImage(imgData, 'PNG', 0, 0, w, h);
      });

      pdf.save(`${extractLastName(name) || 'funeral'}-program.pdf`);
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Sorry, something went wrong generating the PDF. Please try again.');
    } finally {
      setDownloading(false);
    }
  }, [format, name, captureImages]);

  return (
    <div className="tool" ref={toolRef}>
      {/* FORM */}
      <div className="col-form">
        <div className="group">
          <h3>Format</h3>
          <div className="hint">Choose how the program folds. The preview updates instantly.</div>
          <div className="formats">
            <button className={format === 'single' ? 'active' : ''} onClick={() => setFormat('single')}>Single</button>
            <button className={format === 'bifold' ? 'active' : ''} onClick={() => setFormat('bifold')}>Bifold</button>
            <button className={format === 'trifold' ? 'active' : ''} onClick={() => setFormat('trifold')}>Trifold</button>
          </div>
        </div>

        <div className="group">
          <h3>Template</h3>
          <div className="hint">Pick a design. Sets the layout, artwork, and colour.</div>
          <div className="tpl-strip">
            {(templates || []).map((t, i) => (
              <div
                key={t.id}
                className={`tpl-card${i === tplIdx ? ' active' : ''}`}
                onClick={() => setTplIdx(i)}
              >
                <div className="tpl-thumb">
                  <img
                    src={t.previewUrl}
                    alt={`${t.name} template preview`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div className="t-bar" style={{ background: t.accent }} />
                </div>
                <div className="tpl-name">{t.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="group">
          <h3>In memory of</h3>
          <div className="hint">These appear on the cover.</div>
          <div className="field">
            <label className="er-label">Full name</label>
            <textarea rows={1} style={{ minHeight: 'inherit' }} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">Dates</label>
            <input type="text" value={dates} onChange={(e) => setDates(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">Service Date</label>
            <input type="text" value={serviceDate} onChange={(e) => setServiceDate(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">Service Details</label>
            <textarea value={serviceDetails} onChange={(e) => setServiceDetails(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">Photo</label>
            <div className="upload-row">
              <label className="upload-btn">
                <PlusIcon />
                Upload photo
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handlePhoto} />
              </label>
              {photo && (
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => setCropOpen(true)}
                  aria-label="Edit photo"
                >
                  <EditIcon />
                  Edit
                </button>
              )}
              {photo && <img className="thumb show" src={photo} alt="" />}
              {photo && <button className="thumb-clear show" type="button" onClick={clearPhoto}>remove</button>}
            </div>
          </div>
        </div>

        <div className="group">
          <h3>Content</h3>
          <div className="hint">The order of service, life story, and closing note.</div>
          <div className="field">
            <label className="er-label">Order of service</label>
            <textarea value={order} onChange={(e) => setOrder(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">Obituary</label>
            <textarea value={obit} onChange={(e) => setObit(e.target.value)} />
          </div>
          <div className="field">
            <label className="er-label">With Gratitude</label>
            <textarea value={gratitude} onChange={(e) => setGratitude(e.target.value)} />
          </div>
          {format === 'trifold' && (
            <>
              <div className="field">
                <label className="er-label">In Remembrance (Poem)</label>
                <textarea value={poem} onChange={(e) => setPoem(e.target.value)} />
              </div>
              <div className="field">
                <label className="er-label">Gathering (Reflections)</label>
                <textarea value={reflections} onChange={(e) => setReflections(e.target.value)} />
              </div>
            </>
          )}
        </div>


          <PrintTipsNotice />

      </div>

      {/* PREVIEW */}
      <div className="col-preview">
        <div className="preview-bar">
          <button className="pbtn" onClick={handleReset}>
            <ResetIcon />Reset
          </button>
          <button className="pbtn" onClick={handlePrint} disabled={downloading}>
            <PrintIcon />{downloading ? 'Generating…' : 'Print'}
          </button>
          <button className="pbtn primary" onClick={handleDownload} disabled={downloading}>
            <DownloadIcon />{downloading ? 'Generating…' : 'Download PDF'}
          </button>
        </div>
        <div className={`stage${sheets.length === 0 ? ' is-loading' : ''}`} ref={previewRef}>
          {sheets.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
              Loading template…
            </div>
          ) : (
            sheets.map((sheet, i) => (
              <div key={i} className={`sheet-group ${format}`}>
                <div className="sheet-label">{sheet.label}</div>
                <SheetFrame
                  srcDoc={sheet.srcDoc}
                  widthPx={sheet.widthPx}
                  heightPx={sheet.heightPx}
                  scale={previewScale}
                  photo={photo}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Photo edit modal — opens when the user clicks "Edit" on an uploaded photo */}
      <ImageCropModal
        open={cropOpen}
        imageSrc={originalPhoto}
        onCropComplete={handleCropComplete}
        onClose={() => setCropOpen(false)}
      />
    </div>
  );
}
