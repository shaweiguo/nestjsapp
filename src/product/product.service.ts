import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import { CreateProductDto } from "./product.dto";
import { ProductModule } from './product.module';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private model: Model<ProductDocument>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.model(createProductDto);
    return createdProduct.save();
  }

  async getAll(): Promise<Product[]> {
    return this.model.find().exec();
  }
}
