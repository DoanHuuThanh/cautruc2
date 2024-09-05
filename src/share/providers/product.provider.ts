import { Constains } from 'src/share/constains/constains';
import { Product } from 'src/share/entities/product.entity';
import { DataSource } from 'typeorm';

export const productProviders = [
  {
    provide: Constains.PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [Constains.DATA_SOURCE],
  },
];