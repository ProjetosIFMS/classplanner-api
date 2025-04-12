import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { INTEREST_STATUS, Status } from '../types/interest_status';

export class CreateInterestSelectionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsArray()
  @IsUUID(4, { each: true })
  @IsNotEmpty()
  disciplines_ids: string[];

  @ApiProperty({ enum: Status })
  @IsIn(Status)
  @IsNotEmpty()
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
}
