import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class insertPostContentDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
