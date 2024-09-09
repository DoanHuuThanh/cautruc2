import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerHomeModule } from './customer/home/customer-home.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // Configration
    ConfigModule.forRoot({
      envFilePath: ['src/config/.env', 'src/config/.share.env'],
      isGlobal: true,
    }),
    // Mysql
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>("MYSQL_HOSTNAME"),
        port: configService.get<number>("MYSQL_PORT"),
        username: configService.get<string>("MYSQL_USERNAME"),
        password: configService.get<string>("MYSQL_PASSWORD"),
        database: configService.get<string>("MYSQL_DATABASE"),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,   
      }), 
      inject: [ConfigService],
    }),
    CustomerHomeModule,
    AdminModule,
  ],
})
export class AppModule {}
