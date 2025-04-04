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
    const response = context.switchToHttp().getResponse();

    if (['POST', 'PATCH', 'DELETE'].includes(request.method) && request.user) {
      return next.handle().pipe(
        tap((response_body) => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            const auditData = {
              action: HTTP_METHOD_TO_ACTION[request.method],
              url: request.url,
              resource_id: response_body.id || null,
              user_id: request.user.id,
            };

            this.auditLogService.createAuditLog(auditData);
          }
        }),
      );
    }

    return next.handle();
  }
}
