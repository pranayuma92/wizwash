import { createParamDecorator, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserTenantModel } from '../db/models/user-tenant.model';

export const ValidateAdmin = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const checkUserTenant = await UserTenantModel.query().findOne({ user_id: request.user.tenantId });

    if (!checkUserTenant) {
      throw new BadRequestException('User not found. Please contact your administrator.');
    }

    if (checkUserTenant.role !== 'admin') {
      throw new BadRequestException('Only user with admin level can access this. Please contact your administrator');
    }

    return true;
  },
);
