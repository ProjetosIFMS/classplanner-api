import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsUUID } from 'class-validator';
import { INTEREST_STATUS, Status } from '../types/interest_status';

export class CreateInterestSelectionDto {
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
