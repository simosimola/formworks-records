# Formworks Brand Book

Reference for any new content or change on the site. It is derived from the current site (`css/styles.css`, `js/main.js`, the HTML pages, `resources/`). When this document and the code disagree, fix the one that is wrong, and keep the two in sync.

---

## 1. Who we are

**Formworks** is an independent record label releasing experimental electronic music: jungle, IDM, breakcore and other experimental genres.

- **Tagline / site headline:** *Digital Oddities*
- **Boilerplate:** "Formworks is an independent record label mainly releasing experimental electronic music."
- **Contact (submissions & inquiries):** info@formworksrecords.xyz
- **Social:** Instagram, https://www.instagram.com/formworksrecords/
- **Legal footer:** `© 2026 Formworks. All rights reserved.` (update the year when it changes)

## 2. The concept: the site is a Mac OS X 10.3 "Panther" Finder window

The whole site is one Aqua-era Finder window: brushed-metal title bar, glass traffic lights, source-list sidebar, pinstripe content pane, gel buttons, icon-view and list-view panels. The label is the "disk"; artists are folders; releases are files; the catalogue is a list view. Everything is drawn in CSS/SVG, with no UI framework and no external UI images.

**Design test for anything new:** *could this plausibly exist in a 2003 Finder or Aqua app?* If it would look like a modern flat web component (flat cards, pill tags, big shadows, gradients that aren't gloss), it doesn't belong.

Metaphor mapping, so new content picks the right pattern:

| Label concept | Finder metaphor | Pattern |
|---|---|---|
| Home | Welcome dialog + nested utility window | `.hero`, `.utility` |
| Artists | Folders in an icon view | `.area` > `.iconview` > `.grid` > `.file` |
| A release | A file / document | landing page `.landing` |
| Catalogue | List view with blue striped rows | `.list` |
| External links | Source-list "Links" group | `.sidebar` `.group` |
| Errors | Alert dialog | `.error` |
| Footer | Status bar | `.statusbar` |

## 3. Voice and copy

- Plain, short, factual. Label-speak, not hype: no exclamation marks, no emoji, no marketing superlatives.
- Calls to action are verbs of listening/browsing: *Hear the latest release*, *View the roster*, *View artist*, *Listen*, *View Releases*.
- The 404 voice is lightly dry and technical: "Signal Not Found", "The path you requested does not exist in this catalog."
- Titles use sentence/proper case, with real names exactly as written (see §4).
- Use a real arrow `←` for back links ("← Back to Artists", "← Return Home").
- Spelling: American English (`catalog` appears in UI text; `Catalogue` is the nav/page name, so keep each as it is used).

### Names, exactly as written

| Thing | Write it as |
|---|---|
| Label | **Formworks** (title case in text). Wordmark graphic uses the reversed R: **FOЯMWORKS** |
| Artists | **Wasteman**, **Braník** (with the diacritic), **808 and Afraid** (never "808 & Afraid", never "808andafraid" in visible text) |
| Release | **3D in '93 EP** (straight apostrophe in HTML text, in the `<title>`, and in alt text) |

## 4. Catalogue and ID numbering

Codes are shown in small muted tabular-number text above or below titles.

- **Artists:** `A-01`, `A-02`, `A-03`, … in the order added (Wasteman A-01, Braník A-02, 808 and Afraid A-03). Next artist: `A-04`.
- **Releases:** `FW-001`, `FW-002`, … plus year where space allows: `FW-001 / 2026`. In the catalogue table the cat # and year are separate columns.
- Never reuse or renumber a code.

## 5. Logo

Files in `resources/logos/`:

- `formworks-logo.svg`: the mark, an isometric extruded square frame in four greys (`#F5F5F5` top, `#E0E0E0` right side, `#D4D4D4` inner left, `#A3A3A3` inner bottom) plus white face. **It is white/grey artwork, so it only works on a coloured or dark surface.** On the site it always sits on the blue **app-icon** tile (`.app-icon`: Aqua blue radial gradient, rounded square, gloss highlight, drop shadow), at ~62% of the tile.
- `formworks-text.svg`: wordmark **FOЯMWORKS**, Archivo Black (weight 900), letter-spacing 8, colour `#f1f4f5`, reversed Я. Use it on dark/coloured backgrounds only.

Rules:
- Don't recolour, stretch, outline, add effects to, or re-typeset the logo or wordmark. Don't type "FOЯMWORKS" in a different font as a substitute for the SVG.
- Keep clear space of at least a quarter of the mark's width on all sides.
- Don't place either logo directly on the light pinstripe pane; put the mark on the app-icon tile or on a dark surface.
- Don't ship the wordmark's Google Fonts `@import` into pages; if you need the wordmark, use the SVG as an image (or convert text to outlines).

## 6. Colour

Defined as CSS custom properties in `:root` plus recurring literal values. Use the variable when one exists; reuse these literals rather than inventing new colours.

### Core

| Role | Value | Use |
|---|---|---|
| Ink | `--ink` `#1c1c1e` | body text |
| Muted | `--muted` `#59616d` | codes, years, secondary text |
| Selection blue | `--sel` `#2b62c9` | selected rows/names, links in landing pages (white on it is 5.6:1) |
| Desktop backdrop | `#2a63b9` | `body` background (Aqua blue) |
| Heading ink | `#25272c`–`#2a2c31` | h1 on panes |
| Text selection | `#b3d4fc` on `#000` | `::selection` |

### Aqua blue ramp (accents, primary buttons, active state, folders)

`#c9defb` → `#a9c8f6` → `#7fb2f3` → `#78a9ee` → `#5d99ec` → `#5b92e4` → `#3d7be0` → `#3a74d2` → `#2b62c9` (border `#2a56a0` / `#33629f`)

### Metal and neutrals

- Brushed metal: `#ececec` → `#d9d9d9` → `#c7c7c7` (+ horizontal grain, `--grain`), sidebar `#dfe3ea` → `#d3d9e2`
- Pane pinstripe: `#ededed` / `#f8f8f8` alternating 2px bands
- Borders: `#5d626c` (buttons), `#6b6d73`/`#7c8089` (chrome), `#8f949d`/`#a7acb5`/`#b4b9c2` (panels)
- List stripe: `#fff` / `#edf3fe`
- White frames around cover art: `#fff`

### Traffic lights (decorative only, `aria-hidden`)

Red `#e04a3d`, yellow `#eab520`, green `#3fb437`, each as a radial gradient with a glass highlight.

### Focus

`--glow` is the blue Aqua focus glow: `0 0 0 3px rgba(94,160,255,.55), 0 0 7px 2px rgba(94,160,255,.65)`. Under `forced-colors` use `outline: 2px solid Highlight`.

**Don't:** add new brand hues (no red/green/purple accents, no neon), use pure black backgrounds, or go dark-mode. The site is light-only (`<meta name="color-scheme" content="light">`).

## 7. Typography

- **Font stack (one family, whole site):** `"Lucida Grande","Lucida Sans Unicode","Lucida Sans","DejaVu Sans",Tahoma,Verdana,sans-serif`. No web fonts are loaded; don't add any.
- Base: `13px/1.5`, antialiased.
- Weight: regular (400) for body and buttons, **bold (700)** for titles, headings, group labels, list headers, artist/release names.
- Type scale:

| Use | Size |
|---|---|
| Window title / body / buttons | 13px |
| Sidebar items, back links | 12px |
| Group labels, codes, small meta, list header, status bar | 11–12px |
| Hero h1 | `clamp(1.9rem, 3.6vw, 2.6rem)` |
| Detail-page h1 | `clamp(1.9rem, 4vw, 3rem)` |
| Release landing h1 | `clamp(1.6rem, 5vw, 2.2rem)` |
| Catalogue h1 | `clamp(1.6rem, 3.4vw, 2.3rem)` |
| 404 h1 | `clamp(1.8rem, 5vw, 2.6rem)` |

- Large headings: bold, `line-height ≈ 1.05–1.08`, `letter-spacing: -.01em`, with the embossed `text-shadow: 0 1px 0 #fff`.
- Numerals (codes, years, counts) always `font-variant-numeric: tabular-nums`.
- Embossed text: on metal, text gets `text-shadow: 0 1px 0 rgba(255,255,255,.75)`; on selected blue items it gets `0 -1px 0 rgba(0,0,0,.4)`.

## 8. Imagery

- **Release covers:** `resources/releases-covers/<artist>/<release_slug>/<release_slug>_cover.webp`. Square (1:1).
- **Artist images:** `resources/artist-logos/<artist>.webp`, square.
- Format **WebP**, web-sized. Use `object-fit: cover` in a square box; never distort.
- Presentation: **white photo border** (4px in grids/utility, 6px on detail and landing pages) with a soft shadow, as if a photo print. Thumbnails in lists: 30px, 2px border.
- **Always full colour.** No greyscale or other filters on covers or artist images, at rest or on hover.
- Alt text: artist image → artist name; cover → `"<Release> cover art"`; decorative/list thumbnails → `alt=""`.
- Folder naming: lowercase, underscores for spaces, no diacritics in file names (e.g. `3d_in_93`, `branik-logo.webp`).

## 9. Components (reuse, don't reinvent)

Copy the existing markup; all selectors live in `css/styles.css`.

- **Window shell** (`.window`): `.chromehead` (titlebar with `.lights` + `.title`, toolbar with back/forward `.seg`) → `.body` (`.sidebar` + `main.pane`) → `.statusbar`. Full-bleed, no margins.
- **Sidebar** (`.sidebar`, `.item`, `.group`): groups are *Home*, **Artists**, **Releases**, **Links** (About, Instagram). Active item is the blue gel with `aria-current="page"`. Folder icon (`#i-folder`) for Home and artists, file icon (`#i-file`) for releases and About, list icon (`#i-list`) for Catalogue, Instagram tile for links.
- **Buttons** (`.btn`): 22px tall, fully rounded gel. Grey = secondary. `.solid` = primary Aqua blue. `.solid.default` adds the pulsing default-button animation: **at most one per page**, on the main action (currently only home's "Hear the latest release"). Streaming buttons: `.stream` stacks 28px-tall buttons with the platform glyph (Spotify, Apple Music).
- **Back link** (`.back`): styled as a small gel button, text `← Back to <Section>`.
- **Icon grid** (`.area` / `.iconview` / `.grid` / `.file`): `.sub` code above, `.name` bold pill (turns selection blue on hover), optional second `.sub`, `.cta` or `.btn`.
- **Group box** (`.sec`) with `.sec-head`: for catalogue-type content.
- **List view** (`.list`): header gel bar; alternating white / `#edf3fe` rows; the whole row links to the release; artist link sits above it.
- **Detail page** (`.detail-grid`): image left, info right (`.code`, `h1`, button). **Release landing** (`.landing`): centred, max 26rem, cover → code → h1 → "By <artist>" → stream buttons.
- **Alert dialog** (`.error`): for 404/empty states.
- **Corners & depth:** buttons/pills fully rounded (11–14px), panels 4–6px, app icon ~23% radius. Gloss gradients (`--gloss`, `--gloss-soft`), inset highlights, small drop shadows. No hard flat shadows.
- **Scrollbar:** custom Aqua blue scrollbar on `.pane`; leave as is.

## 10. Layout

- Sidebar fixed at **200px**; content pane scrolls internally; `.pane-body` padding `26px 30px 30px`.
- Content max widths: detail 62rem, landing 26rem, 404 30rem, hero text 32rem, utility 24rem.
- Grid of icons: `repeat(auto-fill, minmax(132px, 1fr))`, gap 10px.
- **Breakpoint `max-width: 760px`:** page scrolls normally, toolbar hidden, sidebar becomes a horizontal strip of gel buttons (icons and group labels hidden), single-column hero/detail, tighter padding. Everything new must work at 360px wide without horizontal page scroll.

## 11. Motion

Restrained and period-appropriate: 0.18s opacity fade when the pane swaps; the default button's brightness pulse (1.1s alternate); hover brightness/colour shifts. Nothing else. Always honour `prefers-reduced-motion` (already wired for the existing animations: add your own to that rule).

## 12. Page structure and content rules (for new pages)

1. **Copy an existing page of the same type** (artist → `artist-wasteman.html`; release → `landing_pages/wasteman-3d-in-93.html`). Every page is a complete standalone HTML document (the script only enhances).
2. Required head: `charset`, `color-scheme` light, `viewport`, `<title>`, `<link rel="stylesheet" href="/css/styles.css">`.
3. `<body data-page="…">`: the value must match the sidebar item's `data-nav` (`home`, `artist-<slug>`, `release`, `catalogue`).
4. Keep the inline SVG sprite block (`#i-folder`, `#i-file`, `#i-list`, `#i-instagram`), the full sidebar, `<main class="pane" id="pane" tabindex="-1">`, the `.statusbar`, `#route-announcer`, and `<script src="/js/main.js">`. Mark the current page `active` + `aria-current="page"` in the sidebar.
5. Use **root-absolute paths** (`/css/styles.css`, `/resources/...`, `/artist-x.html`).
6. **Titles:** the page `<title>` is also the window title bar. Always `<Page> - Formworks` (plain hyphen), e.g. `Digital Oddities - Formworks` (home), `Catalogue - Formworks`, `Wasteman - Formworks`, `3D in '93 EP - Formworks`, `404 - Formworks`. Keep `<title>` and the `.title` span identical.
7. **When adding an artist:** new `artist-<slug>.html`, new `A-0n` code, add to the sidebar on **every** page, the Home artist grid, and the artist logo in `resources/artist-logos/`.
8. **When adding a release:** new `landing_pages/<artist>-<release-slug>.html`, new `FW-00n` code, cover at the folder path in §8, add to the sidebar (**Releases** group) on every page, the Home releases grid, and a new row in `catalogue.html`. Update "Hear the latest release" and the utility window on Home to point at the newest release.
9. External links open with `target="_blank" rel="noopener noreferrer"` plus a `<span class="visually-hidden"> (opens in a new tab)</span>`.
10. The sidebar and status bar are duplicated on every page. Any change to them must be applied to all pages.

## 13. Accessibility (non-negotiable)

- Text contrast ≥ 4.5:1 (white on `--sel` is 5.6:1; keep muted text ≥ `#59616d` on the light pane).
- Visible focus on every interactive element (`--glow`); never `outline: none` without a replacement.
- Decorative graphics: `aria-hidden="true"` and `alt=""`; informative images get real alt text.
- Semantic landmarks: `nav aria-label="Main"`, one `main`, one `h1` per page, `lang="en"`.
- Route changes are announced via `#route-announcer`; keep it on every page.
- Support keyboard, touch, reduced motion and forced-colors.
- Hover-only information is not allowed (colour on hover is a bonus, not required to understand content).

## 14. Don'ts

- No new fonts, icon libraries, CSS frameworks or JS libraries; the site is self-contained.
- No dark mode, no flat/material/neumorphic styling, no neon or cyber/glitch effects.
- No stock photography, no emoji, no all-caps shouting. Small caps-like codes (`FW-001`, `A-01`) are the exception.
- Don't recolour the logo, crop the covers non-square, or add a drop shadow style that isn't already defined.
- Don't hard-code a new colour or size when an existing variable/pattern covers it.

## 15. Known inconsistencies to clean up

- `resources/logos/formworks-text.svg` imports a Google Font; convert the text to outlines so it renders without a network request. (The file isn't used on the site yet.)
