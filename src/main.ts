import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AdminProjectModule } from './admin/project/admin-project.module';

async function bootstrap() {
  const app =  await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir([join(__dirname, '..', 'src/admin'), join(__dirname, '..', 'src/customer')]);
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
