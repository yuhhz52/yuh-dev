# 📦 Components Documentation

## Overview

This document provides detailed information about each React component, their props, usage, and examples.

---

## Navigation Component

**File:** `/client/src/components/Navigation.tsx`

### Purpose
Fixed header navigation with mobile-responsive menu toggle.

### Props

```typescript
interface NavLink {
  label: string;
  href: string;
}

interface NavigationProps {
  navLinks?: NavLink[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navLinks` | `NavLink[]` | `[{label: 'About', href: '#about'}, ...]` | Array of navigation links |

### Example Usage

```tsx
import { Navigation } from './components';

<Navigation 
  navLinks={[
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
  ]}
/>
```

### Features
- ✅ Fixed positioning
- ✅ Mobile menu toggle
- ✅ Smooth transitions
- ✅ Responsive design (hidden on mobile, visible on md)

### Classes Used
- `fixed top-0 w-full z-50` - Fixed positioning
- `backdrop-blur-md` - Glass morphism
- `md:hidden` - Mobile menu responsive

---

## Hero Component

**File:** `/client/src/components/Hero.tsx`

### Purpose
Landing section with headline, description, and CTA buttons.

### Props

```typescript
interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `badge` | `string` | `'Available for new projects'` | Badge text above title |
| `title` | `string` | `'FULLSTACK DEVELOPER'` | Main headline |
| `description` | `string` | `'Crafting immersive...'` | Subheading text |

### Example Usage

```tsx
import { Hero } from './components';

<Hero
  badge="Available for new opportunities"
  title="FULLSTACK DEVELOPER"
  description="Building amazing web applications with React, Node.js, and beyond."
/>
```

### Features
- ✅ Gradient background
- ✅ Animated background blur effect
- ✅ Multiple CTA buttons
- ✅ Vertical side text on desktop

---

## About Component

**File:** `/client/src/components/About.tsx`

### Purpose
About me section with profile image, description, and statistics.

### Props

```typescript
interface AboutStats {
  value: string;
  label: string;
}

interface AboutProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  stats?: AboutStats[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'BLENDING STRATEGY WITH TECHNOLOGY.'` | Main heading |
| `description` | `string` | `'I am a fullstack web developer...'` | Bio text |
| `imageUrl` | `string` | Google URL | Profile image URL |
| `stats` | `AboutStats[]` | `[{value: '5+', label: 'Years Experience'}, ...]` | Statistics array |

### Example Usage

```tsx
import { About } from './components';

<About
  title="BLENDING STRATEGY WITH TECHNOLOGY."
  description="I am a fullstack web developer passionate about building scalable applications."
  imageUrl="https://example.com/profile.jpg"
  stats={[
    { value: '5+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Delivered' },
    { value: '100+', label: 'Happy Clients' }
  ]}
/>
```

### Features
- ✅ Two-column layout (image + text)
- ✅ Hover effects on image (grayscale toggle)
- ✅ Accent box with establishment year
- ✅ Statistics grid

---

## Skills Component

**File:** `/client/src/components/SkillCard.tsx`

### Purpose
Showcase tech stack organized by categories (Frontend, Backend, Tools).

### Props

```typescript
interface SkillItem {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

interface SkillsProps {
  skillCategories?: SkillItem[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `skillCategories` | `SkillItem[]` | 3 categories | Array of skill categories with icons |

### Example Usage

```tsx
import { Skills } from './components';

<Skills
  skillCategories={[
    {
      icon: <FrontendIcon />,
      title: 'Frontend',
      skills: [
        'React & Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion'
      ]
    },
    {
      icon: <BackendIcon />,
      title: 'Backend',
      skills: [
        'Node.js & Express',
        'PostgreSQL / MongoDB',
        'RESTful APIs & GraphQL',
        'Redis Caching'
      ]
    },
    {
      icon: <ToolsIcon />,
      title: 'Tools',
      skills: [
        'Git & GitHub',
        'Docker & Kubernetes',
        'AWS / Vercel',
        'CI/CD Pipelines'
      ]
    }
  ]}
/>
```

### Features
- ✅ Glass-morphism cards
- ✅ Icon support
- ✅ Hover effect (accent border)
- ✅ Three-column responsive grid

---

## Projects Component

**File:** `/client/src/components/ProjectCard.tsx`

### Purpose
Display portfolio projects with images, descriptions, and links.

### Props

```typescript
interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  technologies: string[];
}

interface ProjectsProps {
  projects?: Project[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `projects` | `Project[]` | 2 example projects | Array of project objects |

### Project Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier |
| `category` | `string` | Project type (e.g., 'SaaS Dashboard') |
| `title` | `string` | Project name |
| `description` | `string` | Project description |
| `imageUrl` | `string` | Project thumbnail image URL |
| `demoUrl` | `string` | Link to live demo |
| `codeUrl` | `string` | Link to source code |
| `technologies` | `string[]` | Tech stack used |

### Example Usage

```tsx
import { Projects } from './components';

<Projects
  projects={[
    {
      id: '1',
      category: 'SaaS Dashboard',
      title: 'GrowthPulse CRM',
      description: 'High-performance sales analytics platform...',
      imageUrl: 'https://example.com/project1.jpg',
      demoUrl: 'https://growthpulse.demo.com',
      codeUrl: 'https://github.com/user/growthpulse',
      technologies: ['Next.js', 'PostgreSQL', 'Chart.js']
    },
    // ... more projects
  ]}
/>
```

### Features
- ✅ Image hover effects (grayscale, scale)
- ✅ Overlay with Demo/Code buttons
- ✅ Tech tags display
- ✅ Responsive grid (2 columns on desktop, 1 on mobile)

---

## Experience Component

**File:** `/client/src/components/Experience.tsx`

### Purpose
Display career timeline with job positions and descriptions.

### Props

```typescript
interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  isHighlighted?: boolean;
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `experiences` | `ExperienceItem[]` | 3 experiences | Array of job positions |

### Experience Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | `string` | Unique identifier |
| `title` | `string` | Job title |
| `company` | `string` | Company name |
| `period` | `string` | Employment period |
| `description` | `string` | Job responsibilities & achievements |
| `isHighlighted` | `boolean?` | Highlight current role (makes dot orange) |

### Example Usage

```tsx
import { Experience } from './components';

<Experience
  experiences={[
    {
      id: '1',
      title: 'Senior Fullstack Engineer',
      company: 'Innovate Tech Solutions',
      period: '2021 — PRESENT',
      description: 'Leading frontend migration to Next.js. Improved performance by 40%.',
      isHighlighted: true
    },
    {
      id: '2',
      title: 'Web Developer',
      company: 'Pixel Perfect Agency',
      period: '2019 — 2021',
      description: 'Developed 20+ responsive websites for international clients.'
    },
    // ... more experiences
  ]}
/>
```

### Features
- ✅ Vertical timeline layout
- ✅ Highlight current position
- ✅ Color-coded timeline dots
- ✅ Responsive stacking

---

## Contact Component

**File:** `/client/src/components/Contact.tsx`

### Purpose
Contact section with form and social media links.

### Props

```typescript
interface ContactProps {
  email?: string;
  socialLinks?: {
    label: string;
    url: string;
  }[];
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `email` | `string` | `'hello@developer.com'` | Contact email address |
| `socialLinks` | `SocialLink[]` | GitHub, LinkedIn, Twitter | Array of social media links |

### Example Usage

```tsx
import { Contact } from './components';

<Contact
  email="contact@yourname.com"
  socialLinks={[
    { label: 'GitHub', url: 'https://github.com/yourname' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourname' },
    { label: 'Twitter', url: 'https://twitter.com/yourname' }
  ]}
/>
```

### Form State

The component manages internal form state:

```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
```

### Features
- ✅ Contact form with validation
- ✅ Social media links
- ✅ Loading state on submit
- ✅ Glass-morphism card design
- ✅ Two-column layout

### Form Handling

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  // TODO: Connect to email service
  console.log('Form submitted:', formData);
  
  setIsSubmitting(false);
};
```

---

## Footer Component

**File:** `/client/src/components/Footer.tsx`

### Purpose
Footer section with branding, copyright, and back-to-top link.

### Props

```typescript
interface FooterProps {
  brandName?: string;
  year?: number;
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `brandName` | `string` | `'DEV.PORTFOLIO'` | Brand name display |
| `year` | `number` | `new Date().getFullYear()` | Copyright year |

### Example Usage

```tsx
import { Footer } from './components';

<Footer
  brandName="MY PORTFOLIO"
  year={2024}
/>
```

### Features
- ✅ Responsive flexbox layout
- ✅ Dynamic copyright year
- ✅ Back-to-top smooth scroll
- ✅ Social links support

---

## Component Composition Example

```tsx
// App.tsx
import {
  Navigation,
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
  Footer
} from './components';

function App() {
  return (
    <div className="bg-agency-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
```

---

## Styling

All components use **Tailwind CSS** utility classes:

### Common Patterns

**Glass-morphism effect:**
```tsx
<div className="glass-card p-10 hover:border-agency-accent">
  {/* content */}
</div>
```

**Section spacing:**
```tsx
<section className="py-24 bg-agency-black">
  <div className="container mx-auto px-6 max-w-7xl">
    {/* content */}
  </div>
</section>
```

**Responsive text:**
```tsx
<h1 className="text-4xl md:text-6xl lg:text-8xl font-black">
  Responsive Heading
</h1>
```

---

## Type Safety

All components have full TypeScript support with interfaces:

```typescript
// ✅ Type-safe props
<Hero 
  title="Valid" 
  description="Valid"
  // badge: 123  // ❌ Error: type 'number' is not assignable
/>
```

---

## Performance Tips

1. **Memoization**: Use `React.memo()` for components that receive same props
```typescript
export default React.memo(ProjectCard);
```

2. **Lazy Loading**: Load heavy components on demand
```typescript
const Projects = React.lazy(() => import('./ProjectCard'));
```

3. **Image Optimization**: Use Next.js Image component in production
```tsx
import Image from 'next/image';
```

---

## Accessibility

All components include accessibility features:
- ✅ Semantic HTML (`<section>`, `<article>`, `<nav>`)
- ✅ ARIA labels (`aria-label="Toggle Menu"`)
- ✅ Proper heading hierarchy (h1, h2, h3, h4)
- ✅ Link targets (`target="_blank" rel="noopener noreferrer"`)

---

## Testing

Example Jest test for a component:

```typescript
// Hero.test.tsx
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero Component', () => {
  it('renders with default props', () => {
    render(<Hero />);
    expect(screen.getByText(/FULLSTACK DEVELOPER/i)).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<Hero title="CUSTOM TITLE" />);
    expect(screen.getByText(/CUSTOM TITLE/i)).toBeInTheDocument();
  });
});
```

---

**Last Updated:** March 2024  
**Version:** 1.0.0
