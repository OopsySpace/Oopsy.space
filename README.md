# Oopsy Ai

Landing page for **Oopsy Ai** — an AI video production studio for creators
(YouTube, Reels, TikTok). Built on the free "Highlights" template by HTML5 UP
(CCA 3.0 license, attribution kept in the footer).

## Run

```bash
npm run dev            # serves the site at http://127.0.0.1:7100/
npm run dev -- --port 8080 --host 0.0.0.0
```

No dependencies and no build step — plain HTML/CSS/JS.

## Structure

- `index.html` — Russian landing page (default; hero, services, process,
  examples, pricing plans, FAQ, contact form)
- `en.html` — English version of the same page; an EN/RU switcher sits in the
  top-right corner of both pages
- `ru.html` — tiny redirect to `index.html` kept for old links
- `assets/css/main.css` — original Highlights template styles
- `assets/css/custom.css` — Oopsy Ai additions (pricing cards, form feedback)
- `assets/js/` — original template scripts (jQuery, scrolly/scrollex)
- `images/` — template section backgrounds
- `server.js` — tiny zero-dependency static dev server

## Notes

- The contact form currently works without a backend: it validates input and
  shows a confirmation message. Hook it to a real endpoint (e.g. a Telegram
  bot or form service) when ready.
- Telegram handle used in the copy: `@oopsyai` — replace with the real one.
