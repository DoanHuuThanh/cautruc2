import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updatePostCategoryDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
