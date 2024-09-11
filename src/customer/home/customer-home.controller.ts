import { Controller, Get, Inject, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Constains } from 'src/share/constains/constains';
import { Product } from 'src/share/entities/product.entity';
import { Repository } from 'typeorm';

@Controller()
export class CustomerHomeController {
  constructor(
    private configService: ConfigService,
    @Inject(Constains.PRODUCT_REPOSITORY)
    private productRepository: Repository<Product>,
  ) {}

  @Get()
  @Render('customer/customer-index')
  async getHello() {
    return {
      body: () => {
        return 'customer-home-index';
      },
    };
  }
}
