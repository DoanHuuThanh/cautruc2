import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PostCategoryDTO {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
