# Nexus website + proposal — static package

A complete, self-contained static site. No build step, no framework, no login. Every page is plain HTML that renders client-side. Host the folder as-is and share the URL.

## Entry point
- `index.html` — redirects to `Nexus-Overview.dc.html` (the "Five Directions" hub). Point your host's root here.

## What's inside
- **Hub:** `Nexus-Overview.dc.html` — landing page; links to everything below.
- **5 homepage directions:** `Nexus-Aurora.dc.html`, `Nexus-Signal.dc.html`, `Nexus-Grove.dc.html`, `Nexus-Circuit.dc.html`, `Nexus-Field.dc.html`
- **Service pages:** `Nexus-<Theme>-managed-it.dc.html`, `-cybersecurity`, `-networking`, `-meeting-spaces`, `-digital-signage`, plus `-services` index (per theme)
- **Brand ideas:** `Nexus-Brand-Ideas.dc.html`
- **90-day plan:** `Nexus-Plan.dc.html`
- **18-month proposal:** `Nexus-Proposal.dc.html`
- `assets/nexus/` — logos, photos (`real/`), graphics, SVGs
- `support.js` — the render runtime every page loads via `<script src="./support.js">`. Keep it at the folder root.

## Deploy (pick one)
- **Netlify Drop:** go to app.netlify.com/drop and drag this whole folder in. Live URL in ~30s.
- **Vercel / Cloudflare Pages / GitHub Pages:** push the folder to a repo; framework preset = "None / static". No build command, output dir = root.
- **HubSpot:** upload the folder to the File Manager, or paste a page's HTML into a custom page. Keep the `assets/` and `support.js` relative paths intact.

## Rules that matter
1. Keep the folder structure flat and together. All links are relative (`Nexus-Aurora.dc.html`, `assets/...`, `./support.js`). Don't move files into subfolders.
2. `.dc.html` is just HTML with a `.dc.html` extension. If a host refuses that extension, serve it as `text/html` (all listed hosts do by default), or rename files to `.html` and update the links (find/replace `.dc.html` → `.html` across all files, including inside each file).
3. No server code, no environment variables, no secrets. Contact forms are front-end only — wire them to HubSpot forms or a form endpoint when ready.
4. Google Maps embeds and Google Fonts load from the public internet; the host just needs normal outbound access (any CDN-friendly static host is fine).

## For Claude Code
"Take this static folder and deploy it to <host>. It's a no-build static site; root document is `index.html`. Keep all files at the same level so the relative `assets/` and `support.js` references resolve. Optionally rename `*.dc.html` to `*.html` and update all internal links if the host won't serve the `.dc.html` extension as HTML."
