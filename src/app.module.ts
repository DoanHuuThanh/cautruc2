import { Module } from '@nestjs/common';
import { AdminProjectModule } from './admin/project/admin-project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerHomeModule } from './customer/home/customer-home.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ // Mysql
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'test',
    //   entities: [],
    //   synchronize: true,
    // }),
    AdminProjectModule,
    CustomerHomeModule,
    AdminModule
  ],
})
export class AppModule {}
