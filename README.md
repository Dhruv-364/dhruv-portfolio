# Dhruv Verma Portfolio

<p align="center">
  <b>A modern cybersecurity portfolio built with Next.js, React, TypeScript, Tailwind CSS, Three.js, and EmailJS.</b>
</p>

<p align="center">
  <a href="https://github.com/Dhruv-364/dhruv-portfolio"><b>Repository</b></a>
  |
  <a href="#highlights"><b>Highlights</b></a>
  |
  <a href="#tech-stack"><b>Tech Stack</b></a>
  |
  <a href="#getting-started"><b>Getting Started</b></a>
  |
  <a href="#content-management"><b>Content</b></a>
  |
  <a href="#deployment"><b>Deployment</b></a>
</p>

---

## Overview

This portfolio presents Dhruv Verma's security projects, internship experience, certifications, writeups, resume, and contact options in a responsive single-page portfolio.

The site is designed around a cyber-themed visual system with an animated 3D background, section navigation, project cards, experience timelines, certification assets, and a working contact form.

```text
Repository: https://github.com/Dhruv-364/dhruv-portfolio
```

## Highlights

| Feature | What it does |
| --- | --- |
| Next.js Portfolio | Responsive single-page portfolio built with the App Router. |
| Cyber Hero Section | Security-focused intro with profile image and resume download. |
| 3D Visual System | Three.js background with animated network nodes, grid motion, and pointer movement. |
| Project Showcase | Highlights blue-team, threat-intelligence, vulnerability-scanning, IoT, and security-engineering work. |
| Experience Timeline | Covers cybersecurity, SOC, VAPT, IoT, cloud, and network-security internships. |
| Blog and Writeups | Structured local content for security notes and writeups. |
| Certification Gallery | Local certification assets served from the `public/certs` directory. |
| Contact Form | EmailJS-powered contact form. |
| SEO Metadata | Metadata configured in the app layout. |
| Centralized Content | Portfolio content managed from one data file. |

## Portfolio Flow

```text
Hero
  -> About and Education
  -> Projects
  -> Experience
  -> Blog and Writeups
  -> Certifications
  -> Contact
```

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| 3D Visuals | Three.js |
| Contact Form | EmailJS |
| Linting | ESLint 9 with Next.js config |
| Package Manager | npm |

## Project Structure

<details open>
<summary><b>Click to view folder structure</b></summary>

```text
.
|-- app
|   |-- CyberScene.tsx       # Animated Three.js background
|   |-- globals.css          # Global styles and visual system
|   |-- layout.tsx           # Root layout and SEO metadata
|   |-- page.tsx             # Main portfolio UI
|   `-- portfolioData.ts     # Portfolio content source
|-- public
|   |-- DhruvVerma-Resume.pdf
|   |-- profile3.png
|   `-- certs
|       |-- comptia.png
|       |-- deloitte.png
|       |-- google.png
|       |-- hackerrank.png
|       `-- tata.png
|-- package.json
|-- package-lock.json
|-- next.config.ts
|-- tsconfig.json
|-- postcss.config.mjs
`-- eslint.config.mjs
```

</details>

## App Architecture

| Source | Role |
| --- | --- |
| `app/page.tsx` | Main portfolio interface and section layout. |
| `app/CyberScene.tsx` | Animated Three.js cyber background. |
| `app/globals.css` | Global styling, theme, responsive behavior, and visual system. |
| `app/layout.tsx` | Root layout and SEO metadata. |
| `app/portfolioData.ts` | Central source for portfolio content. |
| `public/` | Resume, profile image, certification images, and other static assets. |

## Getting Started

<details open>
<summary><b>1. Check prerequisites</b></summary>

Install Node.js and npm. For best results, use a current LTS version of Node.js.

```bash
node --version
npm --version
```

</details>

<details open>
<summary><b>2. Install dependencies</b></summary>

```bash
npm install
```

</details>

<details open>
<summary><b>3. Run locally</b></summary>

```bash
npm run dev
```

Open the local development server:

```text
http://localhost:3000
```

</details>

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the Next.js development server with webpack. |
| `npm run build` | Creates a production build. |
| `npm run start` | Runs the production server after a successful build. |
| `npm run lint` | Runs ESLint checks. |

## Content Management

Most portfolio content is managed from:

```text
app/portfolioData.ts
```

Update this file to edit:

- Navigation labels and section links.
- Hero text, education, contact details, resume link, and profile image.
- Project titles, descriptions, bullet points, and tags.
- Experience entries, timelines, tools, workflows, and impact points.
- Blog posts and writeup content.
- Certification names, organizations, logos, links, and tags.
- Footer and contact content.

The main visual structure is handled in:

```text
app/page.tsx
app/globals.css
app/CyberScene.tsx
```

## Assets

Static files live in the `public` directory and are served from the site root.

| Local file | Site path |
| --- | --- |
| `public/profile3.png` | `/profile3.png` |
| `public/DhruvVerma-Resume.pdf` | `/DhruvVerma-Resume.pdf` |
| `public/certs/comptia.png` | `/certs/comptia.png` |
| `public/certs/deloitte.png` | `/certs/deloitte.png` |
| `public/certs/google.png` | `/certs/google.png` |
| `public/certs/hackerrank.png` | `/certs/hackerrank.png` |
| `public/certs/tata.png` | `/certs/tata.png` |

When replacing assets, keep the same filenames if you do not want to update code references.

## Contact Form Setup

The contact form uses `@emailjs/browser` and is wired in:

```text
app/page.tsx
```

The current implementation calls `emailjs.sendForm(...)` from the client. If you create a new EmailJS service or template, update the service ID, template ID, and public key in that file.

For a production portfolio, consider moving form settings into environment variables and validating the EmailJS template fields before deployment.

## SEO

Basic metadata is configured in:

```text
app/layout.tsx
```

It includes:

- Page title.
- Description.
- Keywords.
- Open Graph metadata.

Update this file when changing the portfolio focus, role targets, or public branding.

## Deployment

This project is ready to deploy on Vercel or any platform that supports Next.js.

| Step | Action |
| --- | --- |
| 1 | Import the GitHub repository into Vercel. |
| 2 | Keep the default Next.js build settings. |
| 3 | Use `npm run build` as the build command. |
| 4 | Let Vercel detect Next.js automatically. |
| 5 | Add environment variables if the contact form is moved out of hardcoded client configuration. |
| 6 | Deploy. |

## Verification

Before pushing changes, run:

```bash
npm run lint
npm run build
```

These checks help catch TypeScript, linting, framework, and production-build issues.

## Git Workflow

```bash
git status
git add .
git commit -m "Describe your change"
git push origin main
```

## License

This is a personal portfolio project. All resume, profile, certification, and personal-branding assets belong to Dhruv Verma unless otherwise stated.
