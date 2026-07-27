# Build Prompt: Folder-Based Template System (MemorialPrintables.com)

Add a drop-in template system to the funeral program maker. Each template is a folder. Dropping a new folder into `/templates/` and redeploying makes it appear in the picker automatically, with zero code changes. A working reference template (`html.html`) is attached; build the system to consume files exactly like it.

\---

## 1\. Folder convention

```
/templates/

&#x20; /Funeral.Programs
    Classic/
      html.html      (the full design: single + bifold + trifold, with data-field placeholders)
      preview.png     (thumbnail shown in the picker, \~5.5:7 ratio)
    Lavender/
      html.html
      preview.png
  ...
```

* The folder name is the human name. Slugify it for the id (`"Slate Blue"` to `slate-blue`), keep the original as a display fallback.
* A template is valid only if it has BOTH `html.html` and `preview.png`. Skip and warn on any folder missing either.

\---

## 2\. Build-time manifest (this is how "auto-appears" works on a static site)

A static site cannot read a directory at runtime, so generate a manifest at build time.

Write `scripts/build-templates-manifest.js` that runs as a prebuild step:

1. Glob `/templates/\*/`.
2. For each folder, verify `html.html` and `preview.png` exist (skip + console.warn if not).
3. Parse the `html.html` head for these meta tags and use them in the manifest:

   * `<meta name="mp-template" content="Classic">` to display name
   * `<meta name="mp-accent" content="#3f7d74">` to accent colour
   * `<meta name="mp-order" content="10">` to sort order (ascending; default 999)
4. Fall back to the folder name if `mp-template` is absent.
5. Write `/public/templates-manifest.json`:

```json
\[
  { "id": "classic", "name": "Classic", "accent": "#3f7d74", "order": 10,
    "html": "/templates/Classic/html.html", "preview": "/templates/Classic/preview.png" }
]
```

6. Sort by `order`, then `name`. Fail the build loudly only if zero valid templates are found.

Wire this into the build command (e.g. `"prebuild": "node scripts/build-templates-manifest.js"`) so every deploy regenerates the manifest.

\---

## 3\. The data-field contract (how the app fills a template)

The `html.html` holds real sample content inside elements marked with `data-field="..."`. The app replaces that content with the family's input. Never invent fields the template does not contain; never crash if a field is missing from a given template.

Field bindings:

|data-field|how the app fills it|
|-|-|
|`fullName`|set `textContent`|
|`dates`|set `textContent`|
|`orderOfService`|set `textContent` (element already has `white-space:pre-line`)|
|`obituary`|set `textContent`|
|`acknowledgments`|set `textContent`|
|`poem`|set `textContent`|
|`reflections`|set `textContent`|
|`photo`|set inline `style.backgroundImage = url(<dataURL>)`|

Rules:

* Bind by attribute, not by position. A template may have more or fewer fields; fill the ones present, leave the rest alone.
* `photo` is a data URL from the in-browser upload. Never upload it anywhere.
* The form on the page drives these fields live.

\---

## 4\. Format blocks (single / bifold / trifold in one file)

Each `html.html` contains three top-level blocks:

```html
<div data-format="single"> ... </div>
<div data-format="bifold"> ... </div>
<div data-format="trifold"> ... </div>
```

Geometry is baked into the template CSS at true print size:

* single: 8.5 x 11 in portrait, two pages.
* bifold: 11 x 8.5 in landscape, panels exactly 5.5 x 8.5 in. Outside = \[ back | cover ], inside = \[ order | obituary ].
* trifold: 11 x 8.5 in landscape, panels exactly 3.6667 in wide. Outside = \[ back | poem | cover ], inside = \[ order | obituary | reflections ].

When the user picks a format, the app shows only the matching `\[data-format]` block in the preview and export; the others are hidden. Do not alter the template's panel widths in code; the template owns geometry.

\---

## 5\. Loading a template into the live preview

1. Fetch the selected template's `html` URL as text.
2. Parse with `DOMParser`.
3. Strip anything with class starting `mp-editor` and the `.mp-fmt-label` / `.mp-sheet-label` helpers (those are standalone-preview chrome only).
4. Extract the active `\[data-format]` block plus the template's `<style>`.
5. Fill every `\[data-field]` from the current form state.
6. Apply the template accent (from the manifest) to the page's `--accent` variable so the rest of the UI matches.
7. Inject into the sticky preview stage. Re-run fill on every keystroke.

The picker shows each template's `preview.png` as its thumbnail; clicking one swaps the active template and re-renders.

\---

## 6\. PDF export (IMPORTANT: replaces the pdf-lib approach)

Templates are arbitrary HTML/CSS, which pdf-lib cannot render. To keep the exported PDF pixel-identical to the preview:

* **Download PDF:** render the active, filled `\[data-format]` block(s) with **html2canvas** at a high scale (2x to 3x, \~200 to 300 DPI equivalent), then place each rendered sheet into **jsPDF** at the exact sheet size (single = 8.5 x 11 portrait; bifold/trifold = 11 x 8.5 landscape), one sheet per page. `html2pdf.js` may be used as a convenience wrapper.
* Render each sheet off-screen at true print pixel dimensions (e.g. 8.5in x 96 = 816px width baseline, multiplied by the scale factor) so text stays crisp and panels land at correct widths.
* Draw faint dashed fold guides between panels (already present in the template) so families fold accurately.
* Filename: `funeral-program-\[lastname].pdf`, fallback `funeral-program.pdf`.
* **Also keep a Print button** using `window.print()` with `@page` set to the sheet size, for users who want native vector output. The template already includes a print stylesheet.

Trade-off to accept: html2canvas output is raster, so PDF text is not selectable. For a 1 to 2 page keepsake, visual fidelity to the chosen design matters more than selectable text. This is the correct call for a template-driven tool.

\---

## 7\. Acceptance checklist

* \[ ] Adding a folder with `html.html` + `preview.png` and redeploying makes it appear in the picker with no code change.
* \[ ] Folders missing either file are skipped with a build warning, not a crash.
* \[ ] Manifest reads name/accent/order from the html meta tags, folder-name fallback works.
* \[ ] Opening any `html.html` directly in a browser shows a real, styled, editable program (all three formats visible).
* \[ ] App fills `\[data-field]` elements by attribute; missing fields never break rendering.
* \[ ] Selected format shows the correct single/bifold/trifold block at true ratios (trifold panels 3.6667 in).
* \[ ] Download PDF is pixel-identical to the preview and sized to the correct sheet.
* \[ ] Print button produces correctly folded output via the browser.
* \[ ] Template accent flows into the page `--accent`.
* \[ ] Photo stays in-browser; nothing uploaded.
SEO note: this system is invisible to SEO (client-side rendering of templates is fine because the page's indexable copy and schema come from the server-rendered body, not the templates).

