import { Module } from '@nestjs/common';
import { CustomerHomeModule } from './customer/home/customer-home.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './share/providers/database.module';

@Module({
  imports: [
    // Configration
    ConfigModule.forRoot({
      envFilePath: ['src/config/.env', 'src/config/.share.env'],
      isGlobal: true,
    }),
    CustomerHomeModule,
    AdminModule,
    DatabaseModule
  ],
})
export class AppModule {}
