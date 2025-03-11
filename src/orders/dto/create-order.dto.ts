export class CreateOrderDto {
	invoice_code: string;
	date: string;
	status: string;
	isPaid: boolean;
	extraCharge: number;
	discount: number;
	discountType: string;
	tax: number;
	paidDate: string;
	total: number;
	memberId: number;
	tenantId: number;
	qty: number;
	desc: string;
	productId: number;
}
