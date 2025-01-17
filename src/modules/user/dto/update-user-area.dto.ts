import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAreaDto {
  @ApiProperty()
  @IsUUID()
  area_id: string;
}
