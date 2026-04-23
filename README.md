# Planmon

Planmon is a branded study web app concept built for student growth, character collection, and premium plan conversion.

## Included

- Brand landing page
- Premium character section
- Pricing section
- Dashboard-style MVP preview
- Interactive timer and XP demo
- Local-first start page with onboarding and dashboard
- SEO metadata, manifest, robots, sitemap
- Vercel-ready Next.js setup

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Visit `http://localhost:3000/start` for the interactive dashboard flow.

## Suggested next integrations

- Supabase for auth and data
- Toss Payments or Stripe for subscriptions
- Real study timer and XP persistence
- User dashboard and onboarding flow

## Deploy on Render

This project is currently configured for a Render `Static Site`.

- Build Command: `npm install && npm run build`
- Publish Directory: `out`
- Start Date Reference: April 23, 2026

You can also use the included `render.yaml`.

## If you want the full app later

The current deployment mode is static because it is the fastest path to getting the brand live.

When you add any of the following, switch to a Render `Web Service`:

- real login
- database writes
- payment webhooks
- AI features with server-side secrets

## Environment template

See `.env.example` for the values to use when you connect Supabase or Stripe later.
