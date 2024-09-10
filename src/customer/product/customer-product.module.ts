import { Module } from '@nestjs/common';
import { CustomerProductController } from './customer-product.controller';

@Module({
  controllers: [CustomerProductController],
})
export class CustomerProductModule {}