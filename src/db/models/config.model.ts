import { BaseModel } from './base.model';

export class ConfigModel extends BaseModel {
	static tableName = 'config';
	key: string;
	value: string;
	label: string;
	type: string;
	tenantId: number;
}