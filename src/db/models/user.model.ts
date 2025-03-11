import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
	static tableName = 'user';
	username: string;
	password: string;
	email: string;
}