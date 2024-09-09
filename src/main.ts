import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { registerPartial } from './register-partial';

async function bootstrap() {
  const app =  await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // Sử dụng dấu .. vì thư mục khi build ra hiện tại là dist. Nên out ra 1 cấp rồi truy xuất xuống
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Đăng ký sử dụng partial 
  registerPartial(); 

  await app.listen(3000);
}
bootstrap();
