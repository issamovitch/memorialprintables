// ============================================================================
// MemorialPrintables — Funeral Program Config Engine
// Every preset page (Catholic, Spanish, Pet, etc.) swaps in a new config object.
// The tool logic never changes — only the config.
// ============================================================================

export type Format = 'single' | 'bifold' | 'trifold';

export interface TemplatePreset {
  id: string;
  name: string;
  accent: string;          // primary accent colour (hex)
  accentLight: string;     // lighter tint for backgrounds
  headingFont: 'serif' | 'sans';
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FuneralConfig {
  slug: string;
  h1: string;
  title: string;
  meta: string;
  keywords: string[];
  templates: TemplatePreset[];
  defaultName: string;
  defaultDates: string;
  defaultOrderOfService: string;
  defaultObituary: string;
  defaultWithGratitude: string;
  defaultPoem: string;
  defaultReflections: string;
  faq: FAQItem[];
}

// ---------------------------------------------------------------------------
// Template presets (shared across all configs)
// ---------------------------------------------------------------------------
export const TEMPLATES: TemplatePreset[] = [
  { id: 'classic', name: 'Classic', accent: '#3f7d74', accentLight: '#eef4f2', headingFont: 'serif' },
  { id: 'lavender', name: 'Lavender', accent: '#7a6a8a', accentLight: '#f1edf3', headingFont: 'serif' },
  { id: 'warm', name: 'Warm', accent: '#8a6d5b', accentLight: '#f4eee9', headingFont: 'serif' },
  { id: 'slate-blue', name: 'Slate Blue', accent: '#4a6b8a', accentLight: '#eaeff4', headingFont: 'sans' },
  { id: 'rose', name: 'Rose', accent: '#9a5b5b', accentLight: '#f4e9e9', headingFont: 'serif' },
  { id: 'minimal', name: 'Minimal', accent: '#5b6663', accentLight: '#eceeee', headingFont: 'sans' },
  { id: 'sage', name: 'Sage', accent: '#6b7a4a', accentLight: '#eef0e8', headingFont: 'serif' },
];

// ---------------------------------------------------------------------------
// Default English / non-denominational config
// ---------------------------------------------------------------------------
export const DEFAULT_CONFIG: FuneralConfig = {
  slug: 'funeral-program',
  h1: 'Funeral Program Maker',
  title: 'Free Funeral Program Maker',
  meta:
    'Create a beautiful, print-ready funeral program in under a minute. Single, bifold, or trifold. No signup, no watermark. Everything stays private in your browser.',
  keywords: [
    'funeral program maker free online',
    'free funeral program template',
    'funeral program template editable',
    'funeral order of service template',
    'bifold funeral program template',
    'trifold funeral program template',
  ],
  templates: TEMPLATES,
  defaultName: 'Margaret Eleanor',
  defaultDates: '1946 —  2026',
  defaultOrderOfService: `Prelude
Opening Words
Hymn, Amazing Grace
Scripture Reading
Eulogy
Closing Prayer
Recessional`,
  defaultObituary:
    'Margaret was born in Portland and lived a life full of warmth and devotion to her family. A teacher for 30 years, she touched countless lives.',
  defaultWithGratitude:
    'The family gratefully thanks all who offered love and support during this difficult time.',
  defaultPoem:
    'Do not stand at my grave and weep,\nI am not there; I do not sleep.',
  defaultReflections:
    'Shared memories from family and friends.',
  faq: [
    {
      q: 'Do I need an account to make a program?',
      a: 'No. There is no signup, watermark, or hidden fee. Fill in the fields and download your PDF.',
    },
    {
      q: 'Is my data private?',
      a: 'Yes. Everything is generated in your browser. Your photo and details are never uploaded or saved.',
    },
    {
      q: 'What paper should I use?',
      a: 'Standard 8.5 × 11" letter paper works well. For a keepsake feel, use a heavier 80 lb cardstock.',
    },
    {
      q: 'How do I print a bifold?',
      a: 'Print double-sided on one sheet, then fold in half. The maker positions the panels so the cover lands on the front automatically.',
    },
    {
      q: 'Can I add my own photo?',
      a: 'Yes. Use the Upload photo button — it appears on the cover instantly and stays on your device.',
    },
    {
      q: 'Can I edit this in Microsoft Word?',
      a: 'This tool produces a print-ready PDF, not a Word document. If you need a .docx file, download the PDF, open Word, go to Insert → Object → Text from File, and select the PDF. Most fonts and layouts transfer cleanly. However, editing the PDF directly in a word processor will not preserve the template design — for the best results, customise everything here first, then download.',
    },
    {
      q: 'Can I edit this in Google Docs?',
      a: 'Google Docs can open PDFs (File → Open → Upload), but formatting may shift. This tool outputs a final, print-ready PDF intended for direct printing or sending to a print shop. For full control over layout and text, use the generator above to customise every field before downloading.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Geometry helpers (all measurements in inches, for display; PDF uses 72pt/in)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Catholic Funeral Program Config
// ---------------------------------------------------------------------------
export const CATHOLIC_CONFIG: FuneralConfig = {
  slug: 'catholic-funeral-program',
  h1: 'Catholic Funeral Program Maker',
  title: 'Free Catholic Funeral Program Template | No Signup',
  meta:
    'Create a Catholic funeral program with Mass order of service, prayers, and readings. Free, no signup, no watermark. Download a print-ready PDF in minutes.',
  keywords: [
    'catholic funeral program template',
    'catholic funeral program',
    'catholic mass program template',
    'catholic order of service template',
    'free catholic funeral program',
  ],
  templates: TEMPLATES,
  defaultName: 'Thomas Joseph O\'Brien',
  defaultDates: 'April 12, 1938 — December 28, 2025',
  defaultOrderOfService: `Introductory Rites
  Processional
  Sign of the Cross
  Opening Prayer
Liturgy of the Word
  First Reading — Wisdom 3:1–9
  Responsorial Psalm — Psalm 23
  Second Reading — Romans 8:35–39
  Gospel Acclamation
  Gospel — John 14:1–6
  Homily
Liturgy of the Eucharist
  Offertory
  Eucharistic Prayer
  The Lord's Prayer
  Sign of Peace
  Communion
Final Commendation
  Prayer of Commendation
  Song of Farewell
Recessional`,
  defaultObituary:
    'Thomas was a devoted husband, father, and grandfather who lived his faith every day. A lifelong parishioner at St. Mary\'s, he served his community for over forty years.',
  defaultWithGratitude:
    'The family wishes to thank Father Martin and the St. Mary\'s parish community for their prayers and support. In lieu of flowers, donations may be made to the parish food bank.',
  defaultPoem:
    'I am the resurrection and the life,\nsays the Lord.\nWhoever believes in me,\nthough he die, yet shall he live.',
  defaultReflections:
    'Prayers and memories shared by family and friends.',
  faq: [
    { q: 'Is this specifically for Catholic services?', a: 'Yes. The default order of service follows the traditional Catholic Mass format — Introductory Rites, Liturgy of the Word, Liturgy of the Eucharist, and Final Commendation. You can edit every field to match your parish\'s specific order.' },
    { q: 'Do I need an account to make a program?', a: 'No. There is no signup, watermark, or hidden fee. Fill in the fields and download your PDF.' },
    { q: 'Is my data private?', a: 'Yes. Everything is generated in your browser. Your photo and details are never uploaded or saved.' },
    { q: 'Can I change the prayers and readings?', a: 'Yes. Every field is fully editable — you can change the readings, add a psalm, or adjust the Mass order to match your parish\'s preferences.' },
  ],
};

// ---------------------------------------------------------------------------
// Celebration of Life Config
// ---------------------------------------------------------------------------
export const CELEBRATION_CONFIG: FuneralConfig = {
  slug: 'celebration-of-life-program',
  h1: 'Celebration of Life Program Maker',
  title: 'Free Celebration of Life Program Template | No Signup',
  meta:
    'Create a beautiful celebration of life program. Uplifting design, fully editable. Free, no signup, no watermark. Download a print-ready PDF in minutes.',
  keywords: [
    'celebration of life program template',
    'celebration of life program',
    'celebration of life order of service',
    'free celebration of life template',
    'memorial celebration program',
  ],
  templates: TEMPLATES,
  defaultName: 'Sarah Michelle Thompson',
  defaultDates: 'June 15, 1955 — November 10, 2025',
  defaultOrderOfService: `Welcome and Opening Words
Musical Prelude — "What a Wonderful World"
Remembrances from Family
  Tribute by David Thompson (Son)
  Tribute by Emily Rodriguez (Daughter)
Musical Interlude — "Somewhere Over the Rainbow"
Shared Memories from Friends
Closing Words and Prayer of Hope
Musical Recessional — "Here Comes the Sun"
Gathering and Refreshments`,
  defaultObituary:
    'Sarah brought light and laughter to everyone she met. An accomplished musician, devoted teacher, and loving grandmother, she believed every day was a gift worth celebrating.',
  defaultWithGratitude:
    'The family thanks everyone who joined today to celebrate Sarah\'s remarkable life. In lieu of flowers, donations may be made to the community music school.',
  defaultPoem:
    'Those we love don\'t go away,\nthey walk beside us every day.\nUnseen, unheard, but always near,\nstill loved, still missed, and very dear.',
  defaultReflections:
    'Favourite stories, memories, and moments shared by those whose lives Sarah touched.',
  faq: [
    { q: 'What is a celebration of life program?', a: 'A celebration of life program is an order-of-service booklet distributed at a memorial that focuses on honouring and celebrating the person\'s life rather than mourning their death. It typically includes a welcome message, tributes, readings, and photos.' },
    { q: 'Is this different from a traditional funeral program?', a: 'The structure is similar, but the tone is more uplifting and personal. Our templates work for both — you simply customise the wording, readings, and music to match the tone of the service.' },
    { q: 'Do I need an account?', a: 'No. The tool is completely free with no signup required.' },
    { q: 'Is my data private?', a: 'Yes. Everything runs in your browser. Nothing is uploaded to any server.' },
  ],
};

// ---------------------------------------------------------------------------
// Spanish Funeral Program Config
// ---------------------------------------------------------------------------
export const SPANISH_CONFIG: FuneralConfig = {
  slug: 'spanish-funeral-program',
  h1: 'Plantilla de Programa Fúnebre Gratuito',
  title: 'Plantilla de Programa Fúnebre Gratis | Sin Registro',
  meta:
    'Crea un programa fúnebre profesional en minutos. Gratis, sin registro, sin marca de agua. Descarga un PDF listo para imprimir.',
  keywords: [
    'plantilla de programa funebre gratis',
    'programa funebre',
    'programa de misa funebre',
    'orden de servicio funebre',
    'free spanish funeral program',
  ],
  templates: TEMPLATES,
  defaultName: 'María Elena García',
  defaultDates: '3 de marzo, 1942 — 15 de enero, 2026',
  defaultOrderOfService: `Ritos Iniciales
  Procesional
  Señal de la Cruz y Saludo
  Oración de Apertura
Liturgia de la Palabra
  Primera Lectura
  Salmo Responsorial — Salmo 23
  Segunda Lectura
  Aleluya
  Evangelio — Juan 14:1-6
  Homilía
Liturgia Eucarística
  Ofertorio
  Plegaria Eucarística
  Padre Nuestro
  Rito de la Paz
  Comunión
Ritos Finales
  Oración de Despedida
  Canción de Despedida
  Procesional de Salida`,
  defaultObituary:
    'María Elena dedicó su vida a su familia y a su fe. Nacida en Guadalajara, fue una maestra, cocinera extraordinaria, y el corazón de su comunidad por más de cincuenta años.',
  defaultWithGratitude:
    'La familia agradece al Padre Ruiz y a la comunidad parroquial por sus oraciones y apoyo. En lugar de flores, se aceptan donaciones para el fondo de becas de la parroquia.',
  defaultPoem:
    'No llores a mi tumba,\nno estoy allí, no duermo.\nSoy las mil brisas que soplan,\nel brillo de los diamantes sobre la nieve.',
  defaultReflections:
    'Oraciones y recuerdos compartidos por familiares y amigos.',
  faq: [
    { q: '¿Es gratis?', a: 'Sí, completamente. Sin registro, sin marca de agua, sin costo alguno.' },
    { q: '¿Puedo editar el orden de la misa?', a: 'Sí. Todos los campos son editables — puedes cambiar las lecturas, los salmos, y el orden para que coincida con el de tu parroquia.' },
    { q: '¿Mis datos están seguros?', a: 'Sí. Todo se genera en tu navegador. Ningún dato se sube a ningún servidor.' },
    { q: '¿Puedo descargar como PDF?', a: 'Sí. El programa se descarga como un PDF listo para imprimir en papel carta estándar.' },
  ],
};

// ---------------------------------------------------------------------------
// Pet Memorial Program Config
// ---------------------------------------------------------------------------
export const PET_CONFIG: FuneralConfig = {
  slug: 'pet-memorial-program',
  h1: 'Pet Memorial Program Maker',
  title: 'Free Pet Memorial Program Template | No Signup',
  meta:
    'Create a heartfelt pet memorial program. Honour your beloved companion with a beautiful keepsake. Free, no signup. Download a print-ready PDF.',
  keywords: [
    'pet memorial program template',
    'pet memorial service program',
    'dog memorial program',
    'cat memorial program',
    'pet funeral program',
  ],
  templates: TEMPLATES,
  defaultName: 'Buddy',
  defaultDates: '2010 — 2025',
  defaultOrderOfService: `Welcome and Opening Words
Moment of Silence
Reading — "The Rainbow Bridge"
Sharing Favourite Memories
  From the Family
  From Friends
Photo Montage / Slideshow
Closing Words and Tribute
Final Farewell`,
  defaultObituary:
    'Buddy was more than a pet — he was family. For fifteen years, his gentle spirit and unwavering loyalty brought joy to everyone he met. He will be deeply missed.',
  defaultWithGratitude:
    'The family thanks everyone who loved and cared for Buddy over the years. Donations in his memory may be made to the local animal rescue.',
  defaultPoem:
    'Just this side of heaven is a place called Rainbow Bridge.\nWhen an animal dies that has been especially close to someone here,\nthat pet goes to Rainbow Bridge.',
  defaultReflections:
    'Favourite memories, photos, and stories of Buddy shared by those who loved him.',
  faq: [
    { q: 'Can I use this for any type of pet?', a: 'Yes. The template works for dogs, cats, horses, birds, and any other companion. Simply edit the name, dates, and content to suit your beloved friend.' },
    { q: 'Do I need an account?', a: 'No. The tool is completely free with no signup required.' },
    { q: 'Is my data private?', a: 'Yes. Everything runs in your browser. Nothing is uploaded to any server.' },
    { q: 'What size paper should I use?', a: 'Standard 8.5 × 11" letter paper works well. For a keepsake feel, use a heavier cardstock.' },
  ],
};

// ---------------------------------------------------------------------------
// Helper: get config by slug
// ---------------------------------------------------------------------------
export const CONFIGS: Record<string, FuneralConfig> = {
  'funeral-program': DEFAULT_CONFIG,
  'catholic-funeral-program': CATHOLIC_CONFIG,
  'celebration-of-life-program': CELEBRATION_CONFIG,
  'spanish-funeral-program': SPANISH_CONFIG,
  'pet-memorial-program': PET_CONFIG,
};
export const SHEET = { w: 11, h: 8.5 } as const; // landscape sheet for bifold/trifold
export const SHEET_SINGLE = { w: 8.5, h: 11 } as const; // portrait for single

export function panelWidth(format: Format): number {
  switch (format) {
    case 'single':
      return SHEET_SINGLE.w;
    case 'bifold':
      return SHEET.w / 2; // 5.5
    case 'trifold':
      return SHEET.w / 3; // 3.6667
  }
}

export function panelHeight(format: Format): number {
  return format === 'single' ? SHEET_SINGLE.h : SHEET.h; // 11 for folded, 8.5 for single
}

export function sheetWidth(format: Format): number {
  return format === 'single' ? SHEET_SINGLE.w : SHEET.w;
}

export function sheetHeight(format: Format): number {
  return format === 'single' ? SHEET_SINGLE.h : SHEET.h;
}

/** Panel labels for display */
export function outsideLabels(format: Format): string[] {
  switch (format) {
    case 'single':
      return ['Front (Cover)'];
    case 'bifold':
      return ['Back Cover', 'Front Cover'];
    case 'trifold':
      return ['Back Panel', 'Inside Flap', 'Front Cover'];
  }
}

export function insideLabels(format: Format): string[] {
  switch (format) {
    case 'single':
      return ['Back Content'];
    case 'bifold':
      return ['Inside Left', 'Inside Right'];
    case 'trifold':
      return ['Order of Service', 'Obituary', 'Reflections'];
  }
}

// ---------------------------------------------------------------------------
// Utility: extract last name from full name for PDF filename
// ---------------------------------------------------------------------------
export function extractLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : 'program';
}
