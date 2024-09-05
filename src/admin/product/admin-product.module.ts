import { Module } from '@nestjs/common';
import { AdminProductController } from 'src/admin/product/admin-product.controller';
import { ProductService } from 'src/share/services/product.service';

@Module({
  imports: [],
  controllers: [AdminProductController],
  providers: [ProductService],
})
export class AdminProductModule {}