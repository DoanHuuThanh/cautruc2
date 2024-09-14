import { Inject, Injectable } from "@nestjs/common";
import { BaseUploadService } from "../base/base-upload.service";
import { Repository } from "typeorm";
import { PostImage } from "../entities/post-image.entity";

@Injectable()
export class PostImageUploadService extends BaseUploadService<PostImage> {
  constructor(
    @Inject('POST_IMAGE_REPOSITORY')
    fileRepository: Repository<PostImage>,
  ) {
    super(fileRepository);
  }
}
