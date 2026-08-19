# Golden Willowe Sports — E-commerce Store

Handcrafted premium English & Kashmir willow cricket bats, built with **Next.js (App Router)** on **Vercel**.

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/app/globals.css`)
- **Animations:** framer-motion
- **State:** zustand (cart)
- **Data:** Vercel Blob storage + client-side Instagram fetch
- **Validation:** zod

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Create a `.env.local`:

```bash
# Required for admin product creation/management
ADMIN_PASSWORD=your-strong-password

# Used by /api/products/create to store generated images
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Reels / Instagram (no token required — reads public og:image metadata)
```

> **Security:** without `ADMIN_PASSWORD` the admin area, product create/update/delete
> endpoints, and the AI product generator are locked out (fail-closed). Never use the
> default/example value in production.

## Project Structure

```
src/
├── app/                    # App Router pages & API routes
│   ├── api/
│   │   ├── auth/           # Session login/logout (httpOnly cookie)
│   │   ├── products/       # Cached catalog + admin CRUD (auth + zod)
│   │   ├── ai/generate/    # AI product generator (admin only)
│   │   └── instagram/      # Cached reels metadata
│   ├── admin/              # Admin dashboard (server-side auth guard)
│   ├── products/           # Catalog + product detail (server-rendered)
│   └── ...
├── components/             # UI components (layout, home, product, admin)
├── lib/                    # Data + auth layer (cached product fetches, HMAC sessions)
├── store/                  # zustand cart
├── types/                  # Shared TypeScript types
└── utils/                  # Order ID / currency helpers
```

## Key Notes

- **Product images:** the catalog stores local `/images/*.png` paths; the repo ships
  optimized `.webp` equivalents and `next.config.ts` redirects `.png` requests to
  `.webp`. `resolveProductImage()` (`src/lib/products.ts`) maps this at render time.
- **Caching:** product catalog is cached server-side for 5 minutes and revalidated on
  product changes; reels metadata is cached for 6 hours.
- **Admin auth:** HMAC-signed, 7-day httpOnly cookie (`gw_admin_session`) verified on
  every admin page and protected API route. Log in at `/login`.
- **Re-running image optimization:** `node scripts/optimize-images.mjs` regenerates
  WebP files from the original PNGs (backup them first; originals are deleted after).

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # eslint
npm run start    # start production build
```

## Deployment

Push to GitHub → import into Vercel → set env vars → deploy.

Live: https://goldenwillowe.vercel.app