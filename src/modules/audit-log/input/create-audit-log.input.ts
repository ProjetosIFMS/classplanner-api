import { AUDITLOG_ACTION } from '@prisma/client';

export type CreateAuditLogInput = {
  action: AUDITLOG_ACTION;
  resource: string;
  user_id: string;
};
