import { Controller, Post, Get, Render, UseInterceptors, UploadedFile, Body, Param, ParseIntPipe, Delete, HttpCode, Patch, Query, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostContentService } from 'src/share/services/post-content.service';
import { insertPostCategoryDTO, updatePostCategoryDTO, updatePostContentDTO } from './dto';
import { PostImageUploadService } from 'src/share/services/upload-file.service';
import { ResponseResult } from 'src/share/models/response-result';
import { AdminGuard } from '../login/guard';
import { GetAdmin } from '../login/decorator';

@UseGuards(AdminGuard)
@Controller('admin/post-content')
export class PostContentController {
  constructor(private postContentService: PostContentService, private postImageUploadService: PostImageUploadService) {}

  @Get()
  @Render('admin/admin-index.hbs')
  async getPostContent(@GetAdmin() admin: any, @Query('page') page: number = 1) {
    try {
      const data = await this.postContentService.getPostContents(page);
      const headers = ['STT','Tiêu đề', 'Thể loại', 'Ảnh đại diện'];
      const keys = ['title', 'category_name', 'url'];
      return {
        admin: admin,
        currentPage: page,
        totalPages: data.totalPages,
        limit: data.limit,
        headers: headers,
        keys: keys,
        postContents: data.postContents,
        body: () => 'post-content-index',
      };
    } catch (error) {
      console.error('Error in getPostContent:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('new')
  @Render('admin/admin-index.hbs')
  async getNewPostContent(@GetAdmin() admin: any) {
    try {
      const categories = await this.postContentService.getCategories();
      const postContent = await this.postContentService.createPostContent();   
      return {
        admin: admin,
        postContent: postContent,
        categories: categories,
        body: () => 'post-content-new',
      };
    } catch (error) {
      console.error('Error in getNewPostContent:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('update/:id')
  @Render('admin/admin-index.hbs')
  async getPostContentById(@GetAdmin() admin: any, @Param('id', ParseIntPipe) postId: number) {
    try {
      const postContent = await this.postContentService.getPostContentById(postId);
      const categories = await this.postContentService.getCategories();
      return {
        admin: admin,
        categories: categories,
        postContent: postContent,
        body: () => 'post-content-update'
      };
    } catch (error) {
      console.error('Error in getPostContentById:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('category')
  @Render('admin/admin-index.hbs')
  async getPostCategory(@GetAdmin() admin: any, @Query('page') page: number = 1) {
    try {
      const data =await this.postContentService.getPostCategories(page)
      const headers = ['STT','Tên thể loại', 'Mô tả'];
      const keys = ['name', 'description'];
      return {
        admin: admin,
        currentPage: page,
        totalPages: data.totalPages,
        limit: data.limit,
        headers: headers,
        keys: keys,
        postCategories: data.postCategories,
        body: () => 'post-content-category'
      };
    } catch (error) {
      console.error('Error in getPostContentById:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('upload/post-image')
  @UseInterceptors(FileInterceptor('upload'))
  async uploadPostImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = new ResponseResult()
      result.data = await this.postImageUploadService.uploadFile(file);
      result.statusCode = 200
      result.message = 'Tải ảnh lên thành công'
      return result
    } catch (error) {
      console.error('Error in uploadPostImage:', error);
      throw new HttpException('Failed to upload image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('upload'))
  async updatePostContent(@GetAdmin() admin: any, @Param('id', ParseIntPipe) postId: number, @Body() body: updatePostContentDTO, @UploadedFile() file: Express.Multer.File) {  
    try {      
      if (body.delete_image) {
        const image_delete = JSON.parse(body.delete_image);
        if (image_delete.length > 0) {
          await this.postImageUploadService.deleteManyFileByUrl(image_delete);
        }
      }
      return await this.postContentService.updatePostContent(admin.username, postId, body, file);
    } catch (error) {
      console.error('Error in updatePostContent:', error);
      throw new HttpException('Failed to update post content', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('/status/:id')
  async updateStatus(@Param('id', ParseIntPipe) postId: number, @Body() body: updatePostContentDTO) {    
    try {
      return await this.postContentService.updateStatus(postId, body);
    } catch (error) {
      console.error('Error in updateStatus:', error);
      throw new HttpException('Failed to update status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deletePostContent(@Param('id', ParseIntPipe) postId: number) {
    try {
      return await this.postContentService.deletePostContentById(postId);
    } catch (error) {
      console.error('Error in deletePostContent:', error);
      throw new HttpException('Failed to delete post content', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('category')
  async createPostCategory(@GetAdmin() admin: any, @Body() body: insertPostCategoryDTO) {
    try {
      return await this.postContentService.createPostCategory(admin.username, body);
    } catch (error) {
      console.error('Error in createPostCategory:', error);
      throw new HttpException('Failed to create post category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch('category/:id')
  async updatePostCategory(@GetAdmin() admin: any, @Param('id', ParseIntPipe) categoryId: number, @Body() body: updatePostCategoryDTO) {
    try {
      return await this.postContentService.updatePostCategory(admin.username, categoryId,body);
    } catch (error) {
      console.error('Error in createPostCategory:', error);
      throw new HttpException('Failed to update post category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('category/:id')
  async deletePostCategory(@Param('id', ParseIntPipe) categoryId: number) {
    try {
      return await this.postContentService.deletePostCategoryById(categoryId);
    } catch (error) {
      console.error('Error in deletePostContent:', error);
      throw new HttpException('Failed to delete post category', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
