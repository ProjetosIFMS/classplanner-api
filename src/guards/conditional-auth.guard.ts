import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class ConditionalAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    const isGoogleAuth = context.getClass().name === 'AuthController';
    if (isPublic || isGoogleAuth) {
      return true;
    }
    const result = super.canActivate(context);
    if (result instanceof Promise) {
      return result;
    } else if (result instanceof Observable) {
      return result.toPromise();
    }
    return result;
  }
}
