import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { AuditLogPagination } from 'src/shared/interfaces/audit-log-pagination';

@Injectable()
export class ListAuditLogsByUserIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async ListAuditLogsByUserId(
    user_id: string,
    pageSize: number,
    page: number,
  ): Promise<AuditLogPagination> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        skip: Number(skip),
        take: Number(pageSize),
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.auditLog.count(),
    ]);

    return {
      data,
      total,
      page,
      pageSize,
    };
  }
}
