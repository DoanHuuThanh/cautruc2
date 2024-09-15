import { Controller, Post, Get, Render, UseInterceptors, UploadedFile, Body, Param, ParseIntPipe, Delete, HttpCode, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostContentService } from 'src/share/services/post-content.service';
import { insertPostCategoryDTO, updatePostContentDTO } from './dto';
import { PostImageUploadService } from 'src/share/services/upload-file.service';

@Controller('admin/post-content')
export class PostContentController {
  constructor(private postContentService: PostContentService, private postImageUploadService: PostImageUploadService) {}
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
    const postContent = await this.postContentService.createPostContent()   
    return {
      postContent: postContent,
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
   return this.postImageUploadService.uploadFile(file)
  }

  @Delete('post-image/:url')
  @HttpCode(200)
  deletePostImageByUrl(@Param('url') url: string) {
    return this.postImageUploadService.deleteFileByUrl(url)
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('upload'))
  async updatePostContent(@Param('id', ParseIntPipe) postId: number,@Body() body: updatePostContentDTO,@UploadedFile() file: Express.Multer.File) {    
    if(body.delete_image) {
      const image_delete = JSON.parse(body.delete_image) 
      if (image_delete.length > 0) {
       await this.postImageUploadService.deleteManyFileByUrl(image_delete)
      }
    }
    return await this.postContentService.updatePostContent(postId,body,file)
  }

  @Delete(':id')
  deletePostContent(@Param('id', ParseIntPipe) postId: number) {
    return this.postContentService.deletePostContentById(postId)
  }

  @Post('category')
  createPostCategory(@Body() body: insertPostCategoryDTO) {
      return this.postContentService.createPostCategory(body)
  }
}
