import { Module } from '@nestjs/common';
import { CustomerHomeController } from './customer-home.controller';

@Module({
  imports: [],
  controllers: [CustomerHomeController],
})
export class CustomerHomeModule {}
