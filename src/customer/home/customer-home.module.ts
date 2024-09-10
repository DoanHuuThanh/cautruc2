import { Module } from '@nestjs/common';
import { CustomerHomeController } from './customer-home.controller';
import { productProviders } from 'src/share/providers/product.provider';
import { DatabaseModule } from 'src/share/providers/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerHomeController],
  providers: [...productProviders]
})
export class CustomerHomeModule {}
