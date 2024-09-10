import { Module } from '@nestjs/common';
import { CustomerHomeController } from './customer-home.controller';
import { productProviders } from 'src/share/providers/product.provider';

@Module({
  controllers: [CustomerHomeController],
  providers: [...productProviders]
})
export class CustomerHomeModule {}
