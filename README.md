# Gurjar — The Private Table

A personal-brand universe for Man Singh Gurjar: finance, business, lifestyle, tech, and original Mac software.

This is not a portfolio, a shop, or a blog. The homepage is an **Infinite Table** — objects as navigation. Deeper pages are a **Museum of Decisions**: chosen things, presented as exhibits, with budget-tier alternatives.

## Run

```bash
cd gurjar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `/` — Infinite Table (desktop dock-magnification + mobile scroll)
- `/world/[category]` — showroom for a pillar
- `/exhibit/[slug]` — product as exhibit, with alternatives

Content lives in `src/lib/catalog.ts`. Photography lives in `public/world`, `public/objects`, and `public/exhibits`.

## Adding a product

1. Add an entry to `products` in `src/lib/catalog.ts`.
2. Optional `table` placement puts it on the homepage.
3. Drop still-life and exhibit images into `public/`.
4. Fill `alternatives` with four commitment tiers: entry, considered, committed, the piece.

## Original software

`TABLE` (`/exhibit/table-app`) is the first original Mac product — forthcoming. The software world is built to grow from recommended tools into launch pages without changing the language of the site.
