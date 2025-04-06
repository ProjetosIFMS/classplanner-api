import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class UpdatePeriodDto {
  @IsDate()
  @ApiProperty()
  start_date: Date;

  @IsDate()
  @ApiProperty()
  end_date: Date;
}
