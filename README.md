# Exen Co Limited — Wholesale Electronics (B2B)

Next.js 15 App Router storefront for a Vietnam-based B2B electronics wholesaler (VND · EUR · USD). Product data lives in MongoDB Atlas (`wilkyart.products`).

## Run locally

```bash
npm install
cp .env.local.example .env.local   # or create .env.local with MONGODB_URI=...
npm run dev                        # http://localhost:3000
```

`MONGODB_URI` is required — the shop and `/api/products` return nothing without it.

## Layout

| Path | Purpose |
|---|---|
| `src/app/page.tsx` | Home — `PremiumHero` + `PremiumPrintersSection` (featured) |
| `src/app/shop/page.tsx` | Catalog: category groups, tab strip, search, sort, pagination |
| `src/app/api/products/route.ts` | Paginated product API (`?category=&search=&sort=&page=`), capped at 80/category |
| `src/lib/mongodb.ts` | Connection + `VALID_CATEGORIES` (source of truth for category names) |
| `src/contexts/` | Cart, Currency (VND/EUR/USD), Cookie consent |
| `.claude/tasks/claude.md` | Full brand/design spec, constants, and **session handoff log** |

## Category links — the one rule

Always link with the exact singular category value: `/shop?category=Network%20Switch`, never `Switches`. See "Category Routing Contract" in `.claude/tasks/claude.md`.

## Deploy

Vercel, auto-deploys from `main`. Set `MONGODB_URI` in Vercel project env.
