import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './share/providers/database.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    // Configration
    ConfigModule.forRoot({
      envFilePath: ['src/config/.env', 'src/config/.share.env'],
      isGlobal: true,
    }),
    CustomerModule,
    AdminModule,
    DatabaseModule,
  ],
})
export class AppModule {}
