import { Controller, Post, Get, Render, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostContentService } from 'src/share/services/post-content.service';
import { insertPostCategoryDTO, insertPostContentDTO } from './dto';


@Controller('admin/post-content')
export class PostContentController {
  constructor(private postContentService: PostContentService) {}
  @Get()
  @Render('admin/admin-index.hbs')
  getHello() {
    return {
      body: () => {
      return 'post-content-index';
      },
  };
  }

  @Get('new')
  @Render('admin/admin-index.hbs')
  getNewPostContent() {
    return {
      body: () => {
      return 'post-content-new';
      },
  };
  }

  @Post('upload/post-image')
  @UseInterceptors(FileInterceptor('upload'))
  uploadPostImage(@UploadedFile() file: Express.Multer.File) {
   return this.postContentService.uploadImage(file)
  }

  @Post()
  createPostContent(@Body() body: insertPostContentDTO) {
     return this.postContentService.createPostContent(body)    
  }

  @Post('category')
  createPostCategory(@Body() body: insertPostCategoryDTO) {
      return this.postContentService.createPostCategory(body)
  }
}
