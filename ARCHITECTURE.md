# 🏗️ Architecture Guide

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│         USER BROWSER (Client-Side)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  React SPA App (/client/src)                    │   │
│  │  - Navigation component                         │   │
│  │  - Hero, About, Skills sections                │   │
│  │  - Projects showcase, Experience timeline       │   │
│  │  - Contact form                                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
         ↓ (HTTP Request)         ↑ (JSON Response)
┌─────────────────────────────────────────────────────────┐
│      NestJS Backend Server (Port 3000)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  AppController                                   │   │
│  │  - GET /           → Render EJS template        │   │
│  │  - GET /api/*      → Return JSON data           │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  View Layer (EJS Templates in /views)           │   │
│  │  - index.ejs       → Main layout                │   │
│  │  - partials/*.ejs  → Reusable sections          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Layers Breakdown

### 1. **Presentation Layer** (React Components)

Located in `/client/src/components/`

```
components/
├── Navigation.tsx      → Header with nav links
├── Hero.tsx            → Landing section
├── About.tsx           → About me with stats
├── SkillCard.tsx       → Tech stack showcase
├── ProjectCard.tsx     → Project grid
├── Experience.tsx      → Timeline
├── Contact.tsx         → Contact form
├── Footer.tsx          → Footer
└── index.ts            → Barrel export
```

**Characteristics:**
- Fully typed with TypeScript interfaces
- Reusable, composable components
- Props-driven (no hardcoded data)
- Tailwind CSS for styling

### 2. **View Layer** (EJS Templates)

Located in `/views/`

```
views/
├── index.ejs           → Main HTML layout
└── partials/
    ├── head.ejs        → Metadata, fonts, Tailwind
    ├── nav.ejs         → Navigation markup
    ├── hero.ejs        → Static hero section
    ├── about.ejs       → Profile section
    ├── skills.ejs      → Skills grid
    ├── projects.ejs    → Projects showcase
    ├── experience.ejs  → Career timeline
    ├── contact.ejs     → Contact form
    ├── footer.ejs      → Footer
    └── scripts.ejs     → Client-side JS
```

**Characteristics:**
- Server-side rendered via NestJS/EJS
- Reusable partials (EJS includes)
- Initial page load optimization
- SEO-friendly

### 3. **Controller Layer** (NestJS)

Located in `/src/app.controller.ts`

```typescript
@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHome() {
    return {};  // Data passed to EJS
  }
}
```

**Responsibilities:**
- Handle HTTP requests
- Route to correct handlers
- Pass data to views/API responses
- HTTP method mapping (@Get, @Post, etc.)

### 4. **Module Layer** (NestJS)

Located in `/src/app.module.ts`

```typescript
@Module({
  imports: [],      // External dependencies
  controllers: [AppController],
  providers: [],    // Services, repositories
})
export class AppModule {}
```

**Responsibilities:**
- Define app structure
- Import global dependencies
- Register controllers & services
- Configure middleware

### 5. **Bootstrap Layer** (NestJS)

Located in `/src/main.ts`

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.enableCors();
  await app.listen(3000);
}
```

**Responsibilities:**
- Initialize NestJS app
- Configure view engine
- Set view directory
- Start server on port 3000

---

## Data Flow

### Scenario 1: Initial Page Load (SSR)

```
1. User visits localhost:3000
   ↓
2. NestJS receives GET /
   ↓
3. AppController.getHome() executed
   ↓
4. EJS engine renders index.ejs with:
   - <%- include('./partials/nav.ejs') %>
   - <%- include('./partials/hero.ejs') %>
   - ... (all sections)
   ↓
5. HTML sent to browser
   ↓
6. Browser renders static HTML
   ↓
7. Client-side scripts in scripts.ejs execute
   ↓
8. User sees fully rendered portfolio
```

**Timing:** ~200-500ms (depends on network)

### Scenario 2: React SPA Mode (Future)

```
1. Build React for production
   ↓
2. Serve static build from NestJS
   ↓
3. Browser receives HTML + JS bundle
   ↓
4. React hydrates/initializes
   ↓
5. All interactions handled by React
   ↓
6. API calls to /api/* endpoints
```

---

## Component Communication Flow

### React Components

**Props Drilling Pattern:**
```
App
  ├─ Navigation (navLinks passed as props)
  ├─ Hero (title, description as props)
  ├─ About (stats array as props)
  ├─ Skills (skillCategories array as props)
  ├─ Projects (projects array as props)
  ├─ Experience (experiences array as props)
  ├─ Contact (email, socialLinks as props)
  └─ Footer (year, brandName as props)
```

**All data comes from:**
1. Component defaults (hardcoded)
2. Parent component props
3. Future: Context API or state management

---

## Styling Architecture

### Tailwind CSS Setup

```html
<!-- Injected in head.ejs -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          'agency-black': '#0a0a0a',
          'agency-gray': '#1a1a1a',
          'agency-accent': '#ff4d00'
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Montserrat', 'sans-serif']
        }
      }
    }
  };
</script>

<style>
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .gradient-bg {
    background: radial-gradient(circle at 50% -20%, #222, #0a0a0a);
  }
</style>
```

### Utility Classes Used

- **Layout:** `container`, `mx-auto`, `px-6`, `max-w-7xl`
- **Grid:** `grid`, `grid-cols-2`, `md:grid-cols-3`, `gap-8`
- **Flexbox:** `flex`, `flex-col`, `md:flex-row`, `justify-between`
- **Spacing:** `py-24`, `mb-8`, `space-y-6`
- **Colors:** `bg-agency-black`, `text-white`, `text-agency-accent`
- **Effects:** `hover:scale-105`, `transition-all`, `backdrop-blur-md`
- **Responsive:** `md:`, `lg:` prefixes

---

## TypeScript Interfaces

### Component Props

```typescript
// Navigation
interface NavLink {
  label: string;
  href: string;
}
interface NavigationProps {
  navLinks?: NavLink[];
}

// Hero
interface HeroProps {
  badge?: string;
  title?: string;
  description?: string;
}

// Projects
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

// Experience
interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  isHighlighted?: boolean;
}
```

---

## Deployment Architecture

### Production Build Process

```
npm run build
     ↓
Compile TypeScript → dist/ folder
     ↓
Node.js dist/main.js
     ↓
Server listening on PORT (3000)
     ↓
GET / → Serve EJS rendered HTML
```

### Environment Variables (Future)

```env
# .env
NODE_ENV=production
PORT=3000
API_URL=https://api.example.com
DB_URL=postgresql://...
```

---

## Performance Metrics

| Metric | EJS SSR | React CSR |
|--------|---------|----------|
| Time to First Byte (TTFB) | ~50-100ms | ~100-200ms |
| First Contentful Paint | ~200-400ms | ~400-800ms |
| Time to Interactive | ~400-600ms | ~800-1200ms |
| Bundle Size | ~50KB (HTML) | ~150KB (JS) |

---

## Future Enhancements

1. **Add State Management** (Redux, Zustand)
2. **API Integration** (REST, GraphQL)
3. **Authentication** (JWT, OAuth)
4. **Database** (PostgreSQL, MongoDB)
5. **Email Service** (AWS SES, SendGrid)
6. **Content Management** (Strapi, Sanity)
7. **Testing** (Jest, React Testing Library)
8. **CI/CD Pipeline** (GitHub Actions, GitLab CI)

---

## References

- [NestJS Docs](https://docs.nestjs.com)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Core Concepts](https://tailwindcss.com/docs)
