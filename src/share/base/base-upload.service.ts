import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BaseUploadService<T extends { id: number; url: string; alt?: string }> {
  private readonly uploadPath = './public/uploads';

  constructor(
    @Inject('REPOSITORY')
    private readonly fileRepository: Repository<T>,
  ) {
    this.ensureUploadsDirExists();
  }

  private async ensureUploadsDirExists() {
    try {
      await fs.access(this.uploadPath);
    } catch {
      await fs.mkdir(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ id: number; url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const filename = `${uuidv4()}-${file.originalname}`;
    const filepath = path.join(this.uploadPath, filename);

    try {
      await fs.writeFile(filepath, file.buffer);

      const fileEntity = this.fileRepository.create({
        url: filename,
        alt: file.originalname.replace(/\.[^/.]+$/, ""),
      } as T);

      const savedFile = await this.fileRepository.save(fileEntity);

      return {
        id: savedFile.id,
        url: `http://localhost:3000/uploads/${savedFile.url}`,
      };
    } catch (error) {
      throw new BadRequestException('Failed to upload file');
    }
  }

  async deleteFileByUrl(url: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { url: url } as any });
    if (!file) {
      throw new BadRequestException('File not found');
    }

    const filepath = path.join(this.uploadPath, file.url);

    try {
      await fs.unlink(filepath);
      await this.fileRepository.remove(file);
    } catch (error) {
      throw new BadRequestException('Failed to delete file');
    }
  }

  async deleteManyFileByUrl(urls: any[]): Promise<void> {
    if (urls.length === 0) {
      throw new BadRequestException('No URLs provided');
    }
  
    const files = await this.fileRepository.find({
      where: { url: In(urls) } as any
    });
  
    if (files.length === 0) {
      throw new BadRequestException('No files found');
    }
  
    const deletePromises = files.map(async (file) => {
      const filepath = path.join(this.uploadPath, file.url);
      try {
        await fs.unlink(filepath);
        await this.fileRepository.remove(file);
      } catch (error) {
        console.error(`Failed to delete file ${file.url}:`, error);
        throw error;
      }
    });
  
    try {
      await Promise.all(deletePromises);
    } catch (error) {
      throw new BadRequestException('Failed to delete one or more files');
    }
  }
}
