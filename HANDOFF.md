# Al Multaqa — Release handoff (محمد الصوافي)

**Stack:** Next.js 15.5.x, React 19, Prisma 6, SQLite (local), TypeScript, Tailwind CSS 4.

## Included

- Full app under `src/` (marketing, select flow, thank-you, admin, API).
- Admin: leads with statuses, villa types/options, land offerings.
- Prisma schema; local DB file created with `db push`.

## Not included

- `node_modules`, `.next`, `.env`, `*.db` — install and generate locally.

## Run on port 3007

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run dev:3007
```

Open http://127.0.0.1:3007 — Admin: `/admin/login`.

## Production

```bash
npm run build
npm run start:3007
```

Use HTTPS; strong `ADMIN_SECRET` and `ADMIN_PASSWORD` in production.

## Before upload

- `npm run lint` and `npm run build` succeed.
- Never commit `.env`; only `.env.example`.

For PostgreSQL + Docker, migrate from the desktop reference project in `Desktop/حي الملتقى/`.
