import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { WEEKDAY } from 'src/modules/dayoff/dto/weekday';

export class CreateDayoffDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsString()
  schedule: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  frequency: string;

  @ApiProperty({ enum: WEEKDAY })
  @IsEnum(WEEKDAY)
  weekday: WEEKDAY;
}
