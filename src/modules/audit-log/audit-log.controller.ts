import { Controller, Get, Req } from '@nestjs/common';
import { AuditLogService } from 'src/modules/audit-log/audit-log.service';

@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get('me')
  async findMyAuditLogs(@Req() req: any) {
    return await this.auditLogService.getAuditLogsByUserId(req.user.id);
  }
}
