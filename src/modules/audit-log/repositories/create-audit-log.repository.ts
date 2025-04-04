import { Injectable } from '@nestjs/common';
import { CreateAuditLogInput } from 'src/modules/audit-log/input/create-audit-log.input';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateAuditLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAuditLog(data: CreateAuditLogInput) {
    return await this.prisma.auditLog.create({
      data,
    });
  }
}
