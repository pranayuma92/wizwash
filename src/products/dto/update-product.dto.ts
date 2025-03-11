import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	code: string;
	name: string;
	price: number;
	unit: string;
	desc: string;
}
