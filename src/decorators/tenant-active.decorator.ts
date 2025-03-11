import { createParamDecorator, ExecutionContext, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { TenantModel } from '../db/models/tenant.model';

export const TenantActive = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const checkTenant = await TenantModel.query().findOne({ id: request.user.tenantId });

    if (!checkTenant) {
      throw new BadRequestException('Tenant not found. Please contact your administrator.');
    }

    if (checkTenant.active !== 'yes') {
      throw new BadRequestException('Access denied for this user or tenant. Please contact your administrator');
    }

    return true;
  },
);
