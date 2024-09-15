import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class updatePostContentDTO {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsString()
  @IsOptional()
  subtitle: string

  @IsString()
  @IsOptional()
  new_image?: string

  @IsString()
  @IsOptional()
  delete_image?: string
}
