import { Module } from '@nestjs/common';
import { CustomerHomeController } from './customer-home.controller';

@Module({
  imports: [],
  controllers: [CustomerHomeController],
  providers: [],
})
export class CustomerHomeModule {}
