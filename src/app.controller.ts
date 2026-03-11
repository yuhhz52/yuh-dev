import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHome() {
    return {
      title: 'Fullstack Developer',
      year: new Date().getFullYear(),
    };
  }

  @Get('api/portfolio')
  getPortfolioData() {
    return {
      name: 'Fullstack Developer',
      email: 'hello@developer.com',
      yearsExperience: 5,
      projectsCompleted: 50,
      technologies: [
        'React',
        'TypeScript',
        'Node.js',
        'NestJS',
        'Tailwind CSS',
        'PostgreSQL',
      ],
    };
  }
}

