import {
  Injectable,
  BadRequestException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { In, IsNull, Not, Repository } from 'typeorm';
import { PostImage } from '../entities/post-image.entity';
import { PostContent } from '../entities/post-content.entity';
import {
  insertPostCategoryDTO,
  updatePostContentDTO,
} from 'src/admin/post-content/dto';
import { PostCategory } from '../entities/post-category.entity';
import { plainToClass } from 'class-transformer';
import { PostContentDTO } from 'src/admin/post-content/dto';
import { v4 as uuidv4 } from 'uuid';
import { AdminBaseService } from '../base/admin-base.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostContentService extends AdminBaseService{
  constructor(
    @Inject('POST_IMAGE_REPOSITORY')
    private postImageRepository: Repository<PostImage>,
    @Inject('POST_CONTENT_REPOSITORY')
    private postContentRepository: Repository<PostContent>,
    @Inject('POST_CATEGORY_REPOSITORY')
    private postCategoryRepository: Repository<PostCategory>,
    @Inject()
    public configSV: ConfigService
  ) {
    super(configSV);
    this.ensureUploadsDirExists();
  }

  private async ensureUploadsDirExists() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async updatePostContent(
    postId: number,
    updatePostContentDTO: updatePostContentDTO,
    file: Express.Multer.File,
  ) {
    try {
      const postEntity = await this.postContentRepository.findOne({
        where: { id: postId },
      });

      if (!postEntity) {
        return { status: 404, message: 'Post not found' };
      }

      if (file) {
        if (postEntity.url) {
          const filepath = path.join(this.uploadPath, postEntity.url);
          fs.unlink(filepath);
        }
        const filename = `${uuidv4()}-${file.originalname}`;
        const filepath = path.join(this.uploadPath, filename);
        await fs.writeFile(filepath, file.buffer);
        postEntity.url = filename;
      } else {
        const category = await this.postCategoryRepository.findOne({
          where: { id: Number(updatePostContentDTO.category_id) },
        });

        if (!category) {
          return { status: 404, message: 'Category not found' };
        }

        postEntity.content = updatePostContentDTO.content;
        postEntity.title = updatePostContentDTO.title;
        postEntity.subtitle = updatePostContentDTO.subtitle
        postEntity.category = category;
        const new_image = JSON.parse(updatePostContentDTO.new_image)?.map(ni => ni.replace(`${this.fileLink}/`, ''));
        if (updatePostContentDTO.new_image && new_image?.length > 0) {
          const postImages = await this.postImageRepository.findBy({
            url: In(new_image),
          });
          if (!postImages || postImages.length !== new_image.length) {
            return { status: 404, message: 'One or more images not found' };
          }

          postEntity.images = postImages;
        }
      }

      const updatedPostContent =
        await this.postContentRepository.save(postEntity);

      if (updatedPostContent) {
        return {
          status: 200,
          postContent: updatedPostContent,
        };
      } else {
        return {
          status: 404,
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: 'An error occurred while updating post content',
        error: error.message,
      };
    }
  }

  async createPostContent() {
    try {
      const postContentEntity = new PostContent();
      const newPostContent =
        await this.postContentRepository.save(postContentEntity);
      if (newPostContent) {
        return newPostContent;
      } else return { status: 404 };
    } catch (error) {
      console.error('Error creating PostContent:', error);
      throw error;
    }
  }

  async createPostCategory(insertPostCategoryDTO: insertPostCategoryDTO) {
    try {
      const postCategoryEntity = new PostCategory();
      postCategoryEntity.name = insertPostCategoryDTO.name;
      postCategoryEntity.description = insertPostCategoryDTO.description;
      const newPostCategory =
        await this.postCategoryRepository.save(postCategoryEntity);
      if (newPostCategory) {
        return {
          status: 200,
          msg: 'Bạn đã tạo thể loại bài viết thành công',
          category: newPostCategory,
        };
      } else
        return {
          status: 404,
          msg: 'Bạn đã tạo thể loại bài viết thất bại',
        };
    } catch (error) {
      console.error('Error creating PostCategory:', error);
      throw error;
    }
  }

  async getCategories(): Promise<PostCategory[]> {
    try {
      const categories = await this.postCategoryRepository.find();
      return categories;
    } catch (error) {
      throw new Error('Error fetching categories');
    }
  }

  async getPostContents(): Promise<PostContentDTO[]> {
    try {
      const rawPostContents = await this.postContentRepository.find({
        where: {
          title: Not(IsNull()),
        },
        relations: ['category', 'images'],
      });

      const postContents = rawPostContents.map((rawPost) =>
        plainToClass(PostContentDTO, rawPost, {
          excludeExtraneousValues: true,
        }),
      );

      return postContents;
    } catch (error) {
      console.error('Error fetching postContents:', error);
      throw new Error('Error fetching postContents');
    }
  }

  async getPostContentById(postId: number): Promise<PostContentDTO | null> {
    try {
      const rawPostContent = await this.postContentRepository.findOne({
        where: { id: postId },
        relations: ['category', 'images'],
      });
      const postContent = plainToClass(PostContentDTO, rawPostContent, {
        excludeExtraneousValues: true,
      });

      return postContent;
    } catch (error) {
      console.error('Error fetching postContents:', error);
      throw new Error('Error fetching postContents');
    }
  }

  async deletePostContentById(postId: number):  Promise<{ status: number; message: string }> {
    try {
      const postContent = await this.postContentRepository.findOne({
        where: { id: postId },
      });

      if (!postContent) {
        throw new NotFoundException(`Post content with ID ${postId} not found`);
      }

      await this.postContentRepository.remove(postContent);
      return { status: 200, message: 'Xóa thành công bài viết' };
    } catch (error) {
      console.error('Error deleting postContent:', error);
      throw new Error('Failed to delete post content');
    }
  }
}
