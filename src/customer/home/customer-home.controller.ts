import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class CustomerHomeController {
    constructor(private configService: ConfigService) {}
  
    @Get()
    @Render('home/views/customer-home-index')
    getHello() {
      return { message: "hihi" };
    } 
}