# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Durable product decisions (2026-09-08): the ₹99 offer is framed as a "1-on-1 session" (not a consultation) with named deliverables, a 4-step how-it-works including a pre-session conversation step (operationally unverified), and a personalization-led final CTA. All CTA buttons open the booking modal form (name, email, phone + UTMs). Form submissions POST to a Google Apps Script Web App (`SHEET_WEBHOOK_URL` in `src/App.jsx`, setup in `google-apps-script/README.md`) then redirect to the Razorpay payment link (`RAZORPAY_URL`). Keep no-cors POST and the 4-second timeout so checkout is never blocked.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
