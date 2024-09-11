import { Constains } from 'src/share/constains/constains';
import { Admin } from 'src/share/entities/admin.entity';
import { DataSource } from 'typeorm';

export const adminProviders = [
  {
    provide: Constains.ADMIN_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Admin),
    inject: [Constains.DATA_SOURCE],
  },
];
