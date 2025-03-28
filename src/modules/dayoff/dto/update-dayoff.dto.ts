import { IsString, IsEnum } from 'class-validator';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';
import { DAYOFF_STATUS } from 'src/modules/dayoff/dto/dayoff-status';

export class UpdateDayoffDto {
  @IsString()
  reason: string;

  @IsString()
  schedule: string;

  @IsString()
  frequency: string;

  @IsEnum(WEEKDAY)
  weekday: WEEKDAY;

  @IsEnum(DAYOFF_STATUS)
  status: DAYOFF_STATUS;
}
