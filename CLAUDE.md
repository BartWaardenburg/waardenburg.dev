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

This is a Next.js 16 personal website: a single, scroll-driven page backed by a WebGL particle field.

**Stack:**

- Next.js 16 with the App Router (`src/app/`)
- React 19
- TypeScript 5.9 with strict mode
- Tailwind CSS 4 for styling (theme tokens in `src/styles/globals.css`)
- Motion (`motion/react`) for scroll-linked animation, Lenis for smooth scrolling
- Raw WebGL2 for the particle field (no three.js)
- Oxlint for linting, Prettier for formatting

**Directory Structure:**

- `src/app/` - Layout, metadata and the home page (ISR, revalidated daily for live npm/GitHub stats)
- `src/content.ts` - All copy on the site
- `src/components/` - One folder per component (`Name/Name.tsx` + `index.ts`)
- `src/components/Motion/` - Animation primitives. `Reveal` and `SplitWords` are CSS-only and driven by one shared `RevealObserver`; keep them that way so they cost nothing to hydrate
- `src/gl/` - The particle engine: `engine.ts` (WebGL2, one draw call), `shapes.ts` (the formations), `math.ts`
- `src/lib/` - Stats fetching and hooks
- `src/styles/` - Global CSS (includes Tailwind imports)

**How the particle field works:**

Sections declare a formation with `data-scene="<name>"` (see `SCENES` in `src/gl/shapes.ts`). The engine keeps each formation in its own GPU buffer and morphs between neighbours as the page scrolls. Formations after the first are built in idle time. Without WebGL2, or with reduced motion, the page renders without it (the `gl` class on `<html>` is set by an inline probe in the layout).

**Path Aliases:**

- `@/*` maps to `./src/*` (e.g., `import '@/styles/globals.css'`)

**Code Style:**

- Tabs for indentation
- Single quotes
- Trailing commas
