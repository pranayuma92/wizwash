import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Jalankan auth guard dulu
    await super.canActivate(context);

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Tidak ada role yang dibutuhkan, izinkan akses
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user)

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Anda tidak memiliki akses ke resource ini');
    }

    return true;
  }
}
