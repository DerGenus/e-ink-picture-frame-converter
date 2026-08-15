'use strict';

// ---------------------------------------------------------------------------
// i18n — translations
// ---------------------------------------------------------------------------
const LANG = {
  en: {
    title:            'e-Ink Photo Painter Converter',
    appTitle:         'Photo Painter Converter',
    appSubtitle:      'Waveshare 7.3" e-Ink · 6-color Floyd-Steinberg',
    privacy:          '100% client-side — your images never leave this device',
    dropzoneAria:     'Upload an image',
    dzTitle:          'Drop an image here or <span class="accent">browse</span>',
    dzSub:            'PNG, JPG, WebP, BMP … converted to 800×480 / 480×800 24-bit BMP',
    orientation:      'Orientation',
    orientationLandscape: 'Landscape · 800 × 480',
    orientationPortrait:  'Portrait · 480 × 800',
    fitting:          'Fitting',
    fitCover:         'Cover (crop to fill)',
    fitContain:       'Contain (fit, white bars)',
    ditheringLabel:   'Dithering',
    ditherFS:         'Floyd-Steinberg',
    ditherNone:       'None (nearest color)',
    flipVLabel:       'Flip vertical',
    flipOff:          'Off',
    flipOn:           'On',
    brightnessLabel:  'Brightness',
    contrastLabel:    'Contrast',
    ditherStrengthLabel: 'Dither strength',
    blackThresholdLabel:  'Black threshold',
    helpAria:             'Help',
    brightnessHelp:       'Adjusts overall brightness before color conversion.',
    contrastHelp:         'Adjusts the difference between light and dark areas.',
    ditherStrengthHelp:   'Controls how strongly Floyd-Steinberg error diffusion is applied. Higher values add more texture, lower values look smoother.',
    blackThresholdHelp:   'Pixels darker than this luminance are forced to pure black without dithering.',
    original:         'Original',
    converted:        'Converted',
    newImage:         'New image',
    downloadBMP:      'Download BMP',
    footer:           'Output is a 24-bit BMP using only the 6 e-Paper colors (Black, White, Yellow, Red, Blue, Green). Save it into the <code>pic</code> folder on the FAT32 SD card.',
    metaSource:       '{sw} × {sh} source → {dw} × {dh}',
    metaResult:       '{dw} × {dh} · {dither} · 6 colors',
    metaFs:           'Floyd-Steinberg',
    metaNone:         'nearest color',
  },
  de: {
    title:            'e-Ink Photo Painter Konverter',
    appTitle:         'Photo Painter Konverter',
    appSubtitle:      'Waveshare 7.3" E-Ink · 6-Farben Floyd-Steinberg',
    privacy:          '100% clientseitig — Ihre Bilder verlassen niemals dieses Gerät',
    dropzoneAria:     'Bild hochladen',
    dzTitle:          'Bild hier ablegen oder <span class="accent">durchsuchen</span>',
    dzSub:            'PNG, JPG, WebP, BMP … konvertiert zu 800×480 / 480×800 24-Bit BMP',
    orientation:      'Ausrichtung',
    orientationLandscape: 'Querformat · 800 × 480',
    orientationPortrait:  'Hochformat · 480 × 800',
    fitting:          'Anpassung',
    fitCover:         'Bild füllen (Zuschneiden)',
    fitContain:       'Anpassen (weiße Ränder)',
    ditheringLabel:   'Dithering',
    ditherFS:         'Floyd-Steinberg',
    ditherNone:       'Kein Dithering (nächste Farbe)',
    flipVLabel:       'Vertikal spiegeln',
    flipOff:          'Aus',
    flipOn:           'An',
    brightnessLabel:  'Helligkeit',
    contrastLabel:    'Kontrast',
    ditherStrengthLabel: 'Dither-Stärke',
    blackThresholdLabel:  'Schwarzschwelle',
    helpAria:             'Hilfe',
    brightnessHelp:       'Passt die Gesamthelligkeit des Bildes vor der Farbkonvertierung an.',
    contrastHelp:         'Passt den Unterschied zwischen hellen und dunklen Bereichen an.',
    ditherStrengthHelp:   'Steuert, wie stark die Floyd-Steinberg-Fehlerverteilung angewendet wird. Höhere Werte erzeugen mehr Textur, niedrigere wirken glatter.',
    blackThresholdHelp:   'Pixel, die dunkler als dieser Helligkeitswert sind, werden ohne Dithering rein schwarz.',
    original:         'Original',
    converted:        'Konvertiert',
    newImage:         'Neues Bild',
    downloadBMP:      'BMP herunterladen',
    footer:           'Erzeugt ein 24-Bit BMP mit den 6 E-Paper-Farben (Schwarz, Weiß, Gelb, Rot, Blau, Grün). Speichern Sie es im Ordner <code>pic</code> auf einer FAT32-SD-Karte.',
    metaSource:       '{sw} × {sh} Quelle → {dw} × {dh}',
    metaResult:       '{dw} × {dh} · {dither} · 6 Farben',
    metaFs:           'Floyd-Steinberg',
    metaNone:         'nächste Farbe',
  },
};

let currentLang = 'en';

function t(key) {
  return LANG[currentLang][key] ?? LANG.en[key] ?? '';
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  // Translate all elements with data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  // Elements with data-i18n-html (innerHTML — may contain markup)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  // Elements with data-i18n-aria (aria-label)
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });
  // Update dynamic labels in render() if an image is loaded
  if (sourceImage) render();
}

// The 6 recognized e-Paper colors (RGB). The device's firmware only maps a
// pixel when it matches one of these exact values, so the image must be
// quantized (and ideally dithered) onto this palette.
const PALETTE = [
  { r: 0,   g: 0,   b: 0   },   // Black
  { r: 255, g: 255, b: 255 },   // White
  { r: 255, g: 255, b: 0   },   // Yellow
  { r: 255, g: 0,   b: 0   },   // Red
  { r: 0,   g: 0,   b: 255 },   // Blue
  { r: 0,   g: 255, b: 0   },   // Green
];

const RESOLUTIONS = {
  '800x480': { width: 800, height: 480 },
  '480x800': { width: 480, height: 800 },
};

// --- DOM ----------------------------------------------------------------
const $ = (id) => document.getElementById(id);

const dropzone = $('dropzone');
const fileInput = $('fileInput');
const settingsCard = $('settingsCard');
const previewCard = $('previewCard');
const actionsCard = $('actionsCard');
const originalCanvas = $('originalCanvas');
const resultCanvas = $('resultCanvas');
const originalMeta = $('originalMeta');
const resultMeta = $('resultMeta');
const downloadBtn = $('downloadBtn');
const resetBtn = $('resetBtn');
const brightness = $('brightness');
const contrast = $('contrast');
const brightnessVal = $('brightnessVal');
const contrastVal = $('contrastVal');
const ditherStrength = $('ditherStrength');
const ditherStrengthVal = $('ditherStrengthVal');
const blackThreshold = $('blackThreshold');
const blackThresholdVal = $('blackThresholdVal');
const langSelect = $('langSelect');

// --- State --------------------------------------------------------------
let sourceImage = null;      // HTMLImageElement
let resultBlob = null;       // generated BMP blob
let resultName = 'photo.bmp';

langSelect.addEventListener('change', () => setLanguage(langSelect.value));
setLanguage(langSelect.value);

// --- File loading -------------------------------------------------------
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); }
});

['dragenter', 'dragover'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add('dragover'); })
);
['dragleave', 'drop'].forEach((ev) =>
  dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.remove('dragover'); })
);

dropzone.addEventListener('drop', (e) => {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadFile(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files && fileInput.files[0]) loadFile(fileInput.files[0]);
});

function loadFile(file) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    sourceImage = img;
    resultBlob = null;
    downloadBtn.disabled = true;
    $('uploadCard').hidden = true;
    settingsCard.hidden = false;
    previewCard.hidden = false;
    actionsCard.hidden = false;
    render();
  };
  img.onerror = () => alert('Could not load that image file.');
  img.src = url;
}

resetBtn.addEventListener('click', () => {
  sourceImage = null;
  resultBlob = null;
  $('uploadCard').hidden = false;
  settingsCard.hidden = true;
  previewCard.hidden = true;
  actionsCard.hidden = true;
  downloadBtn.disabled = true;
  fileInput.value = '';
});

// --- Settings -----------------------------------------------------------
['orientation', 'fitMode', 'dithering', 'flipV', 'brightness', 'contrast', 'ditherStrength', 'blackThreshold']
  .forEach((id) => {
    const el = $(id);
    el.addEventListener('input', () => { if (sourceImage) render(); });
    el.addEventListener('change', () => { if (sourceImage) render(); });
  });

brightness.addEventListener('input', () => { brightnessVal.textContent = brightness.value + '%'; });
contrast.addEventListener('input', () => { contrastVal.textContent = contrast.value + '%'; });
ditherStrength.addEventListener('input', () => { ditherStrengthVal.textContent = ditherStrength.value + '%'; });
blackThreshold.addEventListener('input', () => { blackThresholdVal.textContent = blackThreshold.value; });

// --- Render pipeline ----------------------------------------------------
function render() {
  if (!sourceImage) return;
  const res = RESOLUTIONS[$('orientation').value];
  const w = res.width;
  const h = res.height;

  // 1. Build source pixels at target size (crop or letterbox).
  const src = preparePixels(w, h);
  // 2. Brightness / contrast adjustment.
  const adjusted = adjust(src, w, h);
  // 3. Quantize (and optionally dither) to the 6-color palette.
  const out = quantize(adjusted, w, h);

  // Preview of the original and the converted result.
  showOriginal(originalCanvas, sourceImage);
  showPreview(resultCanvas, out, w, h);
  const sw = sourceImage.naturalWidth;
  const sh = sourceImage.naturalHeight;
  originalMeta.textContent = t('metaSource')
    .replace('{sw}', sw).replace('{sh}', sh).replace('{dw}', w).replace('{dh}', h);
  resultMeta.textContent = t('metaResult')
    .replace('{dw}', w).replace('{dh}', h)
    .replace('{dither}', $('dithering').value === 'fs' ? t('metaFs') : t('metaNone'));

  // Build the 24-bit BMP for download.
  resultBlob = makeBmp(out, w, h);
  downloadBtn.disabled = false;
  resultName = ($('orientation').value === '480x800' ? 'portrait' : 'landscape') + '.bmp';
}

// Prepare pixel data at the target dimensions using the selected fit mode.
function preparePixels(w, h) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingQuality = 'high';

  const iw = sourceImage.naturalWidth;
  const ih = sourceImage.naturalHeight;

  if ($('fitMode').value === 'cover') {
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(sourceImage, sx, sy, sw, sh, 0, 0, w, h);
  } else {
    // contain -> letterbox with white (a palette color)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    const scale = Math.min(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(sourceImage, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }
  return ctx.getImageData(0, 0, w, h).data;
}

// Apply brightness / contrast to an RGBA byte buffer.
function adjust(data, w, h) {
  const b = (brightness.value - 100) / 100;   // -0.6 .. +0.6
  const c = (contrast.value - 100) / 100;     // -0.6 .. +0.6
  if (b === 0 && c === 0) return data;

  const factor = 259 * (c + 255) / (255 * (259 - 255 * c));
  const out = new Uint8ClampedArray(data);
  for (let i = 0; i < data.length; i += 4) {
    for (let ch = 0; ch < 3; ch++) {
      let v = data[i + ch];
      if (b !== 0) v = v + 255 * b;
      if (c !== 0) v = factor * (v - 128) + 128;
      out[i + ch] = v;
    }
  }
  return out;
}

// Map every pixel to its nearest palette color. Optionally run Floyd-Steinberg
// dithering, which distributes quantization error to neighbouring pixels so
// the limited palette can approximate smooth gradients.
function quantize(src, w, h) {
  const out = new Uint8ClampedArray(w * h * 4);
  const strength = ditherStrength.value / 100;   // 0..1, scales error diffusion
  const thresh = parseInt(blackThreshold.value, 10); // 0..128 luminance cutoff

  if ($('dithering').value === 'none' || strength === 0) {
    for (let i = 0; i < w * h; i++) {
      const r = src[i * 4], g = src[i * 4 + 1], b = src[i * 4 + 2];
      const c = nearest(r, g, b);
      out[i * 4] = c.r; out[i * 4 + 1] = c.g; out[i * 4 + 2] = c.b; out[i * 4 + 3] = 255;
    }
    return out;
  }

  // Floyd-Steinberg with error diffusion (per channel, float buffer).
  const len = w * h * 4;
  const buf = new Float32Array(len);
  for (let i = 0; i < len; i++) buf[i] = src[i];

  const idx = (x, y) => (y * w + x) * 4;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = idx(x, y);
      const r = buf[p], g = buf[p + 1], b = buf[p + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Snap dark pixels straight to clean black, skipping dithering.
      if (thresh > 0 && lum < thresh) {
        out[p] = 0; out[p + 1] = 0; out[p + 2] = 0; out[p + 3] = 255;
        continue;
      }

      const c = nearest(r, g, b);

      out[p] = c.r; out[p + 1] = c.g; out[p + 2] = c.b; out[p + 3] = 255;

      const er = (r - c.r) * strength, eg = (g - c.g) * strength, eb = (b - c.b) * strength;
      if (x + 1 < w) {
        const q = idx(x + 1, y);
        buf[q]     += er * 7 / 16;
        buf[q + 1] += eg * 7 / 16;
        buf[q + 2] += eb * 7 / 16;
      }
      if (y + 1 < h) {
        if (x > 0) {
          const q = idx(x - 1, y + 1);
          buf[q]     += er * 3 / 16;
          buf[q + 1] += eg * 3 / 16;
          buf[q + 2] += eb * 3 / 16;
        }
        {
          const q = idx(x, y + 1);
          buf[q]     += er * 5 / 16;
          buf[q + 1] += eg * 5 / 16;
          buf[q + 2] += eb * 5 / 16;
        }
        if (x + 1 < w) {
          const q = idx(x + 1, y + 1);
          buf[q]     += er * 1 / 16;
          buf[q + 1] += eg * 1 / 16;
          buf[q + 2] += eb * 1 / 16;
        }
      }
    }
  }
  return out;
}

// Nearest color in the 6-color palette by Euclidean distance.
function nearest(r, g, b) {
  let best = PALETTE[0];
  let bestD = Infinity;
  for (const c of PALETTE) {
    const dr = r - c.r, dg = g - c.g, db = b - c.b;
    const d = dr * dr + dg * dg + db * db;
    if (d < bestD) { bestD = d; best = c; }
  }
  return best;
}

// Draw the source image onto a canvas, scaled to a fixed preview width.
function showOriginal(canvas, img) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = 800 / iw;
  canvas.width = iw * scale;
  canvas.height = ih * scale;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Render dithered RGBA data to a canvas for preview.
function showPreview(canvas, data, w, h) {
  const scale = 800 / w;              // fixed-width preview
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(w, h);
  img.data.set(data);
  const tmp = document.createElement('canvas');
  tmp.width = w; tmp.height = h;
  tmp.getContext('2d').putImageData(img, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
}

// ---------------------------------------------------------------------------
// 24-bit BMP writer
// ---------------------------------------------------------------------------
// Produces a standard, spec-compliant 24-bit (RGB888) BMP that displays
// correctly in any image viewer. Rows are stored bottom-up with 4-byte
// alignment, BGR byte order, as per the BMP specification.
function makeBmp(data, w, h) {
  const rowSize = Math.floor((w * 3 + 3) / 4) * 4;
  const pixelArraySize = rowSize * h;
  const fileSize = 54 + pixelArraySize;
  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  let o = 0;
  const writeU16 = (v) => { view.setUint16(o, v, true); o += 2; };
  const writeU32 = (v) => { view.setUint32(o, v, true); o += 4; };

  // BITMAPFILEHEADER (14 bytes)
  view.setUint8(o++, 0x42);            // 'B'
  view.setUint8(o++, 0x4D);            // 'M'
  writeU32(fileSize);
  writeU32(0);                          // reserved
  writeU32(54);                         // pixel data offset

  // BITMAPINFOHEADER (40 bytes)
  writeU32(40);                         // header size
  writeU32(w);
  writeU32(h);
  writeU16(1);                          // planes
  writeU16(24);                         // bit count
  writeU32(0);                          // compression = BI_RGB
  writeU32(pixelArraySize);
  writeU32(2835);                       // ~72 dpi
  writeU32(2835);
  writeU32(0);                          // colors used
  writeU32(0);                          // important colors

  // Pixel data: bottom-up, BGR.
  const flip = $('flipV').value === 'on';
  for (let y = 0; y < h; y++) {
    const srcY = flip ? (h - 1 - y) : y;
    const rowStart = o;
    for (let x = 0; x < w; x++) {
      const i = (srcY * w + x) * 4;
      view.setUint8(o++, data[i + 2]);  // B
      view.setUint8(o++, data[i + 1]);  // G
      view.setUint8(o++, data[i]);      // R
    }
    o = rowStart + rowSize;             // skip padding to next row
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

// --- Download -----------------------------------------------------------
downloadBtn.addEventListener('click', () => {
  if (!resultBlob) return;
  const url = URL.createObjectURL(resultBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = resultName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
});
