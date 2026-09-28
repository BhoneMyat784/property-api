# Property Portal API

The API serves property discovery data and supports the local demo flows used by the web portal. Its base URL is `http://localhost:4000/api/v1`.

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The API listens on port `4000` by default. The health check is `/health`.

## Available endpoints

- `GET /health` — service status.
- `GET /locations` and `GET /categories` — search reference data.
- `GET /listings` — public listings with intent, city, category, text, and price filters.
- `GET /listings/:slug` — public property detail.
- `GET /auth/demo-accounts` and `POST /auth/login` — local demo access.
- `GET /me/listings` — demo owner/agent listings.
- `POST /listings` — create a demo listing as an owner or agent.

For demo login, use `demo1234` with `owner@example.com`, `agent@example.com`, `buyer@example.com`, `staff@example.com`, or `admin@example.com`. Demo credentials are for local use only.

The current listing demo dataset is in memory and resets when the server restarts. The Prisma 7 schema and SQLite migration are included as the persistence foundation.
