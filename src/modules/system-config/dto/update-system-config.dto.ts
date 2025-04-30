import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { DISCIPLINE_SELECTION_MODE } from '@prisma/client';

export class UpdateSystemConfigDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(DISCIPLINE_SELECTION_MODE)
  discipline_selection_mode?: DISCIPLINE_SELECTION_MODE;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  discipline_selection_mode_expires_at?: string;
}
