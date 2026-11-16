# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev          # Start Next.js development server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm type-check   # Run TypeScript type checking
pnpm lint         # Run Oxlint
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting

# Generated assets (run after a change of the source)
pnpm generate:favicons   # Favicons and app icons, from scripts/art/icon.jpg
pnpm generate:logo-masks # Paint masks for the logos, from public/logos
```

## Architecture

This is a Next.js 16 personal website: a single page, styled as an oil painting.

**Stack:**

- Next.js 16 with the App Router (`src/app/`)
- React 19
- TypeScript 7 with strict mode
- Tailwind CSS 4 for styling (theme tokens in `src/styles/globals.css`)
- Motion (`motion/react`) for scroll-linked animation, Lenis for smooth scrolling
- Oxlint for linting, Prettier for formatting

**Directory Structure:**

- `src/app/` - Layout, metadata and the home page (ISR, revalidated daily for live npm/GitHub stats)
- `src/content.ts` - All copy on the site
- `src/components/` - One folder per component (`Name/Name.tsx` + `index.ts`)
- `src/components/Motion/` - Animation primitives. `Reveal` and `SplitWords` are CSS-only and driven by one shared `RevealObserver`; keep them that way so they cost nothing to hydrate
- `src/assets/` - The paintings and the cut-out props, imported statically so `next/image` knows their size
- `public/art/` - The paint texture tiles, the letter fills and the brush-stroke edge mask used by the CSS
- `src/lib/` - Stats fetching, and the generated list of logo masks
- `src/styles/` - Global CSS (includes Tailwind imports)

**How the painted look works:**

All of it lives in `src/styles/globals.css`. A section takes `paint` plus one wash class (`wash-cloud`, `wash-dawn`, `wash-sage`, `wash-grass`, `wash-clay`, `wash-forest`, `wash-soil`); the washes go from the sky down to the soil. `brushed` adds a row of brush-stroke ends on top of the section. Dark washes and `sheet` (a cream card) set `--color-fg`, and the muted and line colours follow it. `btn`, `stroke-link` and `tag` are the only interface primitives. Headings use `display` (Bricolage Grotesque, narrow and heavy). The words in `*asterisks*` are filled with paint: `painted` plus one `ink-*` class (`ink-meadow`, `ink-plum` and `ink-ember` for light washes, `ink-dusk` for dark ones). `PaintedLogo` shows a company logo as one shape of thick paint; `pnpm generate:logo-masks` makes its masks from `public/logos`.

Paintings are woven into the page in three ways. `PaintedBand` is a strip of a painting between two sections (see `page.tsx`). `PaintedProp` is a cut-out object with a transparent background that stands in a section. The painted talk covers use the letter fills. Every `paint` section also has a `PaintLight` as a direct child: under the mouse a second pigment (`--glow` of the wash) shows and the relief of the paint gets stronger. One `PaintLightDriver` in `page.tsx` moves it. A new section needs its own `<PaintLight />`.

**Path Aliases:**

- `@/*` maps to `./src/*` (e.g., `import '@/styles/globals.css'`)

**Code Style:**

- Tabs for indentation
- Single quotes
- Trailing commas
