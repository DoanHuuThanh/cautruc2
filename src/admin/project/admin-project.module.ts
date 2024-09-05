import { Module } from '@nestjs/common';
import { AdminProjectController } from 'src/admin/project/admin-project.controller';
import { ProjectService } from 'src/share/services/project.service';

@Module({
  imports: [],
  controllers: [AdminProjectController],
  providers: [ProjectService],
})
export class AdminProjectModule {}
