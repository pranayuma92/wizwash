import { BaseModel } from './base.model';

export class OrderModel extends BaseModel {
	static tableName = 'order';
	invoice_code: string;
	date: string;
	status: string;
	isPaid: boolean;
	extra_charge: number;
	discount: number;
	discountYype: string;
	tax: number;
	paidDate: string;
	total: number;
	memberId: number;
	tenantId: number;
}