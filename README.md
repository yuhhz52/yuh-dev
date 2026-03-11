# 🚀 Fullstack Developer Portfolio

A modern, agency-style fullstack portfolio built with **NestJS** (Backend) + **React TypeScript** (Frontend) + **EJS** (Server-side rendering).

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Components](#components)
- [Backend API](#backend-api)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 📁 Project Structure

```
portfolio/
├── src/                          # Backend (NestJS)
│   ├── app.controller.ts         # Main controller - handles GET / route
│   ├── app.module.ts             # NestJS module configuration
│   └── main.ts                   # Application bootstrap
├── views/                        # Server-side templates (EJS)
│   ├── index.ejs                 # Main layout
│   └── partials/                 # Component templates
│       ├── head.ejs              # Head/metadata
│       ├── nav.ejs               # Navigation
│       ├── hero.ejs              # Hero section
│       ├── about.ejs             # About section
│       ├── skills.ejs            # Skills showcase
│       ├── projects.ejs          # Projects showcase
│       ├── experience.ejs        # Career timeline
│       ├── contact.ejs           # Contact form
│       ├── footer.ejs            # Footer
│       └── scripts.ejs           # Client-side scripts
├── client/                       # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/           # React Components
│   │   │   ├── index.ts          # Barrel export
│   │   │   ├── Navigation.tsx     # Nav component
│   │   │   ├── Hero.tsx          # Hero section
│   │   │   ├── About.tsx         # About section
│   │   │   ├── SkillCard.tsx     # Skills component
│   │   │   ├── ProjectCard.tsx   # Projects component
│   │   │   ├── Experience.tsx    # Experience timeline
│   │   │   ├── Contact.tsx       # Contact form
│   │   │   └── Footer.tsx        # Footer
│   │   ├── App.tsx               # Main App component
│   │   └── index.tsx             # React entry point
│   └── package.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
- **NestJS 10.x** - Progressive Node.js framework
- **TypeScript** - Type-safe backend development
- **EJS 3.1.x** - Embedded JavaScript templating

### Frontend
- **React 18.x** - UI library
- **TypeScript** - Type-safe React components
- **Tailwind CSS** - Utility-first styling
- **React DOM** - DOM rendering

### Styling
- **Tailwind CSS v3** - via CDN
- **Inter & Montserrat fonts** - from Google Fonts
- **Custom CSS** - Glass-morphism effects, gradients

---

## 🏗️ Architecture

### Dual Rendering Strategy

This portfolio supports **two rendering approaches**:

#### 1. **Server-Side Rendering (SSR) with EJS**
- Initial page load from NestJS backend
- EJS templates in `/views`
- Fast initial paint, SEO-friendly
- Best for: Static content, traditional web apps

#### 2. **Client-Side Rendering (CSR) with React**
- Modern React components in `/client/src`
- Fully interactive SPA experience
- Component-based architecture
- Best for: Future interactivity, animations, dynamic content

### How They Work Together

```
User Request
    ↓
NestJS Backend (Port 3000)
    ├─ SSR Route: GET / → Renders EJS template
    └─ API Routes: GET /api/* → JSON responses
    ↓
Response sent to client
    ├─ Option A: Static HTML (EJS SSR)
    └─ Option B: Load React SPA (client/)
```

**Future**: You can transition fully to React SPA while keeping NestJS as API layer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd portfolio

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Development

**Run Backend (NestJS/EJS)**
```bash
npm run start:dev
```
Runs on `http://localhost:3000`

**Run Frontend (React)**
```bash
cd client
npm start
```
Runs on `http://localhost:3000` (default CRA port: 3000)

**Build Backend**
```bash
npm run build
```
Outputs to `dist/` folder

**Build Frontend**
```bash
cd client
npm run build
```
Outputs to `client/build/` folder

---

## 🧩 Components

### React Components

All components are located in `/client/src/components/` with full TypeScript support.

#### **Navigation**
```tsx
import { Navigation } from './components';

<Navigation 
  navLinks={[
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    // ...
  ]}
/>
```

#### **Hero**
```tsx
<Hero 
  badge="Available for new projects"
  title="FULLSTACK DEVELOPER"
  description="..."
/>
```

#### **About**
```tsx
<About
  title="BLENDING STRATEGY WITH TECHNOLOGY."
  stats={[
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Delivered' }
  ]}
/>
```

#### **Skills**
```tsx
<Skills
  skillCategories={[
    {
      title: 'Frontend',
      skills: ['React & Next.js', 'TypeScript', '...']
    },
    // ...
  ]}
/>
```

#### **Projects**
```tsx
<Projects
  projects={[
    {
      id: '1',
      category: 'SaaS Dashboard',
      title: 'GrowthPulse CRM',
      description: '...',
      technologies: ['Next.js', 'PostgreSQL', 'Chart.js']
    },
    // ...
  ]}
/>
```

#### **Experience**
```tsx
<Experience
  experiences={[
    {
      title: 'Senior Fullstack Engineer',
      company: 'Innovate Tech Solutions',
      period: '2021 — PRESENT',
      description: '...'
    },
    // ...
  ]}
/>
```

#### **Contact**
```tsx
<Contact
  email="hello@developer.com"
  socialLinks={[
    { label: 'GitHub', url: '#' },
    { label: 'LinkedIn', url: '#' }
  ]}
/>
```

---

## 🔌 Backend API

### Routes

| Method | Endpoint | Handler | Renders |
|--------|----------|---------|---------|
| GET | `/` | `AppController.getHome()` | `index.ejs` |

### Adding More Routes

```typescript
// src/app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHome() {
    return {};  // Pass data to EJS template
  }

  @Get('api/projects')  // Example API route
  getProjects() {
    return [...];
  }
}
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Frontend
cd client
vercel

# Backend (select Node.js runtime)
vercel
```

### Deploy to Heroku

```bash
heroku create your-portfolio
git push heroku main
heroku open
```

### Deploy to AWS / DigitalOcean

```bash
# Build
npm run build

# Start production
npm run start:prod
```

---

## 🎨 Customization

### Colors
Update in `/client/src/App.tsx` or `/src/main.ts`:

```javascript
{
  'agency-black': '#0a0a0a',
  'agency-gray': '#1a1a1a',
  'agency-accent': '#ff4d00'  // Change accent color
}
```

### Fonts
Update in EJS `<head>` or Tailwind config:
- Primary: **Inter** (sans-serif)
- Display: **Montserrat** (headings)

### Content
- **Projects**: Edit `/client/src/components/ProjectCard.tsx`
- **Experience**: Edit `/client/src/components/Experience.tsx`
- **Skills**: Edit `/client/src/components/SkillCard.tsx`

---

## 📝 TypeScript Support

All components have full TypeScript interfaces:

```typescript
// Example component props
interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
}

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
}
```

---

## 🐛 Troubleshooting

**Port 3000 already in use?**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**EJS rendering errors?**
- Check file paths in `/views`
- Ensure `.ejs` extension on all template files

---

## 📚 Resources

- [NestJS Docs](https://docs.nestjs.com)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [EJS Docs](https://ejs.co)

---

## 📄 License

MIT License - feel free to use for personal portfolios

---

**Built with ❤️ using NestJS, React, and TypeScript**
