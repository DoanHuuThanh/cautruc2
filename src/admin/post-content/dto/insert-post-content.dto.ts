import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class insertPostContentDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsArray()
  @IsOptional()
  imageIds: any[]
}
