# GraphQL Student Dashboard

A live web dashboard for authenticated Reboot students, published on GitHub Pages. It reads profile and progression data through GraphQL and presents XP totals, audit statistics, recent projects and skill visualizations.

**Project type:** Individual project, developed by Hasan Abbas.

## Open the live application

**[Launch GraphQL Student Dashboard](https://hasanjami.github.io/graphql-student-dashboard/)**

Open the link in your browser and sign in with your own Reboot username or email and password. The dashboard runs online; no installation, local server or command-line setup is needed to use it.

The public site hosts the application interface. Each student must authenticate with Reboot to retrieve their own data; no student records or login credentials are bundled with the site.

## Features

- Sign-in through the Reboot authentication API.
- JWT-based GraphQL requests with session-scoped browser storage.
- Profile details and total XP.
- Audit ratio bars and an SVG skills radar chart.
- Recent completed projects and audit history.
- Logout that clears the local session token.

## My work

I implemented the sign-in flow, GraphQL queries, response processing, DOM rendering and SVG charts using plain JavaScript, HTML and CSS.

## Hosting

The live application is hosted directly from this public repository using GitHub Pages, at no hosting cost. GitHub Pages publishes the root of the `main` branch; changes pushed to that branch are deployed automatically.

There is no build step, npm dependency installation or separate application server. All page links and asset paths are relative so they work under the project's GitHub Pages URL. The `.nojekyll` file keeps publishing as a plain static site.

## Data flow

1. The login page sends credentials to `https://learn.reboot01.com/api/auth/signin` over HTTPS.
2. The returned JWT is stored in `sessionStorage` for the browser tab.
3. The profile page requests data from the Reboot GraphQL endpoint using a Bearer token.
4. JavaScript updates the profile cards and draws SVG charts.

The queries target the Bahrain module paths in the Reboot schema. Live profile data requires an authorized Reboot account and availability of the Reboot API.

## Structure

| Files | Purpose |
| --- | --- |
| `index.html`, `login.html`, `login.js`, `login.css` | Entry page and authentication |
| `profile.html`, `profile.js`, `profile.css` | Data queries, profile view and charts |
| `user.svg` | Bundled profile icon |

Debug logging of profile and audit payloads has been removed from this portfolio copy. The same bundled icon is used for all users, so the interface does not depend on missing personal images.

## Optional local development

The published website is the normal way to use the project. If you want to edit the source locally, you can serve a checkout with Python 3 or any other static server:

```bash
git clone https://github.com/hasanjami/graphql-student-dashboard.git
cd graphql-student-dashboard
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://localhost:8000` for development.
