import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateClassgradeDisciplineDto {
  @ApiProperty()
  @IsUUID()
  classGrade_id: string;

  @ApiProperty()
  @IsUUID()
  discipline_id: string;

  @ApiProperty()
  @IsUUID()
  modality_id: string;

  @ApiProperty()
  @IsUUID()
  period_id: string;
}
