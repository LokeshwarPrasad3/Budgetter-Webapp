# Repository Guidelines

## Project Structure & Module Organization
`client/` contains the Vite + React + TypeScript frontend. Main app code lives in `client/src`, with reusable UI in `client/src/components`, route pages in `client/src/pages`, API clients in `client/src/services`, Redux state in `client/src/features`, and static assets in `client/public`.

`server/` contains the Express backend. Entry points are `server/src/index.js` and `server/src/app.js`; routes, controllers, models, middleware, services, and utilities are grouped under `server/src/*`. Email templates and uploaded files live in `server/public`.

## Build, Test, and Development Commands
- `cd client && npm run dev` starts the frontend on the Vite dev server.
- `cd client && npm run build` runs TypeScript project checks and creates a production build.
- `cd client && npm run lint` runs ESLint for `.ts` and `.tsx` files.
- `cd client && npm run typecheck` runs TypeScript without emitting files.
- `cd client && npm run format` formats frontend files with Prettier.
- `cd server && npm run dev` starts the backend in development mode.
- `cd server && npm run start` runs the backend with Node.
- `cd server && npm run format` formats backend files with Prettier.

## Coding Style & Naming Conventions
Use 2-space indentation and keep formatting consistent with Prettier. Frontend files use TypeScript, React function components, and Tailwind utility classes. Components and page files use PascalCase, hooks use `useXxx`, functions and variables use camelCase, and Redux slices end with `Slice` where applicable. Keep backend modules focused by domain, for example `user.routes.js`, `user.controllers.js`, and `user.model.js`.

## Testing Guidelines
There is no automated test suite yet at the repository root or in `server/`. Treat `client` quality gates as the minimum: run `npm run lint`, `npm run typecheck`, and `npm run build` before opening a PR. If you add tests, place them next to the feature or in a nearby `__tests__` directory and use clear names like `ComponentName.test.tsx`.

## Commit & Pull Request Guidelines
Recent history follows Conventional Commit prefixes such as `feat:` and `fix:`. Continue using concise, imperative messages like `feat: add monthly report filters`. Branch names in `CONTRIBUTING.md` follow `feature/...`, `fix/...`, and `chore/...`.

Before committing, note that `.husky/pre-commit` runs `client` build and formatting, then `server` formatting, and stages any resulting file changes. PRs should include a short description, linked issue when relevant, and screenshots for visible frontend updates.

## Configuration Tips
Keep secrets in `server/.env`; do not commit environment files. The backend expects MongoDB, Cloudinary, Gmail, token secrets, and local `FRONTEND_URL` / `SERVER_URL` values described in `README.md`.
