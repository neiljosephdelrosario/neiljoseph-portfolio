# Neil Joseph — Portfolio

A monolithic, minimal portfolio site built with **Next.js 14**, **React**, **TypeScript**, and **Tailwind CSS**.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS animations
- **Font**: Metropolis (via cdnfonts)

## Features
- ✦ Animated loading screen spelling **"Neil"**
- ✦ Custom magnetic cursor with blend mode
- ✦ Hero entrance animation on load
- ✦ Scroll-triggered reveal animations (fade up, left, right)
- ✦ Project hover sweep effect
- ✦ Fully responsive (mobile hamburger menu)
- ✦ Monolith theme: black / off-white / gray

## Project Structure
```
neil-portfolio/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Main page (composes all sections)
│   └── globals.css       # Global styles + animations
├── components/
│   ├── LoadingScreen.tsx  # "Neil" loading animation
│   ├── Cursor.tsx         # Custom cursor with ring lag
│   ├── Navbar.tsx         # Fixed nav + mobile menu
│   ├── Hero.tsx           # Full-screen hero section
│   ├── About.tsx          # About + experience + tech stack
│   ├── Projects.tsx       # 3 project items with hover effect
│   ├── Contact.tsx        # Contact form + links
│   └── Footer.tsx         # Minimal footer
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Customization

### Update your projects
Edit `components/Projects.tsx` — change the `PROJECTS` array with your real project names, tech stacks, and URLs.

### Update contact links
Edit `components/Contact.tsx` — replace `mailto:neil@example.com`, LinkedIn, and GitHub hrefs.

### Add Metropolis locally
The font loads from `https://fonts.cdnfonts.com/css/metropolis-2`.
To use it locally, download from [fontsquirrel.com](https://www.fontsquirrel.com/fonts/metropolis) and place in `/public/fonts/`.

## Deploy
```bash
npm run build
```
Deploy the `.next` output to Vercel, Netlify, or any Node.js host.
