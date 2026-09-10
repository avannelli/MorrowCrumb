# Morrow & Crumb

A static, portfolio-quality site for a fictional neighbourhood bakery.
Vite + React + TypeScript with hand-written CSS — no UI framework.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## Where to edit

| Change | File |
| --- | --- |
| Menu items, prices, categories, notes | `src/data/pastries.ts` |
| Bakery name, hours, email, neighbourhood, nav labels | `src/data/site.ts` |
| Logo artwork (hand + croissant) | `src/components/BrandMark.tsx` |
| Pastry illustrations | `src/illustrations/PastryArt.tsx` |
| Colour palette, type, spacing, breakpoints | `src/styles/global.css` (`:root`) |
| Intro timing / motion | `src/hooks/useIntroAnimation.ts` |

Everything on the site — the bakery, its address, hours, menu and contact
details — is invented for demonstration.
