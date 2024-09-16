import { Module } from '@nestjs/common';
import { CustomerHomeModule } from './home/customer-home.module';
import { CustomerProductModule } from './product/customer-product.module';
import { CustomerContactModule } from './contact/customer-contact.module';

@Module({
  imports: [CustomerContactModule, CustomerHomeModule, CustomerProductModule],
})
export class CustomerModule {}
