import { ApiProperty } from '@nestjs/swagger';
import { AUDITLOG_ACTION } from '@prisma/client';
import { IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty({ enum: AUDITLOG_ACTION })
  @IsEnum(AUDITLOG_ACTION)
  action: AUDITLOG_ACTION;

  @ApiProperty()
  @IsString()
  resource: string;

  @ApiProperty()
  @IsUUID()
  user_id: string;
}
