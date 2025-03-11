import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTenantDto } from './create-user-tenant.dto';

export class UpdateUserTenantDto extends PartialType(CreateUserTenantDto) {
	role: string;
}
