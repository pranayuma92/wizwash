import { BaseModel } from './base.model';

export class MemberModel extends BaseModel {
	static tableName = 'member';
	fullname: string;
	address: string;
	email: string;
	phone: string;
	tenantId: number;
}