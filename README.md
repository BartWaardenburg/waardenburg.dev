# waardenburg.dev

Personal site of Bart Waardenburg: developer tools (Fallow, IsAgentReady), talks and career.

Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion and Lenis. The particle field behind the page is raw WebGL2 with a single draw call: every section morphs the same particles into a new formation as you scroll.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run Oxlint
- `pnpm format` - Format code with Prettier

## Editing content

All copy lives in `src/content.ts`. Fallow's npm downloads and GitHub stars are fetched on the server and revalidated daily (`src/lib/stats.ts`).
