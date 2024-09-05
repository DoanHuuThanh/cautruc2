import { Module } from '@nestjs/common';
import { CustomerProductController } from './customer-product.controller';

@Module({
  imports: [CustomerProductController],
})
export class CustomerProductModule {}