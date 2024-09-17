import { Exclude, Expose, Transform } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService()
@Exclude()
export class PostContentDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  subtitle: string;

  @Expose()
  status: boolean

  @Expose()
  @Transform(({ obj }) => (obj.category ? obj.category.id : null))
  category_id: number;

  @Expose()
  @Transform(({ obj }) => (obj.category ? obj.category.name : null))
  category_name: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.images ? obj.images.map((image) => image.url) : null,
  )
  images: string[];

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.url) return null;
    const baseUrl = configService.get('FILE_URL');
    return `${baseUrl}/${obj.url}`;
  })
  url: string;
}
