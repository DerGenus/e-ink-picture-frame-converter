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
    dropzoneAria:     'Upload images',
    dzTitle:          'Drop images here or <span class="accent">browse</span>',
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
flipVLabel:   'Flip horizontal',
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
    thumbsTitle:      'Uploaded images',
    newImage:         'New image',
    downloadBMP:      'Download BMP',
    downloadZip:      'Download ZIP',
    footer:           'Output is a 24-bit BMP using only the 6 e-Paper colors (Black, White, Yellow, Red, Blue, Green). Save it into the <code>pic</code> folder on the FAT32 SD card.',
    metaSource:       '{sw} × {sh} source → {dw} × {dh}',
    metaResult:       '{dw} × {dh} · {dither} · 6 colors',
    metaFs:           'Floyd-Steinberg',
    metaNone:         'nearest color',
    toastSkipped:     'Skipped {n} file(s) — unsupported format.',
    toastTooLarge:    'Skipped {n} file(s) — larger than 50 MB.',
    toastTooMany:     'Only the first {n} files were loaded.',
    toastImageRejected: 'Skipped {name} — image too large (max 100 megapixels).',
    toastLoadFailed:  'Could not load {name}.',
    errorConvert:     'Could not convert this image. Please try another file.',
    langAria:         'Language',
  },
  de: {
    title:            'e-Ink Photo Painter Konverter',
    appTitle:         'Photo Painter Konverter',
    appSubtitle:      'Waveshare 7.3" E-Ink · 6-Farben Floyd-Steinberg',
    privacy:          '100% clientseitig — Ihre Bilder verlassen niemals dieses Gerät',
    dropzoneAria:     'Bilder hochladen',
    dzTitle:          'Bilder hier ablegen oder <span class="accent">durchsuchen</span>',
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
flipVLabel:   'Horizontal spiegeln',
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
    thumbsTitle:      'Hochgeladene Bilder',
    newImage:         'Neues Bild',
    downloadBMP:      'BMP herunterladen',
    downloadZip:      'ZIP herunterladen',
    footer:           'Erzeugt ein 24-Bit BMP mit den 6 E-Paper-Farben (Schwarz, Weiß, Gelb, Rot, Blau, Grün). Speichern Sie es im Ordner <code>pic</code> auf einer FAT32-SD-Karte.',
    metaSource:       '{sw} × {sh} Quelle → {dw} × {dh}',
    metaResult:       '{dw} × {dh} · {dither} · 6 Farben',
    metaFs:           'Floyd-Steinberg',
    metaNone:         'nächste Farbe',
    toastSkipped:     'Übersprungen: {n} Datei(en) — nicht unterstütztes Format.',
    toastTooLarge:    'Übersprungen: {n} Datei(en) — größer als 50 MB.',
    toastTooMany:     'Nur die ersten {n} Dateien wurden geladen.',
    toastImageRejected: 'Übersprungen: {name} — Bild zu groß (max. 100 Megapixel).',
    toastLoadFailed:  'Konnte {name} nicht laden.',
    errorConvert:     'Dieses Bild konnte nicht konvertiert werden. Bitte versuchen Sie eine andere Datei.',
    langAria:         'Sprache',
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

// Default per-image settings, matching the initial HTML control values.
const DEFAULT_SETTINGS = {
  orientation:     '800x480',
  fitMode:         'cover',
  dithering:       'fs',
  flipV:           'off',
  brightness:      '100',
  contrast:        '100',
  ditherStrength:  '100',
  blackThreshold:  '0',
};

// Upload limits (client-side hardening against decompression bombs / DoS).
const MAX_FILES = 20;                   // max files per batch
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB per file
const MAX_PIXELS = 100 * 1000 * 1000;   // 100 megapixels per decoded image

// Only raster formats are accepted. Vector formats (SVG, ...) are rejected:
// SVGs may reference external resources, which would leak the user's IP,
// violate the "no network" privacy promise, and taint the canvas so
// getImageData() throws.
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/bmp', 'image/gif', 'image/avif'];
const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'avif'];

// Accept a file if its declared MIME type is allowed, falling back to a
// file-extension check for browsers that report an empty type.
function isSupportedImage(file) {
  if (IMAGE_TYPES.indexOf(file.type) !== -1) return true;
  const ext = (file.name || '').split('.').pop().toLowerCase();
  return IMAGE_EXTS.indexOf(ext) !== -1;
}

// Sanitize a file name for safe use as a ZIP entry name: no path separators,
// no dot segments, no control characters, capped length.
function sanitizeZipName(name) {
  const clean = (name || 'image')
    .replace(/\.[^.]+$/, '')               // strip extension
    .replace(/[\\/]/g, '_')                // path separators
    .replace(/[\u0000-\u001F\u007F]/g, '') // control characters
    .trim()
    .replace(/^\.+/, '')                   // leading dots
    .replace(/\.\./g, '.')                 // dot segments
    .slice(0, 60)
    .trim();
  return clean || 'image';
}

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
const downloadZipBtn = $('downloadZipBtn');
const resetBtn = $('resetBtn');
const thumbCard = $('thumbCard');
const thumbList = $('thumbList');
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
let sourceImage = null;      // HTMLImageElement of the selected image
let images = [];             // all loaded images: { id, name, img }
let selectedId = null;       // id of the currently selected image
let imageId = 0;             // counter for unique image ids
let resultBuffer = null;     // generated BMP ArrayBuffer
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
  e.preventDefault();
  dropzone.classList.remove('dragover');
  const files = e.dataTransfer && e.dataTransfer.files;
  if (files && files.length) loadFiles(files);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files && fileInput.files.length) loadFiles(fileInput.files);
});

function loadFiles(fileList) {
  const all = [].slice.call(fileList);
  const files = all.filter(isSupportedImage);
  if (files.length < all.length) showToast(t('toastSkipped').replace('{n}', all.length - files.length));

  let accepted = files.filter((f) => f.size <= MAX_FILE_SIZE);
  if (accepted.length < files.length) showToast(t('toastTooLarge').replace('{n}', files.length - accepted.length));
  if (accepted.length > MAX_FILES) {
    showToast(t('toastTooMany').replace('{n}', MAX_FILES));
    accepted = accepted.slice(0, MAX_FILES);
  }
  if (!accepted.length) return;

  let pending = accepted.length;
  const finish = () => {
    if (--pending > 0) return;
    $('uploadCard').hidden = true;
    thumbCard.hidden = false;
    settingsCard.hidden = false;
    previewCard.hidden = false;
    actionsCard.hidden = false;
    if (!selectedId && images.length) selectImage(images[0].id);
    else render();
  };

  accepted.forEach((file) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (!img.naturalWidth || !img.naturalHeight) {
        showToast(t('toastLoadFailed').replace('{name}', file.name));
        finish();
        return;
      }
      if (img.naturalWidth * img.naturalHeight > MAX_PIXELS) {
        showToast(t('toastImageRejected').replace('{name}', file.name));
        finish();
        return;
      }
      const entry = { id: 'img' + (++imageId), name: file.name, img, settings: Object.assign({}, DEFAULT_SETTINGS) };
      images.push(entry);
      addThumb(entry);
      finish();
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      showToast(t('toastLoadFailed').replace('{name}', file.name));
      finish();
    };
    img.src = url;
  });
}

// Build a clickable thumbnail for one image and add it to the list.
function addThumb(entry) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'thumb';
  btn.dataset.id = entry.id;

  const canvas = document.createElement('canvas');
  const iw = entry.img.naturalWidth;
  const ih = entry.img.naturalHeight;
  const scale = Math.min(92 / iw, 62 / ih);
  canvas.width = Math.max(1, Math.round(iw * scale));
  canvas.height = Math.max(1, Math.round(ih * scale));
  canvas.getContext('2d').drawImage(entry.img, 0, 0, canvas.width, canvas.height);

  const label = document.createElement('span');
  label.textContent = entry.name;
  label.title = entry.name;

  btn.appendChild(canvas);
  btn.appendChild(label);
  btn.addEventListener('click', () => selectImage(entry.id));
  thumbList.appendChild(btn);
}

// Select an image to edit and render it.
function selectImage(id) {
  const entry = images.find((e) => e.id === id);
  if (!entry) return;
  selectedId = id;
  sourceImage = entry.img;
  resultBuffer = null;
  downloadBtn.disabled = true;
  applySettingsToControls(entry.settings);
  updateThumbSelection();
  render();
}

function selectedEntry() {
  return images.find((e) => e.id === selectedId) || null;
}

// Load an image's stored settings into the DOM controls.
function applySettingsToControls(s) {
  $('orientation').value = s.orientation;
  $('fitMode').value = s.fitMode;
  $('dithering').value = s.dithering;
  $('flipV').value = s.flipV;
  brightness.value = s.brightness;
  contrast.value = s.contrast;
  ditherStrength.value = s.ditherStrength;
  blackThreshold.value = s.blackThreshold;
  brightnessVal.textContent = s.brightness + '%';
  contrastVal.textContent = s.contrast + '%';
  ditherStrengthVal.textContent = s.ditherStrength + '%';
  blackThresholdVal.textContent = s.blackThreshold;
}

function updateThumbSelection() {
  const thumbs = thumbList.querySelectorAll('.thumb');
  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].classList.toggle('selected', thumbs[i].dataset.id === selectedId);
  }
}

resetBtn.addEventListener('click', () => {
  images.forEach((entry) => entry.img.removeAttribute('src'));
  sourceImage = null;
  selectedId = null;
  images = [];
  resultBuffer = null;
  thumbList.innerHTML = '';
  $('uploadCard').hidden = false;
  thumbCard.hidden = true;
  settingsCard.hidden = true;
  previewCard.hidden = true;
  actionsCard.hidden = true;
  downloadBtn.disabled = true;
  fileInput.value = '';
});

// --- Settings -----------------------------------------------------------
let renderQueued = false;
// Throttle re-renders to at most one per animation frame (sliders fire
// 'input' continuously).
function queueRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; render(); });
}

['orientation', 'fitMode', 'dithering', 'flipV', 'brightness', 'contrast', 'ditherStrength', 'blackThreshold']
  .forEach((id) => {
    const el = $(id);
    const handler = () => {
      const entry = selectedEntry();
      if (!entry) return;
      entry.settings[id] = el.value;   // store per-image
      queueRender();
    };
    el.addEventListener('input', handler);
    el.addEventListener('change', handler);
  });

brightness.addEventListener('input', () => { brightnessVal.textContent = brightness.value + '%'; });
contrast.addEventListener('input', () => { contrastVal.textContent = contrast.value + '%'; });
ditherStrength.addEventListener('input', () => { ditherStrengthVal.textContent = ditherStrength.value + '%'; });
blackThreshold.addEventListener('input', () => { blackThresholdVal.textContent = blackThreshold.value; });

// Show a transient toast message (also used for upload rejections).
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 4000);
}

// --- Render pipeline ----------------------------------------------------
function render() {
  if (!sourceImage) return;
  try {
    const entry = selectedEntry();
    const settings = (entry && entry.settings) || DEFAULT_SETTINGS;
    const w = RESOLUTIONS[settings.orientation].width;
    const h = RESOLUTIONS[settings.orientation].height;

    // Convert the selected image (crop → adjust → quantize).
    const out = convert(sourceImage, w, h, settings);

    // Preview of the original and the converted result.
    showOriginal(originalCanvas, sourceImage);
    showPreview(resultCanvas, out, w, h, settings);
    const sw = sourceImage.naturalWidth;
    const sh = sourceImage.naturalHeight;
    originalMeta.textContent = t('metaSource')
      .replace('{sw}', sw).replace('{sh}', sh).replace('{dw}', w).replace('{dh}', h);
    resultMeta.textContent = t('metaResult')
      .replace('{dw}', w).replace('{dh}', h)
      .replace('{dither}', settings.dithering === 'fs' ? t('metaFs') : t('metaNone'));

    // Build the 24-bit BMP for download.
    resultBuffer = makeBmp(out, w, h, settings);
    downloadBtn.disabled = false;
    resultName = (settings.orientation === '480x800' ? 'portrait' : 'landscape') + '.bmp';
    hideError();
  } catch (err) {
    // Tainted canvases, oversized/invalid images, or an unavailable 2D context
    // must not silently break the app.
    resultBuffer = null;
    downloadBtn.disabled = true;
    showError(t('errorConvert'));
  }
}

function showError(msg) {
  const el = $('errorBanner');
  if (!el) return;
  el.textContent = msg;
  el.hidden = false;
}

function hideError() {
  const el = $('errorBanner');
  if (el) el.hidden = true;
}

// Run the full conversion pipeline for a given image with the given settings.
function convert(img, w, h, settings) {
  const src = preparePixels(img, w, h, settings);
  const adjusted = adjust(src, w, h, settings);
  return quantize(adjusted, w, h, settings);
}

// Prepare pixel data at the target dimensions using the selected fit mode.
function preparePixels(img, w, h, settings) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingQuality = 'high';

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  // Composite onto white so transparent PNGs don't become black artifacts.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, w, h);

  if (settings.fitMode === 'cover') {
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
  } else {
    // contain -> letterbox with white (a palette color)
    const scale = Math.min(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }
  return ctx.getImageData(0, 0, w, h).data;
}

// Apply brightness / contrast to an RGBA byte buffer.
function adjust(data, w, h, settings) {
  const b = (settings.brightness - 100) / 100;   // -0.6 .. +0.6
  const c = (settings.contrast - 100) / 100;     // -0.6 .. +0.6
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
function quantize(src, w, h, settings) {
  const out = new Uint8ClampedArray(w * h * 4);
  const strength = settings.ditherStrength / 100;   // 0..1, scales error diffusion
  const thresh = parseInt(settings.blackThreshold, 10); // 0..128 luminance cutoff

  if (settings.dithering === 'none' || strength === 0) {
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

// Draw the source image onto a canvas, scaled to a fixed preview width
// (capped height so extreme aspect ratios don't hit canvas size limits).
function showOriginal(canvas, img) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.min(800 / iw, 1200 / ih);
  canvas.width = Math.max(1, Math.round(iw * scale));
  canvas.height = Math.max(1, Math.round(ih * scale));
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Render dithered RGBA data to a canvas for preview.
function showPreview(canvas, data, w, h, settings) {
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
  if (settings.flipV === 'on') {
    // Mirror left-right so the preview matches the BMP written by makeBmp().
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
}

// ---------------------------------------------------------------------------
// 24-bit BMP writer
// ---------------------------------------------------------------------------
// Produces a standard, spec-compliant 24-bit (RGB888) BMP that displays
// correctly in any image viewer. Rows are stored bottom-up with 4-byte
// alignment, BGR byte order, as per the BMP specification.
function makeBmp(data, w, h, settings) {
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
  const flip = settings.flipV === 'on';
  for (let y = 0; y < h; y++) {
    const rowStart = o;
    for (let x = 0; x < w; x++) {
      const sx = flip ? (w - 1 - x) : x;
      const i = (y * w + sx) * 4;
      view.setUint8(o++, data[i + 2]);  // B
      view.setUint8(o++, data[i + 1]);  // G
      view.setUint8(o++, data[i]);      // R
    }
    o = rowStart + rowSize;             // skip padding to next row
  }

  return buffer;
}

// --- Download -----------------------------------------------------------
downloadBtn.addEventListener('click', () => {
  if (!resultBuffer) return;
  const url = URL.createObjectURL(new Blob([resultBuffer], { type: 'image/bmp' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = resultName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
});

downloadZipBtn.addEventListener('click', () => {
  if (!images.length) return;
  const seen = {};
  const entries = images.map((entry) => {
    const s = entry.settings || DEFAULT_SETTINGS;
    const w = RESOLUTIONS[s.orientation].width;
    const h = RESOLUTIONS[s.orientation].height;
    const out = convert(entry.img, w, h, s);
    const bytes = new Uint8Array(makeBmp(out, w, h, s));
    let base = sanitizeZipName(entry.name);
    if (seen[base]) base = base + ' (' + (++seen[base]) + ')';
    else seen[base] = 1;
    return { name: base + '.bmp', bytes };
  });

  const zipBytes = makeZip(entries);
  const url = URL.createObjectURL(new Blob([zipBytes], { type: 'application/zip' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'e-ink-photos.zip';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
});

// ---------------------------------------------------------------------------
// Minimal ZIP writer (STORED entries, no compression)
// ---------------------------------------------------------------------------
// Produces a spec-compliant ZIP archive using the STORED method. Suitable for
// BMPs, which are already raw and don't benefit meaningfully from ZIP's
// (non-DEFLATE) storage; keeps the app dependency-free and fully offline.
const CRC_TABLE = (function () {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeZip(files) {
  // files: [{ name, bytes: Uint8Array }]
  const encoder = new TextEncoder();
  const body = [];
  const central = [];
  let offset = 0;

  files.forEach((file) => {
    const nameBytes = encoder.encode(file.name);
    const crc = crc32(file.bytes);
    const size = file.bytes.length;
    const localOffset = offset;

    // Local file header (30 bytes + name + data)
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);       // version needed
    lh.setUint16(6, 0x0800, true);   // flags: bit 11 = UTF-8 file names
    lh.setUint16(8, 0, true);        // method: stored
    lh.setUint16(10, 0, true);       // mod time
    lh.setUint16(12, 0x21, true);    // mod date
    lh.setUint32(14, crc, true);
    lh.setUint32(18, size, true);    // compressed size
    lh.setUint32(22, size, true);    // uncompressed size
    lh.setUint16(26, nameBytes.length, true);
    lh.setUint16(28, 0, true);       // extra length
    body.push(new Uint8Array(lh.buffer), nameBytes, file.bytes);
    offset += 30 + nameBytes.length + size;

    // Central directory entry (46 bytes + name)
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 20, true);       // version made by
    ch.setUint16(6, 20, true);       // version needed
    ch.setUint16(8, 0x0800, true);   // flags: bit 11 = UTF-8 file names
    ch.setUint16(10, 0, true);       // method
    ch.setUint16(12, 0, true);       // mod time
    ch.setUint16(14, 0x21, true);    // mod date
    ch.setUint32(16, crc, true);
    ch.setUint32(20, size, true);
    ch.setUint32(24, size, true);
    ch.setUint16(28, nameBytes.length, true);
    ch.setUint16(30, 0, true);       // extra length
    ch.setUint16(32, 0, true);       // comment length
    ch.setUint16(34, 0, true);       // disk number
    ch.setUint16(36, 0, true);       // internal attrs
    ch.setUint32(38, 0, true);       // external attrs
    ch.setUint32(42, localOffset, true);
    central.push(new Uint8Array(ch.buffer), nameBytes);
  });

  const cdSize = central.reduce((s, c) => s + c.length, 0);
  const cdOffset = offset;

  // End of central directory record (22 bytes)
  const eocd = new DataView(new ArrayBuffer(22));
  eocd.setUint32(0, 0x06054b50, true);
  eocd.setUint16(4, 0, true);        // disk number
  eocd.setUint16(6, 0, true);        // cd start disk
  eocd.setUint16(8, files.length, true);
  eocd.setUint16(10, files.length, true);
  eocd.setUint32(12, cdSize, true);
  eocd.setUint32(16, cdOffset, true);
  eocd.setUint16(20, 0, true);       // comment length

  const total = cdOffset + cdSize + 22;
  const out = new Uint8Array(total);
  let pos = 0;
  body.concat(central, [new Uint8Array(eocd.buffer)]).forEach((chunk) => {
    out.set(chunk, pos);
    pos += chunk.length;
  });
  return out;
}
