# Dhruv Portfolio

Personal portfolio built with Next.js App Router for Dhruv Verma.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- EmailJS for contact form submission

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Notes:
- `dev` uses `next dev --webpack`
- `build` uses `next build --webpack`

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
app/
  globals.css         Global styles
  layout.tsx          App layout and metadata
  page.tsx            Portfolio page UI
  portfolioData.ts    Portfolio content source

public/
  DhruvVerma-Resume.pdf
  profile3.png
  certs/
    comptia.png
    deloitte.png
    google.png
    hackerrank.png
    tata.png
```

## Content Updates

Most portfolio content is managed from:

- `app/portfolioData.ts`

This includes:

- hero content
- project cards
- experience entries
- blog/writeup content
- certifications
- contact copy
- footer links

Main layout and section presentation live in:

- `app/page.tsx`
- `app/globals.css`

## Contact Form

The contact form uses EmailJS from the client side through `@emailjs/browser`.

Current integration is wired in:

- `app/page.tsx`

If you change EmailJS service, template, or public key, update the values in that file.

## Assets

Current active assets used by the portfolio:

- `public/profile3.png`
- `public/DhruvVerma-Resume.pdf`
- `public/certs/*`

## Verification

Recommended checks:

```bash
npm run lint
npm run build
```
