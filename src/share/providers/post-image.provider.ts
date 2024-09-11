import { Constains } from 'src/share/constains/constains';
import { PostImage } from 'src/share/entities/post-image.entity';
import { DataSource } from 'typeorm';

export const postImageProviders = [
  {
    provide: Constains.POST_IMAGE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PostImage),
    inject: [Constains.DATA_SOURCE],
  },
];
