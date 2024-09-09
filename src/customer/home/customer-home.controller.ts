import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class CustomerHomeController {
  constructor(private configService: ConfigService) {}

  @Get()
  @Render('customer/customer-index')
  getHello() {
    return {
      message: 'hihi',
      body: () => {
        return 'customer-home-index';
      },
      bodyMessage: 'Hello',
      htmlImport: '<div>test</div>',
    };
  }
}
