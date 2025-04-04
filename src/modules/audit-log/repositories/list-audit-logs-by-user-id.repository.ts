import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class ListAuditLogsByUserIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async ListAuditLogsByUserId(user_id: string) {
    return await this.prisma.auditLog.findMany({ where: { user_id }, take: 5 });
  }
}
