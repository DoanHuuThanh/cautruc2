import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class insertPostCategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
