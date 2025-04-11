import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { INTEREST_STATUS, Status } from '../types/interest_status';

export class CreateInterestSelectionDto {
  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  discipline_id: string;

  @ApiProperty({ enum: Status })
  @IsIn(Status)
  @IsNotEmpty()
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
}
