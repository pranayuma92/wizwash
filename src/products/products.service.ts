import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductModel } from '../db/models/product.model';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto): Promise<ProductModel> {
    return await ProductModel.query().insert(createProductDto);
  }

  async findAll(tenantId: number): Promise<ProductModel[]> {
    return await ProductModel.query().where('product.id', tenantId);
  }

  async findOne(id: number): Promise<ProductModel> {
    const product = await ProductModel.query().findOne({ id });
    if(!product) throw new BadRequestException('Product not found')
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductModel> {
    const product = await ProductModel.query().findOne({ id });
    if(!product) throw new BadRequestException('Product not found');
    return await ProductModel.query().patchAndFetchById(id, updateProductDto);
  }

  async remove(id: number) {
    const deletedRows = await ProductModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`Product with ID ${id} not found`);
    return 'Product deleted';
  }
}
