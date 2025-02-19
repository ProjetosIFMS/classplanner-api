import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreatePeriodDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsDateString()
  end_date: Date;
}
