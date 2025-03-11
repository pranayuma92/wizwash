import { BaseModel } from './base.model';

export class TenantModel extends BaseModel {
	static tableName = 'tenant';
	name: string;
	domain: string;
	active: string;
}