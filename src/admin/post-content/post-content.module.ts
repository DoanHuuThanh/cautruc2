import { Module } from '@nestjs/common';
import { PostContentController } from './post-content.controller';
import { PostContentService } from 'src/share/services/post-content.service';
import { postImageProviders } from 'src/share/providers/post-image.provider';
import { postContentProviders } from 'src/share/providers/post-content.provider';
import { postCategoryProviders } from 'src/share/providers/post-category.provider';
import { PostImageUploadService } from 'src/share/services/upload-file.service';

@Module({
  imports: [],
  controllers: [PostContentController],
  providers: [PostContentService,PostImageUploadService, ...postImageProviders, ...postContentProviders, ...postCategoryProviders],
})
export class PostContentModule {}
