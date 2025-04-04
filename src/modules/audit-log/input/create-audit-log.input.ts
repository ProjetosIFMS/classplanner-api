import { AUDITLOG_ACTION } from '@prisma/client';

export type CreateAuditLogInput = {
  action: AUDITLOG_ACTION;
  url: string;
  resource_id: string;
  user_id: string;
};
