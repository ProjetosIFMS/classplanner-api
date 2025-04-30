import { AuditLog } from '@prisma/client';

export interface AuditLogPagination {
  data: AuditLog[];
  total: number;
  page: number;
  pageSize: number;
}
