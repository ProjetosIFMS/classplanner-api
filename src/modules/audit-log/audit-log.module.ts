import { Logger, Module } from '@nestjs/common';
import { AuditLogService } from 'src/modules/audit-log/audit-log.service';
import * as UseCases from './use-cases';
import { CreateAuditLogRepository } from 'src/modules/audit-log/repositories/create-audit-log.repository';
import { AuditLogController } from 'src/modules/audit-log/audit-log.controller';

const usecases = Object.values(UseCases);

@Module({
  controllers: [AuditLogController],
  providers: [AuditLogService, CreateAuditLogRepository, ...usecases, Logger],
  exports: [AuditLogService],
})
export class AuditLogModule {}
