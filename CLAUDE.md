# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal academic website for Sarah Wei — a hand-coded static HTML/CSS/JS site with no build system, no static site generator, and no dependencies. It is deployed directly to GitHub Pages as-is.

## Architecture

- **`index.html`** — Single-page site containing all content. Sections: About, News, Publications, Experience, Services, Misc. Navigation uses anchor links.
- **`style.css`** — All styling (~1060 lines). Responsive breakpoints at 768px, 480px, and 360px. Uses Inter (body) and JetBrains Mono (code) fonts via Google Fonts. Color palette: purples (#A675A1, #CEA2AC), grays (#25283D, #827081).
- **`githubStarCount.js`** — Fetches GitHub star counts via the GitHub API and injects them into the page.
- **`files/`** — Static assets: profile photo, CV PDF, project images/GIFs, company logos, favicon/manifest files.
- **`bibtex/`** — BibTeX citation text files (one per publication), linked from publication entries in index.html.

## Development

No build step. Open `index.html` in a browser or use any local HTTP server:

```
python3 -m http.server 8000
```

## Key Patterns

- Publications are added as HTML blocks in the publications section of `index.html`, each with a thumbnail, metadata, and action buttons (paper/code/bibtex links).
- The News section uses a CSS class `.expanded` toggled by inline JavaScript to show/hide older items.
- The theme toggle cycles auto → light → dark. `localStorage['theme']` holds `'light'`/`'dark'`; absent means auto (follow system, the default). A tiny script right after `<body>` pre-applies `body.dark-mode` to avoid a flash; the cycle logic lives in the inline script at the end of `index.html`.
- All content changes happen directly in `index.html` — there are no templates or partials.
