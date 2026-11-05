# Cover: developer handoff

Live site: https://dailyballknowledge.com/ (custom domain via Porkbun DNS; old https://colekunz-code.github.io/Cover/ redirects there; built from `index.html` at the repo root).
Test artifact: https://claude.ai/artifact/BMBkKW9fsUzoRsLZNh7T4c. Admin (private): https://claude.ai/artifact/3fT56sw6RzC4gpHyd1DDAJ

## Source layout (this folder)
- `cover2_tpl.html`: the game template. `%%DATA%%` gets `data_block.js`, `%%QUESTIONS%%` gets `questions2.js`.
- `data_block.js`: RECORDS, SLATE, ODDS, PARLAY, PARLAY_RES, RESULTS, PAST (parlay menus come from `parlay_data.js`).
- `questions2.js`: QUESTIONS (6/day from FMT2_START 2026-11-05), PAT_Q, TWO_Q.
- `build.py`: builds cover.html + admin.html (admin_pre/post/panel.js add the sim clock).
- `site_build.py`: builds the website (`site/index.html`, og.png, terms.html). Needs env vars SB_URL, SB_KEY (Supabase publishable key), SITE_URL; optional TS_KEY (Turnstile), GC_CODE (GoatCounter).
- `site_shim.js`: maps the Supabase client onto the `window.claude.use("db"/"user")` interface the game uses.
- `tests/`: Playwright checks (alldays, conv, pltest, migtest, lt2, adm, mob, shots).

## Rules that must hold
- SLATE, RESULTS, QUESTIONS, PAT_Q, TWO_Q and every PARLAY row array are append-only (saved picks reference them by index).
- Never change ODDS/PARLAY for a game after kickoff.
- A scheduled task ("Cover game results update", Sun/Mon/Tue/Thu/Fri 5:34 AM Central) updates data, odds, parlay menus and questions automatically.

## Open items
- GoatCounter code and Turnstile site key (then turn on captcha in Supabase).
- Custom domain.
- Creator outreach.
