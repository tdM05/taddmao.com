# taddmao.com

Tadd Mao's personal website — built with React + Vite (JavaScript / CSS / HTML)
and maintained by him.

Live at **https://taddmao.com** (hosted on Cloudflare Pages).

## Develop

```bash
npm install
npm run dev      # http://localhost:4024
```

## Build

```bash
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally
```

## Content

The site is fully static — there is no backend. Page content is hardcoded:

- Art gallery (sketches, digital paintings): `src/content/art.js`
- Apps: `src/content/apps.js`
- Music: `src/pages/Music.jsx`
- Images and 3D models: `public/`

To update content, edit those files and push; Cloudflare Pages redeploys
automatically.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output directory: `dist`
- SPA routing is handled by `public/_redirects`.
