import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from "./product.service";
import { Product } from "./product.schema";
import { CreateProductDto } from "./product.dto";

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.service.create(createProductDto);
  }

  @Get()
  async getAll(): Promise<Product[]> {
    return this.service.getAll();
  }
}
