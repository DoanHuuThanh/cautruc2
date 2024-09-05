import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class CustomerHomeController {
    constructor() {}
  
    @Get()
    @Render('home/views/customer-home-index')
    getHello() {
      return { message: 'Hello HIHI!' };
    }
}