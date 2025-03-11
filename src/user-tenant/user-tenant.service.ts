import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserTenantDto } from './dto/create-user-tenant.dto';
import { UpdateUserTenantDto } from './dto/update-user-tenant.dto';
import { UserTenantModel } from '../db/models/user-tenant.model';

@Injectable()
export class UserTenantService {
  async create(createUserTenantDto: CreateUserTenantDto): Promise<UserTenantModel> {
    return await UserTenantModel.query().insert(createUserTenantDto);
  }

  async findAll(tenantId: number): Promise<UserTenantModel[]> {
    return await UserTenantModel
      .query()
      .select(
        'user.username',
        'user.email',
        'tenant.name',
        'tenant.domain',
        'user_tenant.role',
        'user_tenant.id'
      )
      .join('user', 'user.id', '=', 'user_tenant.user_id')
      .join('tenant', 'tenant.id', '=', 'user_tenant.tenant_id')
      .where('tenant.id', tenantId);
  }

  async findOne(
    tenantId: number, 
    id: number
  ): Promise<UserTenantModel[]> {
    return await UserTenantModel
      .query()
      .select(
        'user.username',
        'user.email', 
        'tenant.name', 
        'tenant.domain', 
        'user_tenant.role', 
        'user_tenant.id'
      )
      .join('user', 'user.id', '=', 'user_tenant.user_id')
      .join('tenant', 'tenant.id', '=', 'user_tenant.tenant_id')
      .where('tenant.id', tenantId)
      .where('user_tenant.id', id);
  }

  async update(
    id: number,
    updateUserTenantDto: UpdateUserTenantDto
  ): Promise<UserTenantModel> {
    const userTenant = await UserTenantModel.query().findOne({ id });
    if(!userTenant) throw new BadRequestException('User Tenant not found');
    return await UserTenantModel.query().patchAndFetchById(id, updateUserTenantDto);
  }

  async remove(id: number): Promise<string> {
    const deletedRows = await UserTenantModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`User Tenant with ID ${id} not found`);
    return 'User Tenant deleted';
  }
}
