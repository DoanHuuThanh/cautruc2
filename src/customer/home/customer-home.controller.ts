import { Controller, Get, Inject, Render } from '@nestjs/common';
import { CustomerBaseController } from 'src/share/base/customerBase.controller';
import { CustomerPage } from 'src/share/enum/customer-page';

@Controller('')
export class CustomerHomeController extends CustomerBaseController {
  constructor() {
    super(CustomerPage.Home);
  }

  @Get()
  @Render('customer/customer-index')
  async getPage() {
    return {
      header: this.customerUI.header,
      footer: this.customerUI.footer,
      body: () => {
        return 'customer-home-index';
      },
    };
  }
}
