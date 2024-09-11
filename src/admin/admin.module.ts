import { Module } from '@nestjs/common';
import { AdminProjectModule } from './project/admin-project.module';
import { AdminProductModule } from './product/admin-product.module';
import { PostContentModule } from './post-content/post-content.module';

@Module({
  imports: [AdminProjectModule, AdminProductModule, PostContentModule],
})
export class AdminModule {}
