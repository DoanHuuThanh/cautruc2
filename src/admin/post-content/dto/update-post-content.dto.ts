import { IsBoolean, IsOptional, IsString } from 'class-validator';

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

  @IsBoolean()
  @IsOptional()
  status: boolean

  @IsString()
  @IsOptional()
  new_image?: string

  @IsString()
  @IsOptional()
  delete_image?: string
}
