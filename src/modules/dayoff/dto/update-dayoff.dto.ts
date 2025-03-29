import { IsString, IsEnum, IsOptional } from 'class-validator';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';

export class UpdateDayoffDto {
  @IsOptional()
  @IsString()
  reason: string;

  @IsOptional()
  @IsString()
  schedule: string;

  @IsOptional()
  @IsString()
  frequency: string;

  @IsOptional()
  @IsEnum(WEEKDAY)
  weekday: WEEKDAY;

  @IsOptional()
  @IsEnum(DAYOFF_STATUS)
  status: DAYOFF_STATUS;
}
