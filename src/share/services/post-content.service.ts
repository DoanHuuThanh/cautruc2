import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import { PostImage } from '../entities/post-image.entity';
import { PostContent } from '../entities/post-content.entity';
import { insertPostCategoryDTO, insertPostContentDTO } from 'src/admin/post-content/dto';
import { PostCategory } from '../entities/post-category.entity';
import { plainToClass } from 'class-transformer';
import { PostContentDTO } from 'src/admin/post-content/dto';
@Injectable()
export class PostContentService {
  private readonly uploadPath = './public/uploads';
  constructor(
    @Inject('POST_IMAGE_REPOSITORY')
    private postImageRepository: Repository<PostImage>,
    @Inject('POST_CONTENT_REPOSITORY')
    private postContentRepository: Repository<PostContent>,
    @Inject('POST_CATEGORY_REPOSITORY')
    private postCategoryRepository: Repository<PostCategory>
  ) {
    this.ensureUploadsDirExists();
  }

  private ensureUploadsDirExists() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const filepath = path.join(this.uploadPath, filename);

    fs.writeFileSync(filepath, file.buffer);

    try {
      await fs.promises.writeFile(filepath, file.buffer);

      const postImageEntity = new PostImage();
      postImageEntity.alt = file.originalname.replace(/\.[^/.]+$/, "");
      postImageEntity.url = `${filename}`;
      const newPostImage = await this.postImageRepository.save(postImageEntity)

      if (newPostImage && newPostImage.url) {
        return {
          id: newPostImage.id,
        };
      } else {
        throw new Error('Failed to save image to database');
      }
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }

  async createPostContent(insertPostContentDTO: insertPostContentDTO) {
    try {
      const postContentEntity = new PostContent()
      postContentEntity.title = insertPostContentDTO.title
      postContentEntity.content = insertPostContentDTO.content
      const category = await this.postCategoryRepository.findOne({
        where: { id: Number(insertPostContentDTO.category_id) },
      });
      postContentEntity.category = category
      const newPostContent = await this.postContentRepository.save(postContentEntity);
      if (newPostContent) {
          if(insertPostContentDTO.image_id) {
            const postImage = await this.postImageRepository.findOne({
              where: { id: insertPostContentDTO.image_id },
            });
    
            if (postImage) {
              postImage.postContent = newPostContent;
              await this.postImageRepository.save(postImage);
            }
          }
        return {
          status: 200,
        }
      }
      else return { status: 404 }

    }
    catch (error) {
      console.error('Error creating PostContent:', error);
      throw error;
    }

  }

  async createPostCategory(insertPostCategoryDTO: insertPostCategoryDTO) {
    try {
      const postCategoryEntity = new PostCategory()
      postCategoryEntity.name = insertPostCategoryDTO.name
      postCategoryEntity.description = insertPostCategoryDTO.description
      const newPostCategory = await this.postCategoryRepository.save(postCategoryEntity);
      if (newPostCategory) {
        return {
          status: 200,
          msg: "Bạn đã tạo thể loại bài viết thành công",
          category: newPostCategory
        }
      }
      else return { 
        status: 404,
        msg: "Bạn đã tạo thể loại bài viết thất bại",
       }

    }
    catch (error) {
      console.error('Error creating PostCategory:', error);
      throw error;
    }

  }

  async getCategories():  Promise<PostCategory[]> {
    try {
      const categories = await this.postCategoryRepository.find();
      return categories 
    }
    catch(error) {
      throw new Error('Error fetching categories');
    }
  }

  async getPostContents(): Promise<PostContentDTO[]> {
    try {
      const rawPostContents = await this.postContentRepository.find({
        relations: ['category', 'images']
      });      
      const postContents = rawPostContents.map(rawPost => 
        plainToClass(PostContentDTO, rawPost, { excludeExtraneousValues: true })
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
        relations: ['category', 'images']
      });    
      const postContent = plainToClass(PostContentDTO, rawPostContent, { 
        excludeExtraneousValues: true 
      });

      return postContent;
    } catch (error) {
      console.error('Error fetching postContents:', error);
      throw new Error('Error fetching postContents');
    }
  }

}
