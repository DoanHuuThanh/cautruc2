import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class CustomerHomeController {
    constructor(private configService: ConfigService) {}
  
    @Get()
    @Render('customer/home/customer-home-index')
    getHello() { 
      return { message: "hihi", htmlImport: "<div>test</div>" }; 
    } 
}