import { Module } from '@nestjs/common';
import { AdminProjectModule } from './project/admin-project.module';
import { AdminProductModule } from './product/admin-product.module';

@Module({
  imports: [AdminProjectModule, AdminProductModule],
})
export class AdminModule {}
