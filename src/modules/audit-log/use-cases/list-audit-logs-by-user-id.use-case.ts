import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ListAuditLogsByUserIdRepository } from 'src/modules/audit-log/repositories/list-audit-logs-by-user-id.repository';

@Injectable()
export class ListAuditLogsByUserIdUseCase {
  constructor(
    private readonly listAuditLogsByUserIdRepository: ListAuditLogsByUserIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string) {
    try {
      const audit_logs =
        await this.listAuditLogsByUserIdRepository.ListAuditLogsByUserId(
          user_id,
        );
      this.logger.log(
        'Found audit logs by user id',
        ListAuditLogsByUserIdUseCase.name,
      );
      return audit_logs;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error listing audit logs by user id',
      });
      this.logger.error(error.message, ListAuditLogsByUserIdUseCase.name);
      throw error;
    }
  }
}
