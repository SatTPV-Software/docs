# SatTPV API Documentation

Official documentation site for the [SatTPV](https://www.sattpv.net) API, built with [VitePress](https://vitepress.dev).

## Requirements

- Node.js 18+
- npm 9+

## Local development

```bash
npm install
npm run docs:dev
```

The site will be available at http://localhost:5173.

## Build

```bash
npm run docs:build
```

The static output is generated in `docs/.vitepress/dist/`. Upload that folder to your web server (e.g. `docs.sattpv.net`).

## Preview the production build

```bash
npm run docs:preview
```

## Project structure

```
docs/
├── .vitepress/
│   └── config.ts        # Site configuration (nav, sidebar, theme)
├── index.md             # Landing page
├── introduction.md      # Overview & conventions
├── authentication.md    # Login & token caching
└── api/
    └── customers/       # Customers module endpoints
```
