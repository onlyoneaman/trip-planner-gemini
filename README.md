# Gemini Travel Assistant

This is a Travel Assistant made using Gemini API. It is a web app that helps you plan your trip by providing you with the best places to visit, eat and stay at your destination.

### Run Locally

Clone the project

```bash
  git clone git@github.com:onlyoneaman/trip-planner-gemini.git
```

Go to the project directory

```bash
  cd trip-planner-gemini
```

Install dependencies

```bash
  npm install
```

Copy .env.template to .env and add your API key

```bash
  cp .env.template .env
```

Start the server

```bash
  npm run dev
```

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/ja/) (_Optional_)

![screenshot of `App.tsx`](./screenshot.png)

## Setup

- Press the "Use this template" on the top of this repository's GitHub page.
- Run `pnpm install` (or `npm install` if you don't use `pnpm`).
- `pnpm dev` for development.
- Use `pnpm test` to run tests.
- `pnpm build` for production builds.

_Note: You can install `pnpm` via `homebrew` on macOS: `brew install pnpm`._
