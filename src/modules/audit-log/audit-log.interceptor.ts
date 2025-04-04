import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditLogService } from 'src/modules/audit-log/audit-log.service';
import { HTTP_METHOD_TO_ACTION } from 'src/modules/audit-log/types/http-method-to-action';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  constructor(private auditLogService: AuditLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const auditData = {
      action: HTTP_METHOD_TO_ACTION[request.method],
      resource: '',
      user_id: request.user.id,
    };
    console.log(request);

    if (
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method) &&
      request.user
    ) {
      return next.handle().pipe(
        tap(() => {
          this.auditLogService.createAuditLog(auditData);
        }),
      );
    }

    return next.handle();
  }
}
