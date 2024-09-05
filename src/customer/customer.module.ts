import { Module } from '@nestjs/common';
import { CustomerHomeModule } from './home/customer-home.module';
import { CustomerProductModule } from './product/customer-product.module';

@Module({
  imports: [CustomerHomeModule, CustomerProductModule],
})
export class AppModule {}
