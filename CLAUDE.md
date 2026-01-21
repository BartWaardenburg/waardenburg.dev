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

This is a Next.js 16 personal website.

**Stack:**
- Next.js 16 with Pages Router (`src/pages/`)
- React 19
- TypeScript 5.9 with strict mode
- Tailwind CSS 4 for styling
- Oxlint for linting
- Prettier for formatting

**Directory Structure:**
- `src/pages/` - Next.js pages (file-based routing)
- `src/components/` - React components
- `src/styles/` - Global CSS (includes Tailwind imports)

**Path Aliases:**
- `@/*` maps to `./src/*` (e.g., `import '@/styles/globals.css'`)

**Code Style:**
- Tabs for indentation
- Single quotes
- Trailing commas
