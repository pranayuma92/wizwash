import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantModel } from '../db/models/tenant.model';

@Injectable()
export class TenantsService {
  async create(createTenantDto: CreateTenantDto): Promise<TenantModel> {
    const tenantExist = await TenantModel.query().findOne({ name: createTenantDto.name });
    if(tenantExist) throw new BadRequestException('Tenant already exist');
    return await TenantModel.query().insert(createTenantDto);
  }

  async findAll(): Promise<TenantModel[]> {
    return await TenantModel.query();
  }

  async findOne(id: number): Promise<TenantModel> {
    const tenant = await TenantModel.query().findOne({ id });
    if(!tenant) throw new BadRequestException('Tenant not found');
    return tenant;
  }

  async update(id: number, updateTenantDto: UpdateTenantDto): Promise<TenantModel> {
    const tenant = await TenantModel.query().findOne({ id });
    if(!tenant) throw new BadRequestException('Tenant not found');
    return await TenantModel.query().patchAndFetchById(id, updateTenantDto);
  }

  async remove(id: number): Promise<string> {
    const deletedRows = await TenantModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`Tenant with ID ${id} not found`);
    return 'Tenant deleted';
  }
}
