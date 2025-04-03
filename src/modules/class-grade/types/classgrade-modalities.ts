import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ClassgradeModality {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  modality_id: string;
}
