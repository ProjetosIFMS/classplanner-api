import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
  // UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
// import { Roles } from 'src/decorators/roles.decorator';
// import { RolesGuard } from 'src/guards/roles.guard';
import { AuditLogService } from 'src/modules/audit-log/audit-log.service';
// import { Role } from 'src/modules/user/dto/Role';

@ApiTags('Audit-logs')
@Controller('audit-log')
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles(Role.PROFESSOR, Role.COORDINATOR)
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get('me')
  async findMyAuditLogs(
    @Req() req: any,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe) pageSize: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.auditLogService.getAuditLogsByUserId(
      req.user.id,
      pageSize,
      page,
    );
  }

  @Get(':user_id')
  // @Roles(Role.COORDINATOR)
  async findAuditLogsByUserId(
    @Param('user_id') user_id: string,
    @Query('pageSize', new DefaultValuePipe(10), ParseIntPipe)
    pageSize: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return await this.auditLogService.getAuditLogsByUserId(
      user_id,
      pageSize,
      page,
    );
  }
}
