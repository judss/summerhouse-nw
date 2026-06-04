# Night Warden — CLAUDE.md

## What this is

A Progressive Web App (PWA) shift assistant for Night Wardens at Summer House hostel. It provides a tappable shift checklist, check-in guide, room layout, WhatsApp templates, and fire procedure — designed to be installed on a phone home screen and used offline.

## Tech stack

- **Vanilla HTML/CSS/JS** — zero frameworks, zero build step, zero dependencies
- **PWA** — installable via `manifest.json` + service worker at `/summerhouse-nw/sw.js` (registered in code but `sw.js` file is not in the repo — it must exist on the server or be added)
- **GitHub Pages** — pushing to `main` deploys automatically within ~2 minutes

## Project structure

```
index.html     — HTML structure and page content only
style.css      — all styles and CSS custom properties
app.js         — all task data, state, rendering logic
manifest.json  — PWA metadata and icon references
icon-192.png   — PWA icon (small)
icon-512.png   — PWA icon (large)
```

## Key locations

| What | Location |
|---|---|
| CSS custom properties (colour palette) | `style.css:1–16` |
| All task data (`SECTIONS` array) | `app.js:2–107` |
| localStorage keys | `app.js:108–109` |
| State management (`checked`, `collapsed`) | `app.js:138–139` |
| Full render function | `app.js:142–218` |
| Nav routing (`showPage`) | `app.js:243–249` |
| Service worker registration | `app.js:254–258` |

## Adding New Features or Fixing Bugs

**IMPORTANT**: When you work on a new feature or bug, create a git branch first. Then work on changes in that branch for the remainder of the sessions.



## Build / deploy

No build step. Edit files, commit, push to `main` — GitHub Pages redeploys.

```bash
# Preview locally (avoid opening index.html directly — PWA paths may differ)
python3 -m http.server 8080
# or
npx serve .
```

## Additional documentation

- [.claude/docs/architectural_patterns.md](.claude/docs/architectural_patterns.md) — design patterns, state model, rendering approach, conventions used throughout the codebase
