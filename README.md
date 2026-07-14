# Dhruv Verma Portfolio

A modern cybersecurity portfolio for Dhruv Verma, built with Next.js, React, TypeScript, Tailwind CSS, Three.js, and EmailJS.

The site presents Dhruv's security projects, internship experience, certifications, writeups, resume, and contact options in a responsive single-page portfolio. It is designed around a cyber-themed visual system with an animated 3D background, section navigation, project cards, experience timelines, certification assets, and a working contact form.

## Repository

```text
https://github.com/Dhruv-364/dhruv-portfolio
```

## Highlights

- Responsive portfolio built with the Next.js App Router.
- Cybersecurity-focused hero section with resume download and profile image.
- Animated Three.js background scene with network nodes, grid motion, and pointer-based movement.
- Project showcase for blue-team, threat-intelligence, vulnerability-scanning, IoT, and security-engineering work.
- Experience section covering cybersecurity, SOC, VAPT, IoT, cloud, and network-security internships.
- Blog and writeup section powered by structured local content.
- Certification gallery with local image assets.
- Contact form integration using EmailJS.
- SEO metadata configured in the app layout.
- Centralized portfolio content in a single data file for easy updates.

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

## Getting Started

### Prerequisites

Install Node.js and npm. For best results, use a current LTS version of Node.js.

Check your versions:

```bash
node --version
npm --version
```

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open the local development server:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the Next.js development server with webpack.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Runs the production server after a successful build.

```bash
npm run lint
```

Runs ESLint checks.

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

Examples:

```text
public/profile3.png              -> /profile3.png
public/DhruvVerma-Resume.pdf     -> /DhruvVerma-Resume.pdf
public/certs/comptia.png         -> /certs/comptia.png
```

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

Recommended Vercel flow:

1. Import the GitHub repository into Vercel.
2. Keep the default Next.js build settings.
3. Build command: `npm run build`.
4. Output handling: Vercel detects Next.js automatically.
5. Add environment variables if the contact form is moved out of hardcoded client configuration.
6. Deploy.

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
