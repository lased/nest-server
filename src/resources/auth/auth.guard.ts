import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import Permission from '../../permission';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('permissions', permissions);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  // TODO: change permissions and change token
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user as {
      username: string;
      permissions: Permission[];
    };
    const requiredRoles = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const authorized = requiredRoles.every((role) =>
      user.permissions?.includes(role),
    );

    if (!authorized) {
      throw new ForbiddenException('Access denied');
    }

    return authorized;
  }
}
