import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class PostContentDTO {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  @Transform(({ obj }) => obj.category ? obj.category.id : null)
  category_id: number;

  @Expose()
  @Transform(({ obj }) => obj.category ? obj.category.name : null)
  category_name: string;

  @Expose()
  @Transform(({ obj }) => obj.images && obj.images.length > 0 ? `http://localhost:3000/uploads/${obj.images[0].url}`  : null)
  url: string;

  @Expose()
  @Transform(({ obj }) => obj.images && obj.images.length > 0 ? obj.images[0].id : null)
  image_id: number;
}
