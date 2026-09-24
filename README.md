# Zanshin MERN website

A new MongoDB, Express, React and Node project based on the approved Zanshin HTML sample. The original HTML deliverables remain unchanged.

## Run locally

1. Ensure MongoDB is running at `mongodb://127.0.0.1:27017`.
2. Copy `.env.example` to `.env` if you need different settings.
3. Run `npm install` from this folder.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

The Express API runs at `http://localhost:5000`. `GET /api/health` verifies it. Product and the 121 supplied moment mappings are automatically seeded into MongoDB when the API starts.

## Production build

Run `npm run build`, set `NODE_ENV=production`, then run `npm start`. Express serves `client/dist` and the API from one process.

With pnpm, use `pnpm install`, `pnpm dev`, `pnpm build` and `pnpm start` instead.

## Netlify frontend

The repository includes `netlify.toml`, a React Router SPA fallback and `VITE_API_URL` support. Follow [NETLIFY_DEPLOYMENT.md](NETLIFY_DEPLOYMENT.md). The Express/MongoDB backend needs its own public HTTPS host.

## Working flows

- Five-banner responsive Home with the original premium visual language.
- Separate React routes for story, collection, four SKUs, finder, community, journal/FAQ, how-to-buy, engagement, packaging, reviews and support.
- Products and recommendations loaded from Express/MongoDB.
- Finder queries the supplied mapping and adds a recommendation to the cart.
- Persistent browser cart with quantities.
- Demo order creation saved to MongoDB without taking payment.
- Demo order lookup by reference and email.
- Contact form saved to MongoDB.

## Launch dependencies

Prices, stock, approved product photography, shipping and tax rules, payment gateway, real order fulfillment, return terms, approved creator content, promotions and real testimonials are still required for production commerce.
