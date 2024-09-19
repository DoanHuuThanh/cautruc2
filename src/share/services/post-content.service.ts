import {
  Injectable,
  Inject,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { In, IsNull, Not, Repository } from 'typeorm';
import { PostImage } from '../entities/post-image.entity';
import { PostContent } from '../entities/post-content.entity';
import {
  insertPostCategoryDTO,
  updatePostCategoryDTO,
  updatePostContentDTO,
} from 'src/admin/post-content/dto';
import { PostCategory } from '../entities/post-category.entity';
import { plainToClass } from 'class-transformer';
import { PostContentDTO } from 'src/admin/post-content/dto';
import { v4 as uuidv4 } from 'uuid';
import { AdminBaseService } from '../base/admin-base.service';
import { ConfigService } from '@nestjs/config';
import { ResponseResult } from '../models/response-result';
import { PostCategoryDTO } from 'src/admin/post-content/dto';

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
    await fs.access(this.uploadPath).catch(() =>
      fs.mkdir(this.uploadPath, { recursive: true })
    );
  }
  
  //update post content
  async updatePostContent(
    name: string,
    postId: number,
    updatePostContentDTO: updatePostContentDTO,
    file: Express.Multer.File,
  ) {
    const result = new ResponseResult()
    const postEntity = await this.postContentRepository.findOne({
      where: { id: postId },
    });   
    if (!postEntity) {
      result.data =null
      result.statusCode= 400
      return result;
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
        result.data =null
        result.statusCode= 400
        return result;
      }

      postEntity.content = updatePostContentDTO.content;
      postEntity.title = updatePostContentDTO.title;
      postEntity.subtitle = updatePostContentDTO.subtitle
      postEntity.createdBy = name
      postEntity.category = category;
      let new_image = JSON.parse(updatePostContentDTO.new_image);
      new_image = new_image.map(image => {
        return image.replace(new RegExp(`^${this.fileLink}/`), '');
      });
      if (updatePostContentDTO.new_image && new_image?.length > 0) {
        const postImages = await this.postImageRepository.findBy({
          url: In(new_image),
        });
        if (!postImages || postImages.length !== new_image.length) {
          result.data =null
          result.statusCode= 400
          return result;
        }

        postEntity.images = postImages;
      }
    }

    const updatedPostContent = await this.postContentRepository.save(postEntity);

    if (updatedPostContent) {
      result.data =updatedPostContent
      result.statusCode= 200
      return result;
    } else {
      result.data =null
      result.statusCode= 400
      return result;
    }
  }

  //create post content
  async createPostContent() {
    const postContentEntity = new PostContent();
    const newPostContent = await this.postContentRepository.save(postContentEntity);
    return newPostContent? newPostContent : null
    
  }
  
  //cerate category post content
  async createPostCategory(name: string, insertPostCategoryDTO: insertPostCategoryDTO) {
    const result = new ResponseResult()
    const postCategoryEntity = new PostCategory();
    postCategoryEntity.name = insertPostCategoryDTO.name;
    postCategoryEntity.description = insertPostCategoryDTO.description;
    postCategoryEntity.createdBy = name
    const newPostCategory = await this.postCategoryRepository.save(postCategoryEntity);
    
    if (newPostCategory) {
      result.data =newPostCategory
      result.statusCode= 200
      result.message = "Tạo thể loại bài viết thành công"
      return result;
    } else {
      result.data =null
      result.statusCode= 400
      return result;
    }
  }
 
  //get category
  async getCategories(): Promise<PostCategory[]> {
    return await this.postCategoryRepository.find();
  }

  //get post contents
  async getPostContents(page: number): Promise<{ 
    postContents: PostContentDTO[]; 
    totalPages: number;
    limit: number;
  }> {
    const limit = 10;
    const skip = (page - 1) * limit;
  
    const [rawPostContents, totalCount] = await Promise.all([
      this.postContentRepository.find({
        where: {
          title: Not(IsNull()),
        },
        relations: ['category', 'images'],
        take: limit,
        skip: skip,
        order: { createdAt: 'DESC' },
      }),
      this.postContentRepository.count({
        where: {
          title: Not(IsNull()),
        },
      }),
    ]);

    const postContents = rawPostContents.map((rawPost) =>
      plainToClass(PostContentDTO, rawPost, {
        excludeExtraneousValues: true,
      }),
    );

    const totalPages = Math.ceil(totalCount / limit);

    return {
      postContents,
      totalPages,
      limit,
    };
  }

  //get post content by id
  async getPostContentById(postId: number): Promise<PostContentDTO | null> {
    const rawPostContent = await this.postContentRepository.findOne({
      where: { id: postId },
      relations: ['category', 'images'],
    });
    return plainToClass(PostContentDTO, rawPostContent, {
      excludeExtraneousValues: true,
    });
  }

  //delete post content
  async deletePostContentById(postId: number): Promise<any> {
    const postContent = await this.postContentRepository.findOne({
      where: { id: postId },
    });
    const result = new ResponseResult()
    if (!postContent) {
      result.statusCode= 400
      return result;
    }

    await this.postContentRepository.remove(postContent);
    result.statusCode= 200
    return result;
  }

  //update status post content
  async updateStatus(postId: number, body: updatePostContentDTO): Promise<any> {
    const postContent = await this.postContentRepository.findOne({
      where: { id: postId },
    });
    const result = new ResponseResult()
    if (!postContent) {
      result.statusCode= 400
      return result
    }
    
    postContent.status = body.status;
    await this.postContentRepository.save(postContent);

    result.statusCode= 200
    result.message = "Cập nhập trạng thái thành công"
    return result
  }

  //get categories
  async getPostCategories(page: number): Promise<{ 
    postCategories: PostCategoryDTO[]; 
    totalPages: number;
    limit: number;
  }> {
    const limit = 10;
    const skip = (page - 1) * limit;
  
    const [rawPostCategories, totalCount] = await Promise.all([
      this.postCategoryRepository.find({
        take: limit,
        skip: skip,
        order: { createdAt: 'DESC' },
      }),
      this.postCategoryRepository.count(),
    ]);

    const postCategories = rawPostCategories.map((rawPost) =>
      plainToClass(PostCategoryDTO, rawPost, {
        excludeExtraneousValues: true,
      }),
    );

    const totalPages = Math.ceil(totalCount / limit);

    return {
      postCategories,
      totalPages,
      limit,
    };
  }

  async updatePostCategory(name:string, categoryId: number, body: updatePostCategoryDTO): Promise<any> {
    const postCategory = await this.postCategoryRepository.findOne({
      where: { id: categoryId },
    });
    const result = new ResponseResult()
    if (!postCategory) {
      result.statusCode= 400
      result.message = "Không tìm kiếm được thể loại"
      return result
    } 

    postCategory.name = body.name;
    postCategory.description = body.description
    postCategory.updatedBy = name
    await this.postCategoryRepository.save(postCategory);

    result.statusCode= 200
    result.message = "Cập nhập thể loại bài viết thành công"
    return result
  }

  async deletePostCategoryById(categoryId: number): Promise<any> {
    const postCategory = await this.postCategoryRepository.findOne({
      where: { id: categoryId },
    });
    const result = new ResponseResult()
    if (!postCategory) {
      result.statusCode= 400
      return result;
    }

    await this.postCategoryRepository.remove(postCategory);
    result.statusCode= 200
    return result;
  }

}
