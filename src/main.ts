import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure Handlebars view engine and views directory
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // Serve static assets (CSS, JS, images) from the public folder
  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.enableCors();

  await app.listen(3000);
  console.log(`Portfolio running on http://localhost:3000`);
}

bootstrap();

