import { Controller, Get, Inject, Render } from '@nestjs/common';
import { CustomerBaseController } from 'src/share/base/customerBase.controller';
import { CustomerPage } from 'src/share/enum/customer-page';

@Controller('contact')
export class CustomerContactController extends CustomerBaseController {
  constructor() {
    super(CustomerPage.Contact, "/icons/customer/logo.svg");
  }

  @Get()
  @Render('customer/customer-index')
  async getPage() {
    return {
      header: this.customerUI.header,
      footer: this.customerUI.footer,
      body: () => {
        return 'customer-contact-index';
      },
    };
  }
}