import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdatePeriodDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsDate()
  @ApiProperty()
  start_date: Date;

  @IsDate()
  @ApiProperty()
  end_date: Date;
}
