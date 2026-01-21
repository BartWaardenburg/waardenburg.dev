# Personal Website Plan: Bart Waardenburg

## Profile Summary

**Name:** Bart Waardenburg
**Location:** Rijswijk / The Hague, Netherlands
**Role:** Freelance Front-End Developer & Tech Lead
**Website:** waardenburg.dev
**Email:** bart@waardenburg.dev

---

## About / Bio

Bart Waardenburg is a front-end and TypeScript enthusiast based in the Netherlands. With a bachelor's degree in Communication and Multimedia Design from The Hague University of Applied Sciences (2008-2013), he combines technical expertise with a keen eye for design to create optimal user experiences.

As the founder of Bart Waardenburg Development, he specializes in building scalable front-end architectures, design systems, and component libraries. His tech stack centers around React, Preact, Next.js, TypeScript, and AWS.

Bart is also a public speaker, sharing his expertise at meetups like React Amsterdam and Rotterdam-The Hague Front-end Meetup. He's contributed to open-source projects and is an Arctic Code Vault Contributor on GitHub.

---

## Key Highlights

- **15+ years** of professional experience in front-end development
- **Website of the Year 2013** winner (Weather and Traffic category)
- **Public Speaker** at React Amsterdam and other tech meetups
- Building with cutting-edge tech: Next.js 16, React 19, Tailwind CSS 4

---

## Technical Skills

### Primary Stack

- TypeScript / JavaScript (ES6+)
- React 19 / Preact / Next.js 16
- Tailwind CSS 4
- Vercel / Cloudflare

### Additional Expertise

- Design Systems & Component Libraries
- Modern Tooling (Turbopack, Oxlint, pnpm)
- Edge Computing & Serverless
- Testing Methodologies

---

## Notable Projects & Open Source

| Project                         | Description                                            | Stars |
| ------------------------------- | ------------------------------------------------------ | ----- |
| recraft-mcp-server              | MCP Server for recraft.ai using Model Context Protocol | 8     |
| redux-queryparam-middleware     | Redux middleware for URL query parameters              | 6     |
| angular-es6-webpack             | SPA styleguide with Angular.js and ES6                 | 5     |
| redux-simple-storage-middleware | Redux middleware for session/local storage             | 4     |
| apigee-utils                    | Utility functions for Apigee Edge API platform         | 3     |

---

## Speaking Engagements

1. **Building a Design System with (P)react** - React Amsterdam Meetup
2. **Creating a (P)react Component Library** - Rotterdam-The Hague Front-end Meetup
3. **React and the Three Layers of Testing** - React Amsterdam Meetup

---

## Professional Experience Highlights

- **ANWB Routeplanner** - Contributed to transitioning a national route planning application to modern architecture
- **Various organizations** in The Hague, Rotterdam, and Amsterdam regions
- Served on the participation council at Academie ICT & Media during education

---

## Website Design Plan

### Design Philosophy

The website should reflect Bart's professional identity: **clean, modern, technically excellent, and user-focused**. It should demonstrate the same principles he applies to his client work.

### Recommended Sections

#### 1. Hero Section

- Full-viewport landing with name, title, and tagline
- Subtle animation or gradient background
- Clear CTA buttons: "View Work" / "Get in Touch"
- Professional photo (optional)

#### 2. About Section

- Concise bio focusing on expertise and approach
- Key stats: years of experience, projects delivered, technologies
- Personal touch: what drives him, interests outside work

#### 3. Skills & Technologies

- Visual representation of tech stack (icons/badges)
- Grouped by category: Frontend, State Management, Cloud, Tools
- Skill level indicators (optional)

#### 4. Selected Work / Projects

- Grid or card layout showcasing 4-6 key projects
- Each card: thumbnail, title, brief description, tech used
- Links to live sites or case studies where available

#### 5. Open Source

- Featured GitHub repositories
- Star counts and descriptions
- Direct links to repos

#### 6. Speaking & Writing

- List of talks with event names
- Links to slides (Notist) or video recordings
- Blog posts or articles (if any)

#### 7. Contact Section

- Contact form or direct email link
- Social links: GitHub, LinkedIn, X/Twitter
- Location mention (The Netherlands)
- Availability status (optional)

### Design Specifications

#### Color Palette (Suggested)

```
Primary:     #2563eb (Blue)
Secondary:   #1e293b (Dark slate)
Accent:      #06b6d4 (Cyan)
Background:  #f8fafc (Light) / #0f172a (Dark mode)
Text:        #1e293b (Light mode) / #f1f5f9 (Dark mode)
```

#### Typography

- Headings: Inter or Plus Jakarta Sans (modern, clean)
- Body: Inter or System fonts for performance
- Code: JetBrains Mono or Fira Code

#### Layout Principles

- Maximum content width: 1200px
- Generous whitespace
- Responsive: mobile-first approach
- Dark/light mode toggle

#### Animations

- Subtle scroll-triggered reveals
- Smooth hover transitions
- No excessive motion (respect prefers-reduced-motion)

---

## Technical Implementation Plan

### Stack (Already Set Up)

```
Framework:    Next.js 16 with Pages Router + Turbopack
Styling:      Tailwind CSS 4
Deployment:   Vercel (already configured)
Linting:      Oxlint
Formatting:   Prettier (tabs, single quotes, trailing commas)
Package Mgr:  pnpm
Analytics:    Vercel Analytics or Plausible (recommended)
```

### File Structure (Using Existing Setup)

```
waardenburg.dev/
├── src/
│   ├── pages/              # Next.js Pages Router
│   │   ├── _app.tsx
│   │   ├── index.tsx       # Homepage
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── contact.tsx
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Speaking.tsx
│   │   │   └── Contact.tsx
│   │   └── layout/
│   │       ├── Header.tsx  # Already exists
│   │       └── Footer.tsx
│   ├── styles/
│   │   └── globals.css     # Tailwind imports
│   └── data/
│       └── content.ts      # Site content/projects data
├── public/
│   └── images/
└── package.json
```

**Path Alias:** `@/*` maps to `./src/*`

### Key Features to Implement

1. **Performance**
   - Static generation for all pages
   - Optimized images with next/image
   - Font optimization
   - Lighthouse score > 95

2. **Accessibility**
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation
   - Screen reader friendly

3. **SEO**
   - Meta tags and Open Graph
   - Structured data (JSON-LD)
   - Sitemap generation
   - robots.txt

4. **Dark Mode**
   - System preference detection
   - Manual toggle with persistence
   - Smooth transitions

5. **Animations**
   - Framer Motion for page transitions
   - Intersection Observer for scroll reveals
   - CSS transitions for micro-interactions

---

## Content Checklist

- [ ] Professional headshot photo
- [ ] Detailed project descriptions and screenshots
- [ ] Links to live projects (where available)
- [ ] Speaking engagement slides/videos
- [ ] Testimonials from clients (optional)
- [ ] Blog posts or articles (optional)

---

## Social Links

- **GitHub:** https://github.com/BartWaardenburg
- **LinkedIn:** https://linkedin.com/in/bartwaardenburg
- **X/Twitter:** https://x.com/bartwaardenburg
- **Notist (Talks):** https://noti.st/bartwaardenburg
- **SlideShare:** https://slideshare.net/bartwaardenburg

---

## Next Steps for Design/Coding Agent

Project is already initialized with Next.js 16, React 19, Tailwind CSS 4, and Vercel.

1. **Create reusable UI components** (Button, Card, Section wrappers)
2. **Build each section** starting with Hero and About
3. **Add responsive design** and dark mode
4. **Implement animations** (consider Framer Motion or CSS animations)
5. **Populate with real content** from data file
6. **Optimize for performance** and accessibility
7. **Test across devices and browsers**

**Dev commands:**

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm type-check   # TypeScript checking
pnpm lint         # Oxlint
pnpm format       # Prettier
```

---

_Plan created: January 2026_
