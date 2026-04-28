# Repository Guidelines

## Project Structure & Module Organization
This repo is a single React + TypeScript frontend monolith. Application code lives in `src/`.

- `src/routes/`: route-level screens, including dynamic segments such as `orders/$orderId.tsx`
- `src/app/`: app bootstrap, router setup, and providers
- `src/components/`: reusable UI, forms, navigation, and shared layout pieces
- `src/api/`: client-side data access helpers grouped by domain
- `src/mocks/`: MSW handlers and in-memory store used during development
- `src/styles/`: global styles
- `public/`: static assets and the MSW worker file

Use the `@/` import alias for internal modules instead of long relative paths.

## Build, Test, and Development Commands
Prefer Bun for local work; `package-lock.json` exists, but `packageManager` is set to `bun@1.2.8`.

- `bun install`: install dependencies
- `bun run dev`: start the Vite dev server with MSW enabled in development
- `bun run build`: run TypeScript checks, then create a production build in `dist/`
- `bun run typecheck`: run `tsc --noEmit`
- `bun run lint`: run ESLint across the repo
- `bun run preview`: serve the built app locally

## Coding Style & Naming Conventions
Use TypeScript and function components. Follow the existing style: 2-space indentation, double quotes, semicolons, and trailing commas where the formatter leaves them. Keep route files aligned with URL structure (`catalog/index.tsx`, `catalog/$productId.tsx`).

Component files are typically kebab-case (`app-shell.tsx`, `status-badge.tsx`), while exported React components and TypeScript interfaces use PascalCase. Keep domain helpers close to their area (`src/api/orders.ts`, `src/utils/discounts.ts`).

## Testing Guidelines
There is no dedicated automated test runner configured yet. Until one is added, every change should pass `bun run lint`, `bun run typecheck`, and, when relevant, `bun run build`.

When adding tests, keep them next to the feature or under a focused `src/**/__tests__/` folder, and name files `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `Tailwind 4` and `CSS config`. Keep commit titles brief and descriptive; one logical change per commit.

Pull requests should include a concise summary, note affected routes or modules, link the related issue when applicable, and attach screenshots or short recordings for UI changes.
