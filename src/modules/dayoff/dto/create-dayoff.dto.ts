import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsNotEmpty, Length } from 'class-validator';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

export class CreateDayoffDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  reason?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  schedule: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  frequency: string;

  @ApiProperty({ enum: WEEKDAY })
  @IsEnum(WEEKDAY)
  @IsNotEmpty()
  weekday?: WEEKDAY;
}
