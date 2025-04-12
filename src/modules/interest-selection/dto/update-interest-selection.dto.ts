import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { Status, INTEREST_STATUS } from '../types/interest_status';

export class UpdateInterestSelectionDto {
  @ApiProperty({ enum: Status })
  @IsIn(Status)
  @IsNotEmpty()
  status: (typeof INTEREST_STATUS)[keyof typeof INTEREST_STATUS];
}
