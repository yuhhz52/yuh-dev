# 🔧 Backend Documentation

## NestJS Backend Overview

The backend is a minimal NestJS application that serves a portfolio website with dual rendering capabilities:
1. **Server-Side Rendering (SSR)** via EJS templates
2. **API endpoints** for future React SPA integration

---

## File Structure

```
src/
├── main.ts                 # Application bootstrap
├── app.module.ts           # NestJS module (dependency injection)
└── app.controller.ts       # Request handlers & routing
```

---

## 1. main.ts - Application Bootstrap

**Location:** `/src/main.ts`

### Purpose
Initializes NestJS application, configures the view engine, and starts the server.

### Code

```typescript
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create NestJS application (typed as Express app)
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure EJS as view engine
  app.setViewEngine('ejs');
  
  // Set directory where templates are stored
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Enable CORS for cross-origin requests
  app.enableCors();

  // Start server on port 3000
  await app.listen(3000);
  
  // Log startup message
  console.log(`Portfolio running on http://localhost:3000`);
}

// Run bootstrap function
bootstrap();
```

### Configuration Details

| Config | Value | Purpose |
|--------|-------|---------|
| `NestExpressApplication` | Type | Use Express under the hood (not Fastify) |
| `setViewEngine('ejs')` | String | Use EJS for server-side template rendering |
| `setBaseViewsDir()` | Path | Point to `/views` directory for templates |
| `enableCors()` | Method | Allow requests from different origins |
| `listen(3000)` | Port | Server listens on port 3000 |

### How It Works

1. **Create App Instance**
   ```typescript
   const app = await NestFactory.create(AppModule);
   ```
   Initializes NestJS with AppModule and Express HTTP adapter

2. **Set View Engine**
   ```typescript
   app.setViewEngine('ejs');
   ```
   When `res.render()` is called, NestJS uses EJS to compile templates

3. **Set Views Directory**
   ```typescript
   app.setBaseViewsDir(join(__dirname, '..', 'views'));
   ```
   Tells Express where the `.ejs` files are located
   - `__dirname` = current file directory = `src/`
   - `..` = go up one level = project root
   - `views` = templates folder

4. **Enable CORS**
   ```typescript
   app.enableCors();
   ```
   Allows requests from any origin (useful for future APIs)

5. **Start Server**
   ```typescript
   await app.listen(3000);
   ```
   Binds to port 3000 and accepts connections

---

## 2. app.module.ts - Dependency Injection & Module Configuration

**Location:** `/src/app.module.ts`

### Purpose
Defines the root module of the application where controllers, services, and dependencies are registered.

### Code

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

### Module Properties

| Property | Value | Purpose |
|----------|-------|---------|
| `imports` | `[]` | External modules to import (e.g., TypeOrmModule, JwtModule) |
| `controllers` | `[AppController]` | Request handlers for this module |
| `providers` | `[]` | Services, repositories, factories, utilities |

### How the Module Works

```
AppModule
  ├─ imports []                    (no external dependencies)
  ├─ controllers [AppController]   (handles routing)
  └─ providers []                  (no services yet)
```

### Future Enhancements

As the app grows, the module will be enhanced:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ProjectService } from './services/project.service';
import { Project } from './entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project])  // Database
  ],
  controllers: [AppController],
  providers: [ProjectService]             // Services
})
export class AppModule {}
```

---

## 3. app.controller.ts - Request Handlers & Routing

**Location:** `/src/app.controller.ts`

### Purpose
Defines route handlers that process HTTP requests and return responses.

### Code

```typescript
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHome() {
    return {};
  }
}
```

### Decorators Explained

#### `@Controller()`
Marks class as a NestJS controller
- Routes are prefixed with the path in parentheses
- `@Controller()` = no prefix (routes at `/`)
- `@Controller('api')` = routes at `/api`

#### `@Get()`
Handles HTTP GET requests
- `@Get()` = GET /
- `@Get('users')` = GET /users
- `@Get('users/:id')` = GET /users/:id

#### `@Render()`
Renders a view template instead of returning JSON
- `@Render('index')` = render `/views/index.ejs`
- Passes the return value as `locals` (template variables)

### How the Route Works

```
User Request: GET http://localhost:3000/
       ↓
NestJS Router: Match @Get() decorator
       ↓
Execute: AppController.getHome()
       ↓
Return: {} (empty object)
       ↓
@Render('index'): Render /views/index.ejs with locals = {}
       ↓
EJS Engine: Process <%- include('./partials/...') %>
       ↓
Send HTML to browser
```

### Adding More Routes

#### 1. **API Route (JSON Response)**
```typescript
@Get('api/projects')
getProjects() {
  return [
    { id: 1, title: 'Project 1', ... },
    { id: 2, title: 'Project 2', ... }
  ];
}

// Request: GET /api/projects
// Response: [{"id":1,...}, {"id":2,...}]
```

#### 2. **Route with URL Parameter**
```typescript
@Get('api/projects/:id')
getProject(@Param('id') id: string) {
  return { id, title: 'Single Project' };
}

// Request: GET /api/projects/1
// Response: {"id":"1", "title":"Single Project"}
```

#### 3. **Route with Query Parameter**
```typescript
@Get('api/projects')
searchProjects(@Query('category') category: string) {
  // Filter projects by category
  return { category, results: [...] };
}

// Request: GET /api/projects?category=saas
// Response: {"category":"saas", "results":[...]}
```

#### 4. **POST Route (Request Body)**
```typescript
@Post('api/contact')
submitContact(@Body() contactData: { name: string; email: string; message: string }) {
  // Process contact form
  return { success: true, message: 'Email sent!' };
}

// Request: POST /api/contact
// Body: {"name":"John","email":"john@example.com","message":"Hello"}
// Response: {"success":true,"message":"Email sent!"}
```

#### 5. **Render Different Templates**
```typescript
@Get('about')
@Render('about')
getAbout() {
  return {
    title: 'About Me',
    yearsExperience: 5
  };
}

// Renders /views/about.ejs with { title, yearsExperience }
```

---

## HTTP Methods & NestJS Decorators

### Common HTTP Verbs

| HTTP Method | NestJS Decorator | Use Case |
|-------------|------------------|----------|
| GET | `@Get()` | Retrieve data (read-only) |
| POST | `@Post()` | Submit new data |
| PUT | `@Put()` | Replace entire resource |
| PATCH | `@Patch()` | Partial update |
| DELETE | `@Delete()` | Remove resource |

### Decorator Parameters

```typescript
@Post('/api/projects')              // Path
@Body() projectData                 // Request body
@Param('id') id: string             // URL parameter
@Query('page') page: number         // Query parameter
@Headers('authorization') token     // Request header
@UseGuards(AuthGuard)               // Middleware/guards
```

---

## Current Routes

| Method | Route | Handler | Renders | Purpose |
|--------|-------|---------|---------|---------|
| GET | `/` | `getHome()` | `index.ejs` | Serve portfolio homepage |

---

## Future Routes to Add

```typescript
// Portfolio API endpoints
@Get('api/projects')          // List all projects
@Get('api/projects/:id')      // Get single project
@Get('api/skills')            // Get skills data
@Get('api/experience')        // Get career history

// Contact endpoint
@Post('api/contact')          // Submit contact form
@Send('send-email')           // Send email service

// Admin endpoints (with auth)
@Post('api/projects')         // Create project
@Put('api/projects/:id')      // Update project
@Delete('api/projects/:id')   // Delete project
```

---

## Dependency Injection Pattern

NestJS uses **Dependency Injection** to manage services and dependencies:

### Example: Adding a ProjectService

```typescript
// 1. Create service file
// project.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  getAll() {
    return [{ id: 1, title: 'Project 1' }];
  }
}

// 2. Register in module
// app.module.ts
@Module({
  controllers: [AppController],
  providers: [ProjectService],  // Register service
})
export class AppModule {}

// 3. Inject into controller
// app.controller.ts
export class AppController {
  constructor(private projectService: ProjectService) {}

  @Get('api/projects')
  getProjects() {
    return this.projectService.getAll();
  }
}

// Result: NestJS automatically creates and injects ProjectService
```

---

## Rendering EJS Templates

### How @Render() Works

```typescript
@Get()
@Render('index')  // Looks for /views/index.ejs
getHome() {
  return {        // Passed as locals to EJS
    name: 'John',
    year: 2024
  };
}

// In /views/index.ejs:
// <h1><%= name %></h1>     <!-- Output: <h1>John</h1> -->
// <p>© <%= year %></p>      <!-- Output: <p>© 2024</p> -->
```

### Template Variables

```typescript
// Passing data to template
getHome() {
  return {
    title: 'My Portfolio',
    projects: [
      { id: 1, name: 'Project 1' },
      { id: 2, name: 'Project 2' }
    ],
    isMobile: false,
    calculateAge: () => new Date().getFullYear() - 2019
  };
}

// Access in /views/index.ejs:
<h1><%= title %></h1>

<% projects.forEach(project => { %>
  <div><%= project.name %></div>
<% }); %>

<% if (!isMobile) { %>
  <h2>Desktop View</h2>
<% } %>

<p>Experience: <%= calculateAge() %> years</p>
```

---

## Error Handling

### Basic Error Handling

```typescript
import { HttpException, HttpStatus } from '@nestjs/common';

@Get('api/projects/:id')
getProject(@Param('id') id: string) {
  if (!id) {
    throw new HttpException(
      'Project ID is required',
      HttpStatus.BAD_REQUEST  // 400
    );
  }
  
  const project = { id, title: 'Project' };
  
  if (!project) {
    throw new HttpException(
      'Project not found',
      HttpStatus.NOT_FOUND    // 404
    );
  }
  
  return project;
}
```

### Global Exception Filter

```typescript
// Create custom filter
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      statusCode: 500,
      message: 'Internal server error'
    });
  }
}

// Register in main.ts
app.useGlobalFilters(new AllExceptionsFilter());
```

---

## Environment Variables

### Setup

Create `.env` file:
```env
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
```

### Access in Code

```bash
npm install @nestjs/config dotenv
```

```typescript
// app.module.ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ]
})
export class AppModule {}

// Usage in controller
import { ConfigService } from '@nestjs/config';

export class AppController {
  constructor(private config: ConfigService) {}

  getHome() {
    const apiUrl = this.config.get<string>('API_URL');
    return { apiUrl };
  }
}
```

---

## TypeScript Interfaces for Route Handlers

```typescript
// Define request/response types
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Use in route handler
@Post('api/contact')
async submitContact(
  @Body() formData: ContactFormData
): Promise<ApiResponse<{ id: string }>> {
  try {
    // Process form
    return {
      success: true,
      data: { id: '123' }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
```

---

## Testing Controllers

### Unit Test Example

```typescript
// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty object on getHome()', () => {
    expect(controller.getHome()).toEqual({});
  });
});
```

### Run Tests

```bash
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # Coverage report
```

---

## Deployment

### Build for Production

```bash
npm run build
```

Compiles TypeScript to JavaScript in `/dist` folder:
```
dist/
├── main.js
├── app.controller.js
├── app.module.js
└── main.js.map
```

### Start Production Server

```bash
npm run start:prod

# Or manually:
node dist/main.js
```

### Environment for Production

```env
NODE_ENV=production
PORT=3000
API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://...
LOG_LEVEL=error
```

---

## Performance Considerations

1. **Enable HTTP Compression**
   ```typescript
   import * as compression from 'compression';
   app.use(compression());
   ```

2. **Add Security Headers**
   ```typescript
   import * as helmet from 'helmet';
   app.use(helmet());
   ```

3. **Rate Limiting**
   ```typescript
   import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
   
   @Module({
     imports: [
       ThrottlerModule.forRoot({
         ttl: 60,
         limit: 10
       })
     ]
   })
   ```

4. **Caching**
   ```typescript
   import { CacheModule } from '@nestjs/cache-manager';
   
   @Module({
     imports: [CacheModule.register()]
   })
   ```

---

## Common NestJS Patterns

### Middleware

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}

// Register in module
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
```

### Pipes (Validation)

```typescript
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any) {
    // Validate data
    if (!value) {
      throw new BadRequestException('Invalid input');
    }
    return value;
  }
}

// Use in route
@Post('api/contact')
submitContact(
  @Body(new ValidationPipe()) data: ContactFormData
) {
  return data;
}
```

---

## Resources

- [NestJS Official Documentation](https://docs.nestjs.com)
- [NestJS Fundamentals](https://docs.nestjs.com/first-steps)
- [Controllers](https://docs.nestjs.com/controllers)
- [Providers & Services](https://docs.nestjs.com/providers)
- [Modules](https://docs.nestjs.com/modules)
- [Express Documentation](https://expressjs.com)

---

**Last Updated:** March 2024  
**Version:** 1.0.0  
**Author:** AI Assistant
