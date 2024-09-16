import { Constains } from 'src/share/constains/constains';
import { PostCategory } from 'src/share/entities/post-category.entity';
import { DataSource } from 'typeorm';

export const postCategoryProviders = [
  {
    provide: Constains.POST_CATEGORY_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PostCategory),
    inject: [Constains.DATA_SOURCE],
  },
];
