// ============================================================================
// MemorialPrintables — Build Templates Manifest
// Prebuild script: scans /templates/ folders, reads meta tags, writes manifest
// ============================================================================
// Usage: node scripts/build-templates-manifest.js
// Output: /public/templates-manifest.json
// ============================================================================

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.resolve(__dirname, '..', 'templates');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'public', 'templates-manifest.json');

function slugify(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractMetaFromHtml(htmlContent) {
  const result = { name: null, accent: null, order: 999 };

  const nameMatch = htmlContent.match(/<meta\s+name="mp-template"\s+content="([^"]+)"/i);
  if (nameMatch) result.name = nameMatch[1];

  const accentMatch = htmlContent.match(/<meta\s+name="mp-accent"\s+content="([^"]+)"/i);
  if (accentMatch) result.accent = accentMatch[1];

  const orderMatch = htmlContent.match(/<meta\s+name="mp-order"\s+content="(\d+)"/i);
  if (orderMatch) result.order = parseInt(orderMatch[1], 10);

  return result;
}

function main() {
  console.log('🔨 Building templates manifest...');
  console.log(`   Templates dir: ${TEMPLATES_DIR}`);

  if (!fs.existsSync(TEMPLATES_DIR)) {
    console.warn('⚠️  /templates/ directory not found. Creating empty manifest.');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2));
    return;
  }

  const folders = fs.readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  if (folders.length === 0) {
    console.warn('⚠️  No template folders found in /templates/. Writing empty manifest.');
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify([], null, 2));
    return;
  }

  const templates = [];

  for (const folder of folders) {
    const folderPath = path.join(TEMPLATES_DIR, folder);
    const htmlPath = path.join(folderPath, 'html.html');
    const previewPath = path.join(folderPath, 'preview.png');

    const hasHtml = fs.existsSync(htmlPath);
    const hasPreview = fs.existsSync(previewPath);

    if (!hasHtml || !hasPreview) {
      const missing = [];
      if (!hasHtml) missing.push('html.html');
      if (!hasPreview) missing.push('preview.png');
      console.warn(`⚠️  Skipping "${folder}" — missing: ${missing.join(', ')}`);
      continue;
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const meta = extractMetaFromHtml(htmlContent);

    const template = {
      id: slugify(meta.name || folder),
      name: meta.name || folder,
      accent: meta.accent || '#2D8B7A',
      order: meta.order,
      html: `/templates/${folder}/html.html`,
      preview: `/templates/${folder}/preview.png`,
    };

    templates.push(template);
    console.log(`   ✓ ${template.name} (id: ${template.id}, accent: ${template.accent}, order: ${template.order})`);
  }

  templates.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));

  if (templates.length === 0) {
    console.error('❌ Zero valid templates found. Build will fail.');
    process.exit(1);
  }

  const manifest = JSON.stringify(templates, null, 2);
  fs.writeFileSync(OUTPUT_PATH, manifest);
  console.log(`\n✅ Wrote ${templates.length} template(s) to ${OUTPUT_PATH}`);
}

main();
