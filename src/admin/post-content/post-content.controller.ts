import { Controller, Post, Get, Render, UseInterceptors, UploadedFile, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostContentService } from 'src/share/services/post-content.service';
import { insertPostCategoryDTO, insertPostContentDTO } from './dto';

@Controller('admin/post-content')
export class PostContentController {
  constructor(private postContentService: PostContentService) {}
  @Get()
  @Render('admin/admin-index.hbs')
  async getPostContent() {
    const postContents = await this.postContentService.getPostContents()
    const headers = ['STT', 'Tiêu đề', 'Thể loại', 'Hình ảnh'];
    const keys = ['title', 'category_name', 'url'];
    return {
      headers: headers,
      keys:keys,
      postContents: postContents,
      body: () => {
      return 'post-content-index';
      },
  };
  }

  @Get('new')
  @Render('admin/admin-index.hbs')
  async getNewPostContent() {
    const categories = await this.postContentService.getCategories()
    return {
      categories: categories,
      body: () => {
      return 'post-content-new';
      },
  };
  }

  @Get(':id')
  @Render('admin/admin-index.hbs')
  async getPostContentById(@Param('id', ParseIntPipe) postId: number) {
    const postContent = await this.postContentService.getPostContentById(postId)
    const categories = await this.postContentService.getCategories()
    
    return {
      categories: categories,
      postContent: postContent,
      body: () => {
        return 'post-content-update'
      }
    }
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
