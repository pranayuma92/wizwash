import { Module } from '@nestjs/common';
import { UserTenantService } from './user-tenant.service';
import { UserTenantController } from './user-tenant.controller';

@Module({
  controllers: [UserTenantController],
  providers: [UserTenantService],
})
export class UserTenantModule {}
