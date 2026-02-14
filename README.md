# Todo App

A simple Todo application built with Next.js App Router and TypeScript.

## Features

- Add new tasks
- Mark tasks as completed or active
- Filter by `All`, `Active`, and `Completed`
- Delete individual tasks
- Clear all completed tasks
- Persist tasks in `localStorage`

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint (Next.js core-web-vitals + TypeScript config)

## Project Structure

- `app/page.tsx`: Main Todo UI and state logic
- `app/layout.tsx`: Root layout
- `app/globals.css`: Global styles
- `public/`: Static assets
- `AGENTS.md`: Repository contributor guidelines

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Run production server
- `npm run lint`: Run ESLint checks

## Quality Checks

Before pushing changes, run:

```bash
npm run lint
npm run build
```

## Notes

- Todo items are stored in browser `localStorage` under the key `todo-app-items`.
- This is a client-side app; data is not synced to a backend.
