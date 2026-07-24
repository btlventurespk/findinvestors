# findinvestors.pk

Where Pakistan's revenue-generating startups get seen by people who write cheques.

Next.js 15 (App Router, TypeScript) · Tailwind CSS · Prisma + MySQL · Nodemailer (SMTP).

## Local development

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, SMTP, NEXT_PUBLIC_WHATSAPP
npx prisma generate
npx prisma migrate dev # creates tables in MySQL
npx prisma db seed     # seeds 15 startups from data/startups.json
npm run dev
```

The site works without a database — pages fall back to `data/startups.json` — but
applications and intro requests are only persisted once `DATABASE_URL` is set.

> **Warning:** the seed startups are placeholder data. Replace with real companies
> before launch — placeholder data must never go live.

## Deploying to Hostinger (Node.js)

1. **Build locally, not on the server** (shared-hosting memory limits kill `next build`):
   ```bash
   npx prisma generate && npm run build
   ```
2. Upload to the server: `.next/`, `public/`, `package.json`, `package-lock.json`,
   `prisma/`, `data/`, `next.config.js`, `next-sitemap.config.js`. **Exclude `node_modules/`.**
3. On the server: `npm ci --omit=dev` (then `npx prisma generate` once).
4. Env vars go in the **Hostinger Node.js panel**, not a `.env` file. Set:
   `DATABASE_URL` (use the internal MySQL host from hPanel, not localhost),
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFY_EMAIL`,
   `NEXT_PUBLIC_WHATSAPP`, `SITE_URL`.
5. The panel runs `npm start`, which is `next start -p $PORT` — the port is
   assigned by Hostinger, never hardcode it.
6. First deploy only: `npx prisma migrate deploy` then `npx prisma db seed`.
7. Point the findinvestors.pk A record at Hostinger, enable free SSL, force HTTPS.
8. Uploads/images: shared disk is not persistent across redeploys — use Cloudinary
   for logos and founder photos (`res.cloudinary.com` is whitelisted in `next.config.js`).

## Structure

- `app/` — routes (home, `/startups`, `/startups/[slug]`, `/apply`, static pages, API routes)
- `components/ui/` — Button, Pill, Card, Container, Logo
- `components/sections/` — page sections, directory filters, apply form, intro modal
- `lib/` — Prisma client, data access with seed-data fallback, email
- `prisma/` — schema and seed script
- `data/startups.json` — seed profiles (placeholder)
