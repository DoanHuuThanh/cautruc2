import { Constains } from 'src/share/constains/constains';
import { PostContent } from 'src/share/entities/post-content.entity';
import { DataSource } from 'typeorm';

export const postContentProviders = [
  {
    provide: Constains.POST_CONTENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PostContent),
    inject: [Constains.DATA_SOURCE],
  },
];
