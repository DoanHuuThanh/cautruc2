import { Controller, Get, Inject, Render } from '@nestjs/common';
import { CustomerBaseController } from 'src/share/base/customerBase.controller';

@Controller()
export class CustomerHomeController extends CustomerBaseController{
  constructor(
  ) {
    super();
  }

  @Get()
  @Render('customer/customer-index')
  async getHello() {
    return {
      header: this.customerUI.header,
      footer: this.customerUI.footer,
      body: () => {
        return 'customer-home-index';
      },
    };
  }
}
