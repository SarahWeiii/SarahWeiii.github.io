# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal academic website for Sarah Wei — a hand-coded static HTML/CSS/JS site with no build system, no static site generator, and no dependencies. It is deployed directly to GitHub Pages as-is.

## Architecture

- **`index.html`** — Single-page site containing all content. A slim top bar, then the opening (a small square portrait beside the name, position, the "about" paragraph, email and links — there is no separate About section; the opening carries `id="about"`), then the sections: News, Publications, Experience, Services, Misc. The page is meant to be dense, like a typical academic homepage: plain grounds, compact rows, a lot on one screen. Navigation uses anchor links. This is an academic page first: the photo gallery is to be linked once, as "Photos" in the top bar (`/photo_gallery/`), and nowhere else. That link is commented out in `index.html` until the gallery is online.
- **`style.css`** — All styling (~560 lines). What it shares with the photo gallery ("Elsewhere", a separate repository) is the pair of looks and their accent colours, nothing else: the grounds are plain (no gradients or coloured backgrounds) and the type is one plain typeface, with no display or script faces. Two looks, meant as Los Angeles by night and by day: night (the base, `:root`) takes its colours from "La La Land" — the blue-violet of the sky at dusk and the yellow of the dress; day (`:root[data-theme='california']`, near the end of the file) is a warm white with navy text and poppy accents. Colours and typefaces are CSS variables at the top; do not hard-code colours elsewhere. Breakpoints at 640px and 480px.
- **`fonts/`** — The one typeface, Jost, self-hosted (nothing is loaded from Google Fonts): one variable file per style, weights 400–700. The name and headings are Jost 600; labels and buttons are Jost 600 in small wide-set capitals.
- **`githubStarCount.js`** — Left over from an earlier version and no longer loaded; the star counts are handled by the script at the end of `index.html`.
- **`files/`** — Static assets: profile photo, CV PDF, teaser pictures and films, company logos, favicon. The page uses the small copies (`*.webp`, `*.mp4`, `me-400.webp`); the large originals beside them (`*.png`, `*.gif`, `me.jpeg`) are kept only in case something outside this site links to them (`me.jpeg` is also the sharing picture, `og:image`).
- **`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`** — The site's icon, a rounded W filled with sunset colours on cream; the photo gallery uses the same three files. The `.ico` and `.png` are renderings of the `.svg` (the touch icon without the rounded corners).
- **`bibtex/`** — BibTeX citation text files (one per publication), linked from publication entries in index.html.

## Development

No build step. Open `index.html` in a browser or use any local HTTP server:

```
python3 -m http.server 8000
```

## Key Patterns

- Publications are added as HTML blocks in the publications section of `index.html`, each with a teaser, metadata, and action buttons (paper/code/bibtex links). They are rows between fine lines, not cards.
- A teaser is `<div class="row-media" style="background-image: url(files/x.webp);">`, or, when it moves, `<video class="row-media" src="files/x.mp4" autoplay loop muted playsinline>` — never a GIF (the three old ones were 24 MB). Keep teasers small: at most 1400px wide, e.g. `cwebp -q 82 -resize 1400 0 in.png -o files/x.webp`, and for a film `ffmpeg -i in.gif -vf "scale='min(640,iw)':-2" -c:v libx264 -crf 26 -pix_fmt yuv420p -movflags +faststart -an files/x.mp4`. A click shows the teaser whole.
- The venue line is plain text in the accent colour. An oral or an award goes in its own label after it: `<span class="italic">NeurIPS 2024</span> <span class="award">Oral</span>`.
- A "Code" button may carry a star count: `<span class="github-stars" data-repo="owner/name">&#9733; 123</span>`. Only some do, by the author's choice (CuACD, PaMO, Zero123++, NeuManifold/diso, CoACD); the others are a plain "Code" on purpose. The number written there is what shows first and whenever GitHub's API does not answer (it allows 60 requests an hour per network address); the script replaces it with a fresh count when it can and keeps that for a day in `localStorage`. Refresh the written numbers now and then.
- News items are one compact line each (date, text). The section shows about six lines; a CSS class `.expanded`, toggled by inline JavaScript, shows the older ones.
- "Work experience" is a timeline, newest first. Each `.experience-item` holds the dates (`.experience-when`), the company mark (`.experience-logo`; the marks are joined by a fine line) and `.experience-content` with the company first (`a.experience-company`) and then the role (`.experience-role`, with an optional `.experience-detail` that follows after a dot). Dates and company names are grid columns shared by all entries (`subgrid`), so they line up; on phones the dates go under the role.
- The look switch in the top bar has two states, night and day. With nothing stored it follows the system setting; `localStorage['look']` holds `'night'` or `'california'` only when the visitor's choice differs from the system. The photo gallery uses the same key, and both sites are on the same domain, so a choice made on one applies to the other. The script is inline in `<head>` so that the look is set before the first paint.
- One accent throughout: `--gold` for the name, headings and filled buttons, `--accent` where the accent is small text (in the day look a deeper poppy, so that it reads on sand). The name carries a gold gradient in the night look (`.foil`) and is plain poppy in the day look.
- The one ornament is the row under the opening (`.bulb-row`, filled in by the inline script at the end of `index.html`): small glowing lights in the night look, still dots in the day look, poppy and yellow by turns (the colours of the gallery's striped awning, which was tried here and replaced by the dots).
- The name in the top bar is hidden while the name in the opening is on screen (`.nav.past`, set by the script at the end of `index.html`).
- The footer's year and "Updated" month are filled in by script (`document.lastModified`, which on GitHub Pages is the last push).
- All content changes happen directly in `index.html` — there are no templates or partials.
