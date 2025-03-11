import { BaseModel } from './base.model';

export class OrderDetailModel extends BaseModel {
	static tableName = 'order_detail';
	qty: number;
	desc: string;
	orderId: number;
	productId: number;
}