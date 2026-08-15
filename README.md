# e-Ink Photo Painter Converter

[![Deploy to GitHub Pages](https://github.com/DerGenus/e-ink-picture-frame-converter/actions/workflows/deploy.yml/badge.svg)](https://github.com/DerGenus/e-ink-picture-frame-converter/actions/workflows/deploy.yml)

**Live app:** https://DerGenus.github.io/e-ink-picture-frame-converter/

A lightweight, single-page web app that converts images for the **Waveshare
PhotoPainter (B)** — a 7.3" 6-color e-Ink photo frame (800×480).

It quantizes any uploaded image onto the frame's 6-color palette using
**Floyd-Steinberg dithering** and produces a ready-to-use **24-bit BMP** for the
SD card.

**Privacy:** everything runs in your browser. No server, no uploads, no
telemetry — your images never leave the device.

## Features

- Drag-and-drop / browse image upload (PNG, JPG, WebP, BMP, GIF, …)
- Side-by-side preview of the **original** and the **converted** result
- Targets both supported resolutions: **800×480** (landscape) and **480×800** (portrait)
- Fitting modes: **Cover** (crop to fill) or **Contain** (fit with white bars)
- **Floyd-Steinberg** dithering or plain nearest-color quantization
- Brightness & contrast adjustment
- Horizontal flip toggle (for orientation quirks on the panel)
- One-click **Download BMP**

## Usage

1. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari). No
   build step or server required — it can also be served statically.
2. Drop an image onto the dropzone (or click to browse).
3. Adjust orientation, fitting, dithering, and color settings if desired.
4. Review the converted preview, then click **Download BMP**.
5. Copy the `.bmp` into the `pic` folder on a FAT32 SD card and insert it into
   the frame (see the Waveshare wiki Quick Start).

## Output format

The frame firmware (`GUI_BMPfile.c`) only renders a pixel when it matches one of
these **exact** RGB values; any other color is ignored. This tool therefore
maps every pixel to the nearest of these six colors:

| Color  | RGB           |
|--------|---------------|
| Black  | `0,0,0`       |
| White  | `255,255,255` |
| Yellow | `255,255,0`   |
| Red    | `255,0,0`     |
| Blue   | `0,0,255`     |
| Green  | `0,255,0`     |

The download is a standard **24-bit BMP** (RGB888, bottom-up rows, 4-byte row
alignment, 800×480 or 480×800), which opens correctly in any image viewer so you
can verify the result before transferring it to the SD card.

### Orientation note

The frame's firmware reads BMP rows sequentially and mirrors them horizontally,
then applies a rotation — so the final on-panel orientation can vary by firmware
version. If the image appears mirrored on the frame, enable **Flip horizontal**
and regenerate to compensate. The preview reflects the flip setting and matches
the downloaded BMP.

## Files

- `index.html` — UI
- `style.css` — styling
- `app.js` — loading, resizing, dithering, BMP writer, preview, download

## Reference

Algorithm and format follow the official Waveshare tooling:

- Firmware/reader: https://github.com/waveshareteam/PhotoPainter_B
- Wiki: https://www.waveshare.com/wiki/PhotoPainter
- Floyd-Steinberg guide: https://www.waveshare.com/wiki/E-Paper_Floyd-Steinberg

## Contributing

Contributions are welcome via issue reports or pull requests. See
[CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Released under the [MIT License](LICENSE).
