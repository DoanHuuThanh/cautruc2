import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerHomeModule } from './customer/home/customer-home.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Configration
    ConfigModule.forRoot({
      envFilePath: ['src/config/.env', 'src/config/.share.env'],
      isGlobal: true,
    }),
    CustomerHomeModule,
    AdminModule,
  ],
})
export class AppModule {}
