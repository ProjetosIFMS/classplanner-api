import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../modules/user/dto/Role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user || !user.role) {
      console.error(
        'User not found in request. Ensure JwtStrategy is working.',
      );
      return false;
    }

    const userRole = Role[user.role as keyof typeof Role];

    if (!userRole) {
      return false;
    }

    return requiredRoles.includes(userRole);
  }
}
