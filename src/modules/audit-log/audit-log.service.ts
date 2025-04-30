import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from 'src/modules/audit-log/dto/create-audit-log.dto';
import { CreateAuditLogUseCase } from 'src/modules/audit-log/use-cases/create-audit-log.use-case';
import { ListAuditLogsByUserIdUseCase } from 'src/modules/audit-log/use-cases/list-audit-logs-by-user-id.use-case';

@Injectable()
export class AuditLogService {
  constructor(
    private readonly listAuditLogsByUserIdUseCase: ListAuditLogsByUserIdUseCase,
    private readonly createAuditLogUseCase: CreateAuditLogUseCase,
  ) {}

  async getAuditLogsByUserId(user_id: string, pageSize: number, page: number) {
    return await this.listAuditLogsByUserIdUseCase.execute(
      user_id,
      pageSize,
      page,
    );
  }

  async createAuditLog(data: CreateAuditLogDto) {
    return await this.createAuditLogUseCase.execute(data);
  }
}
