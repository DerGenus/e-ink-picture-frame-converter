# TODO — Improvement backlog

Ideas for improving usability, stability, security and performance.
Last reviewed against `master` (commit `3de547c`).

Legend: 🔴 high priority · 🟡 medium · 🟢 nice to have

## Usability

- [x] 🔴 Guard drag-and-drop outside the dropzone (`app.js:261–273`).
      Dropping a file anywhere else on the page triggers default browser
      behavior, which replaces the app with the image and loses all loaded
      state. Add `window`-level `dragover`/`drop` `preventDefault()` plus a
      toast pointing users at the dropzone.
- [ ] 🟡 Persist language and default orientation in `localStorage`
      (`app.js:115`, `app.js:253`). `setLanguage()` always resets to `en` on
      reload. Not affected by the CSP.
- [ ] 🟡 Use the source filename for BMP downloads (`app.js:553`).
      `resultName` is always `landscape.bmp`/`portrait.bmp`; reuse
      `sanitizeZipName(entry.name)` so users can match downloads to sources.
- [ ] 🟡 Progress/busy state for ZIP generation (`app.js:820–844`).
      `downloadZipBtn` reconverts all images synchronously with no feedback
      and no double-click guard. Disable the button while generating.
- [ ] 🟡 Tighten `accept` on the file input (`index.html:33`).
      `accept="image/*"` lets users pick SVG/HEIC, which are then rejected
      after the fact. Use `accept=".png,.jpg,.jpeg,.webp,.bmp,.gif,.avif"`.
- [ ] 🟢 Make preview canvases accessible (`index.html:155,165,183`).
      Both canvases lack `role="img"` + `aria-label`; the error banner should
      have `role="alert"` so screen readers announce conversion failures.
- [ ] 🟢 "Remove all / start over" button. Currently you must delete images
      one by one; `showStartScreen()` is only reachable by removing the last
      image (`app.js:390–393`).

## Stability

- [ ] 🔴 Don't swallow conversion errors silently (`app.js:555–561`).
      `render()`'s catch discards the error object; add `console.error(err)`
      so bug reports are debuggable.
- [ ] 🔴 Downscale images at load time (`app.js:316–322`). Images up to
      100 MP are kept fully decoded in the `images` array for the whole
      session. Since the target is only 800×480, re-encode each to a capped
      working copy (e.g. max 1600 px side) at load; cuts memory ~50–100×
      with 20 files.
- [ ] 🟡 Throttle parallel file decoding (`app.js:306`). `loadFiles()` starts
      decoding all accepted files at once; a queue of 2–3 concurrent loads
      avoids memory spikes on weak devices.
- [ ] 🟡 Validate `quantize()`'s threshold against `NaN` (`app.js:640`).
      `parseInt` of a malformed settings value yields `NaN`, silently
      disabling the black threshold. Defensive `Number.isFinite` fallback.
- [ ] 🟡 Make `loadFiles()` completion bookkeeping more robust
      (`app.js:293–304`). The decrementing `pending` counter is correct, but
      a single missed `finish()` in any new code path hangs the UI cards
      forever; a per-file `Promise.all` structure is harder to get wrong.

## Security

- [ ] 🔴 Reject Windows-reserved ZIP entry names (`app.js:203–214`).
      `sanitizeZipName()` handles paths/control chars but not `CON`, `PRN`,
      `AUX`, `NUL`, `COM1–9`, `LPT1–9`. A file named `CON.bmp` breaks
      extraction on Windows. Add a reserved-name check (prefix match on
      base name).
- [ ] 🟢 Consider `require-trusted-types-for 'script'` in the CSP. The two
      `data-i18n-html` keys and the innerHTML SVG builders are fixed
      strings, so this is belt-and-suspenders; it future-proofs any new
      innerHTML use.

## Performance

- [ ] 🔴 Move the convert pipeline off the main thread (`app.js:820–833`).
      The Floyd-Steinberg loop over 384k pixels plus `makeBmp()` runs
      synchronously, and the ZIP path does it 20× back-to-back. A dedicated
      `worker.js` (works under `script-src 'self'`; no blob workers) keeps
      the UI responsive during conversions.
- [ ] 🟡 Precompute a nearest-color LUT (`app.js:707–716`). `nearest()` is
      called per pixel inside the dithering loop; a 32×32×32
      RGB→palette-index table (32 KB) is built once and turns each lookup
      into an array index.
- [ ] 🟡 Separate preview from BMP generation (`app.js:551`). `render()`
      rebuilds the full BMP ArrayBuffer on every slider `input` frame, but
      the BMP is only needed at download time. Build it lazily in the
      download click handler.
- [ ] 🟡 Cache the original preview (`app.js:540`). `showOriginal()` redraws
      on every settings change even though the original never changes;
      render it once per image selection.
- [ ] 🟢 Reuse the scratch canvas in `showPreview()` (`app.js:740–742`).
      A new temp canvas is allocated every render.

## Best practices / dev experience

- [ ] 🔴 Make the pure core testable in Node (`app.js:219–253`). Top-level
      DOM queries prevent `app.js` from loading in Node. Wrapping the
      DOM-init section in `if (typeof document !== 'undefined')` (or
      splitting pure functions into a `core.js` loaded as a second plain
      script) enables real tests for `makeBmp()`, `makeZip()`, `crc32()`,
      `sanitizeZipName()`, and `quantize()` — currently they were only
      validated once manually.
- [ ] 🟡 Add a CI check workflow. The repo has a deploy workflow but no
      check; a minimal GitHub Actions run of `node --check app.js` (plus
      the tests from the item above) prevents shipping syntax errors.
- [x] 🟢 Ignore `IDEA.md` in `.gitignore` (done — personal notes file,
      intentionally kept out of version control).
- [ ] 🟢 Add a user-facing version marker. A version string in the footer
      or a `const APP_VERSION` makes bug reports attributable to a release.
