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
```

## Architecture

This is a Next.js 16 personal website: a single page, styled as an oil painting.

**Stack:**

- Next.js 16 with the App Router (`src/app/`)
- React 19
- TypeScript 5.9 with strict mode
- Tailwind CSS 4 for styling (theme tokens in `src/styles/globals.css`)
- Motion (`motion/react`) for scroll-linked animation, Lenis for smooth scrolling
- Oxlint for linting, Prettier for formatting

**Directory Structure:**

- `src/app/` - Layout, metadata and the home page (ISR, revalidated daily for live npm/GitHub stats)
- `src/content.ts` - All copy on the site
- `src/components/` - One folder per component (`Name/Name.tsx` + `index.ts`)
- `src/components/Motion/` - Animation primitives. `Reveal` and `SplitWords` are CSS-only and driven by one shared `RevealObserver`; keep them that way so they cost nothing to hydrate
- `src/assets/` - The hero painting, imported statically so `next/image` knows its size
- `public/art/` - The paint texture tiles and the brush-stroke edge mask used by the CSS
- `src/lib/` - Stats fetching and hooks
- `src/styles/` - Global CSS (includes Tailwind imports)

**How the painted look works:**

All of it lives in `src/styles/globals.css`. A section takes `paint` plus one wash class (`wash-cloud`, `wash-dawn`, `wash-sage`, `wash-grass`, `wash-clay`, `wash-forest`, `wash-soil`); the washes go from the sky down to the soil. `brushed` adds a row of brush-stroke ends on top of the section. Dark washes and `sheet` (a cream card) set `--color-fg`, and the muted and line colours follow it. `btn`, `stroke-link`, `dab` and `tag` are the only interface primitives. Headings use `display` (Bricolage Grotesque, narrow and heavy) with Instrument Serif italic for the words in `*asterisks*`.

**Path Aliases:**

- `@/*` maps to `./src/*` (e.g., `import '@/styles/globals.css'`)

**Code Style:**

- Tabs for indentation
- Single quotes
- Trailing commas
