# Morrow & Crumb

A static, portfolio-quality site for a fictional neighbourhood bakery.
Vite + React + TypeScript with hand-written CSS — no UI framework.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run preview
```

## How it behaves

- **Opening hours are live.** `serviceStatus()` reads the week in
  `src/data/site.ts` and reports `open`, `closing-soon` (inside the last hour)
  or `closed`. The hero panel and the footer sign-off both render from that one
  result, re-checked every 30s and whenever the tab regains focus.
- **The footer writes its own line** from the same state — "Fresh again at 7",
  "Last of the trays until 15:00", "See you tomorrow morning". It is three tight
  bands — lockup and links, details, small print — and does not repeat the week.
  The address, email and phone live there.
- **The hero carries the week**, printed on the same stock as the menu sheet:
  double-ruled frame, paper grain, a second card behind it. Seven days a line,
  today marked in the margin, a live pill for the current state and a thin bar
  showing how far through today's trading the clock is.
- **Contact is a dialog, not a destination.** It opens the bakery's card in
  place — address, phone, email, the week and the accounts, plus somewhere to
  leave a rating and a short note. It traps focus, closes on Escape or the
  scrim, hands focus back to whatever opened it, and becomes a bottom sheet on
  phones. Nothing is sent; the note is a design concept.
- **Home and Menu behave like pages.** Nav clicks veil the view, move to the
  destination and let it rise back in; the active rule slides between the two,
  which sit on the page's centre line with a printed lozenge between them.
- **A trellis sits behind the menu** — fine hairlines crossed on the diagonal
  with a heavier batten every third cell, faded top and bottom, seen mostly in
  the margins either side of the paper. Tune it with the `--lattice-*` tokens
  at the top of `menu.css`.
- **The menu is a printed sheet** — grain, a centre fold, edge shadow and a
  sheet underneath — that is set down on the page as it scrolls into view, item
  by item.
- Every animation is gated on `prefers-reduced-motion`.

## Where to edit

| Change | File |
| --- | --- |
| Menu items, prices, ingredients, Baker's Pick / Today's Bake | `src/data/pastries.ts` |
| Bakery name, address, hours, contact, social accounts, nav labels | `src/data/site.ts` |
| The brand story beneath the menu | `story` in `src/data/site.ts`; `src/components/Story.tsx` |
| The story's printed figures (04:00 / 01 / count) | `story.figures` in `src/data/site.ts` — a `null` value reads the menu's own length |
| The contact dialog and its review form | `src/components/ContactModal.tsx`, `src/styles/modal.css` |
| Opening-hours logic and the footer's contextual copy | `src/data/site.ts` (`week`, `serviceStatus`) |
| Logo artwork (croissant in cupped hands) | `src/components/BrandMark.tsx` |
| Pastry illustrations | `src/illustrations/PastryArt.tsx` |
| Decorative ingredient sketches and where they sit | `src/illustrations/Botanicals.tsx`, `src/components/Botany.tsx` |
| The pastries falling behind the hero | `src/components/PastryRain.tsx`; `.rain` in `src/styles/hero.css` |
| Social marks in the header | `src/illustrations/SocialIcons.tsx` |
| Colour palette, type, spacing, shared motion tokens | `src/styles/global.css` (`:root`) |
| The hero's ground colour and its sheen | `--hero` in `global.css`; the gradient stack in `hero.css` (`.hero__ground`) |
| Section styling | `src/styles/hero.css`, `menu.css`, `story.css`, `header.css` |
| Intro timing / motion | `src/hooks/useIntroAnimation.ts` |
| Page-transition timing | `src/hooks/usePageTransition.ts` |

Everything on the site — the bakery, its address, hours, menu and contact
details — is invented for demonstration.
