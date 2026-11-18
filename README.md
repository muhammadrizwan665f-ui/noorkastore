# Rail store

Static clothing store (React + Vite + Tailwind) for Cloudflare Workers. Garments hang on a rail; tap one to zoom, flip front/back, pick a size and order on WhatsApp. No backend, no admin.

## Edit before launch
- `src/lib/config.ts` — `BRAND`, `TAGLINE`, `CURRENCY`, `ROD_OFFSET_PCT`. WhatsApp number: set `VITE_WHATSAPP` (digits with country code) as a build variable in Cloudflare, or edit `WHATSAPP`. Until set, the bag shows "Ordering is not available yet".
- `src/data/products.ts` — the 15 pieces (name, price, sizes, sold-out sizes).
- `public/products/NN-front.(png|webp)` / `NN-back.*` — real photos: transparent background, same canvas size, hanger hook at the top. Update the paths in `products.ts`. Delete the placeholder SVGs.

## Run / deploy
`npm install && npm run dev` · `npm run build` · `npm run deploy`
Cloudflare Workers Builds: build command `npm run build`, deploy `npx wrangler deploy`.
