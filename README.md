# GraphQL Student Dashboard

A browser-based dashboard for authenticated Reboot students. It reads profile and progression data through GraphQL and presents XP totals, audit statistics, recent projects and skill visualizations.

**Project type:** Individual project, developed by Hasan Abbas.

## Features

- Sign-in through the Reboot authentication API.
- JWT-based GraphQL requests with session-scoped browser storage.
- Profile details and total XP.
- Audit ratio bars and an SVG skills radar chart.
- Recent completed projects and audit history.
- Logout that clears the local session token.

## My work

I implemented the sign-in flow, GraphQL queries, response processing, DOM rendering and SVG charts using plain JavaScript, HTML and CSS.

## Run locally

No build step or npm dependencies are required. Serve the repository with any static HTTP server. For example, with Python 3:

```bash
git clone https://github.com/hasanjami/graphql-student-dashboard.git
cd graphql-student-dashboard
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000`. You need your own authorized Reboot account to load live data. The repository contains source code, not an exported student profile or a working account token.

## Data flow

1. The login page sends credentials to `https://learn.reboot01.com/api/auth/signin` over HTTPS.
2. The returned JWT is stored in `sessionStorage` for the browser tab.
3. The profile page requests data from the Reboot GraphQL endpoint using a Bearer token.
4. JavaScript updates the profile cards and draws SVG charts.

The queries target the Bahrain module paths in the Reboot schema. This is a client for that authenticated service, so it does not provide a public demo dataset.

## Structure

| Files | Purpose |
| --- | --- |
| `index.html`, `login.html`, `login.js`, `login.css` | Entry page and authentication |
| `profile.html`, `profile.js`, `profile.css` | Data queries, profile view and charts |
| `user.svg` | Bundled profile icon |

Debug logging of profile and audit payloads has been removed from this portfolio copy. The same bundled icon is used for all users, so the interface does not depend on missing personal images.
