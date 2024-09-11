import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Constains } from '../constains/constains';
import { join } from 'path';

export const databaseProviders = [
  {
    provide: Constains.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: configService.get<string>('MYSQL_HOSTNAME'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
        entities: [join(__dirname, '../entities/*.entity{.ts,.js}')],
        synchronize: true,
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
