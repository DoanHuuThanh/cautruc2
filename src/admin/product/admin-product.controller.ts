import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/product')
export class AdminProductController {
  constructor() {}

  @Get()
  @Render('admin/admin-index')
  getHello() {
    return { message: 'Hello HIHI!' }; 
  }
}