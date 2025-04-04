import {
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateAuditLogDto } from 'src/modules/audit-log/dto/create-audit-log.dto';
import { CreateAuditLogRepository } from 'src/modules/audit-log/repositories/create-audit-log.repository';

@Injectable()
export class CreateAuditLogUseCase {
  constructor(
    private readonly createAuditLogRepository: CreateAuditLogRepository,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateAuditLogDto) {
    try {
      const auditLog = await this.createAuditLogRepository.createAuditLog(data);
      this.logger.log('Audit log created', CreateAuditLogUseCase.name);
      return auditLog;
    } catch (err) {
      const error = new ServiceUnavailableException('Something bad happened', {
        cause: err,
        description: 'Error creating audit log',
      });
      this.logger.error(error.message, CreateAuditLogUseCase.name);
      throw error;
    }
  }
}
