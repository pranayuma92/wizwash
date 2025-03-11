import { BaseModel } from './base.model';

export class UserTenantModel extends BaseModel {
	static tableName = 'user_tenant';
	userId: number;
	tenantId: number;
	role: string;
}