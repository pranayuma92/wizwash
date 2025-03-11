import { BaseModel } from './base.model';

export class ProductModel extends BaseModel {
	static tableName = 'product';
	code: string;
	name: string;
	price: number;
	unit: string;
	desc: string;
	tenantId: number;
}