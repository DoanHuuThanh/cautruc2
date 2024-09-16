import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { AdminBaseService } from './admin-base.service';

@Injectable()
export class BaseUploadService<T extends { id: number; url: string; alt?: string }> extends AdminBaseService {
  constructor(
    @Inject('REPOSITORY')
    private readonly fileRepository: Repository<T>,
    @Inject()
    public readonly configSV: ConfigService,
  ) {
    super(configSV);
    this.ensureUploadsDirExists();
  }

  private async ensureUploadsDirExists() {
    await fs.access(this.uploadPath).catch(() =>
      fs.mkdir(this.uploadPath, { recursive: true })
    );
  }

  //upload file
  async uploadFile(file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('No file provided');
    }

    const filename = `${uuidv4()}-${file.originalname}`;
    const filepath = path.join(this.uploadPath, filename);

    await fs.writeFile(filepath, file.buffer);

    const fileEntity = this.fileRepository.create({
      url: filename,
      alt: file.originalname.replace(/\.[^/.]+$/, ""),
    } as T);

    const savedFile = await this.fileRepository.save(fileEntity);

      return  `${this.fileLink}/${savedFile.url}`
    } catch (error) {
      throw new BadRequestException('Failed to upload file', error);
    }
    


  async deleteManyFileByUrl(urls: any[]): Promise<void> {
    if (urls.length === 0) {
      throw new Error('No URLs provided');
    }
    // loại bỏ link folder
    urls = urls.map(url => {
      return url.replace(new RegExp(`^${this.fileLink}/`), '');
    });

    const files = await this.fileRepository.find({
      where: { url: In(urls) } as any
    });
  
    if (files.length === 0) {
      throw new Error('No files found');
    }
  
    const deletePromises = files.map(async (file) => {
      const filepath = path.join(this.uploadPath, file.url);
      await fs.unlink(filepath);
      await this.fileRepository.remove(file);
    });
  
    await Promise.all(deletePromises);
  }
}
