# Loyalty Card Demo

A small Next.js app that demonstrates a loyalty card flow using Privy authentication. Users sign in with an email code, and the app can award a loyalty stamp through a server route that verifies the access token before incrementing the count.

## What this project does

- Email-based login powered by Privy
- Protected API endpoint for awarding loyalty stamps
- In-memory stamp tracking per verified Privy user
- Simple client-side UX for logging in and awarding a stamp

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Privy Auth
- Tailwind CSS

## Project structure

```bash
app/
  api/
    award-stamp/
      route.ts         # Verifies the Privy access token and increments stamp count
  award-stamp.tsx      # Button to trigger a stamp award
  globals.css          # Global styling
  layout.tsx           # App shell and Privy provider setup
  login-email.tsx      # Email login form
  page.tsx             # Main home screen
  providers.tsx        # Wraps the app in PrivyProvider
```

## Prerequisites

- Node.js 20+
- pnpm
- A Privy app configured in the Privy dashboard

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
PRIVY_APP_SECRET=your_privy_app_secret
```

3. Start the dev server:

```bash
pnpm dev
```

4. Open http://localhost:3000 in your browser.

## How it works

- The user signs in with their email using Privy.
- The client fetches an access token with `getAccessToken()`.
- The browser sends that token to `/api/award-stamp`.
- The server verifies the token through Privy before incrementing the user’s stamp count.
- The current count is returned to the client and displayed.

## Notes

- Stamp data is stored in memory using a `Map`, so it resets when the server restarts.
- This is a demo/prototype and is not production-ready persistence or multi-instance storage.
- For a real deployment, replace the in-memory store with a database or persistent backend.

## Useful scripts

```bash
pnpm dev      # run the development server
pnpm build    # create a production build
pnpm start    # run the production server
pnpm lint     # run ESLint
```

## Security notes

The server route validates the bearer token before allowing any change to the stamp count. The route does not accept anonymous requests and rejects invalid or missing authorization headers.
