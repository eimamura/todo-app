# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 App Router project using TypeScript.
- `app/`: Route and UI source files (`layout.tsx`, `page.tsx`, `globals.css`).
- `public/`: Static assets served at `/` (for example `public/next.svg`).
- Root config: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`.
- Build output: `.next/` (generated; do not edit).

Use the path alias `@/*` from `tsconfig.json` for internal imports when paths get deep.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Create production build (type and framework checks included by Next.js).
- `npm run start`: Run the production build locally.
- `npm run lint`: Run ESLint with Next.js core-web-vitals + TypeScript rules.

Run `npm run lint && npm run build` before opening a PR.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts`/`.tsx`) with `strict` mode enabled.
- Indentation: 2 spaces; prefer double quotes to match existing files.
- Components: PascalCase names (for example `RootLayout`, `Home`).
- Routes/files in `app/`: use Next.js conventions (`page.tsx`, `layout.tsx`).
- Keep components small and composable; colocate route-specific UI under its route folder.

## Testing Guidelines
There is no test framework configured yet. For now:
- Treat `npm run lint` and `npm run build` as required checks.
- For new tests, prefer React Testing Library + Vitest or Jest.
- Name test files `*.test.ts` or `*.test.tsx`, colocated with the unit under test.

## Commit & Pull Request Guidelines
Current history starts from a single bootstrap commit (`Initial commit from Create Next App`). Use clear, imperative commit messages going forward, e.g.:
- `feat: add todo item form`
- `fix: prevent empty todo submission`
- `chore: update lint rules`

PRs should include:
- A short summary of what changed and why.
- Linked issue/ticket when applicable.
- Screenshots or short recordings for UI changes.
- Notes on local verification steps run (`lint`, `build`).

## Security & Configuration Tips
- Keep secrets in `.env.local`; never commit env files with credentials.
- Only expose client-safe values with the `NEXT_PUBLIC_` prefix.
