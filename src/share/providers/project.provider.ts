import { Constains } from 'src/share/constains/constains';
import { Product } from 'src/share/entities/product.entity';
import { DataSource } from 'typeorm';
import { Project } from '../entities/project.entity';

export const productProviders = [
  {
    provide: Constains.PROJECT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Project),
    inject: [Constains.DATA_SOURCE],
  },
];