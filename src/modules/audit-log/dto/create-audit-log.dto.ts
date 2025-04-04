import { ApiProperty } from '@nestjs/swagger';
import { AUDITLOG_ACTION } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty({ enum: AUDITLOG_ACTION })
  @IsNotEmpty()
  @IsEnum(AUDITLOG_ACTION)
  action: AUDITLOG_ACTION;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  resource_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
