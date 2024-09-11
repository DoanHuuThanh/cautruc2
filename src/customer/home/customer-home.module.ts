import { Module } from '@nestjs/common';
import { CustomerHomeController } from './customer-home.controller';
import { productProviders } from 'src/share/providers/product.provider';
import { DatabaseModule } from 'src/share/providers/database.module';
import { ProductService } from 'src/share/services/product.service';

@Module({
  imports: [],
  controllers: [CustomerHomeController],
  providers: [...productProviders, ProductService],
})
export class CustomerHomeModule {}
