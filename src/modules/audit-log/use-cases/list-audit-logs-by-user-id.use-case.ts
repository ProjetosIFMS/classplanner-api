import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ListAuditLogsByUserIdRepository } from 'src/modules/audit-log/repositories/list-audit-logs-by-user-id.repository';
import { FindUserByIdRepository } from 'src/modules/user/repository/find-user-by-id.repository';

@Injectable()
export class ListAuditLogsByUserIdUseCase {
  constructor(
    private readonly listAuditLogsByUserIdRepository: ListAuditLogsByUserIdRepository,
    private readonly findUserByIdRepository: FindUserByIdRepository,
    private readonly logger: Logger,
  ) {}

  async execute(user_id: string, pageSize: number, page: number) {
    try {
      const user = await this.findUserByIdRepository.findUserById(user_id);
      if (!user) {
        this.logger.error('User not found', ListAuditLogsByUserIdUseCase.name);
        throw new NotFoundException(
          'User not found',
          ListAuditLogsByUserIdUseCase.name,
        );
      }

      const audit_logs =
        await this.listAuditLogsByUserIdRepository.ListAuditLogsByUserId(
          user_id,
          pageSize,
          page,
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
