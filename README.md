# 🌙 Night Warden

A Progressive Web App (PWA) shift assistant for Night Wardens.

## Features

- **Full shift checklist** with tappable tasks, progress tracking, and localStorage persistence across sessions
- **Shift start screen** with arrival tasks and timed reminders
- **Check-in guide** with step-by-step guest check-in process
- **Room layout** with floor-by-floor breakdown and facilities
- **WhatsApp message templates** ready to copy for courtyard closing and lost property
- **Fire procedure** quick reference
- Works fully **offline** via service worker caching
- Installable as a **home screen app** on iPhone and Android

## Usage

Visit the hosted URL and add to your home screen via Safari → Share → Add to Home Screen.

Reset the checklist at the start of each shift using the **Reset Shift** button. Checkbox state persists in your browser's localStorage so you can close the app and return mid-shift without losing progress.

## Tech

A single self-contained HTML file with vanilla JavaScript and CSS. No frameworks, no build step, no dependencies.

PWA support via:
- `manifest.json` — app metadata and icons
- `sw.js` — service worker for offline caching

## Development

Vibe coded using [Claude](https://claude.ai) by Anthropic. 🤖

To update the checklist tasks or any other content, edit `index.html` and push to the `main` branch. GitHub Pages will redeploy automatically within a minute or two.

<img width="2692" height="1476" alt="image" src="https://github.com/user-attachments/assets/af45c100-1e7d-4138-af21-7bd2fe181e86" />
