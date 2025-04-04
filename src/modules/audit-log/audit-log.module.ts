import { Logger, Module } from '@nestjs/common';
import { AuditLogService } from 'src/modules/audit-log/audit-log.service';
import * as UseCases from './use-cases';
import { CreateAuditLogRepository } from 'src/modules/audit-log/repositories/create-audit-log.repository';
import { AuditLogController } from 'src/modules/audit-log/audit-log.controller';
import { ListAuditLogsByUserIdRepository } from 'src/modules/audit-log/repositories/list-audit-logs-by-user-id.repository';
import { UserModule } from 'src/modules/user/user.module';

const usecases = Object.values(UseCases);

@Module({
  controllers: [AuditLogController],
  providers: [
    AuditLogService,
    CreateAuditLogRepository,
    ListAuditLogsByUserIdRepository,
    ...usecases,
    Logger,
  ],
  exports: [AuditLogService],
  imports: [UserModule],
})
export class AuditLogModule {}
