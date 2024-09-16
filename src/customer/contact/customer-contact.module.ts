import { Module } from '@nestjs/common';
import { CustomerContactController } from './customer-contact.controller';

@Module({
  imports: [],
  controllers: [CustomerContactController],
})
export class CustomerContactModule {}