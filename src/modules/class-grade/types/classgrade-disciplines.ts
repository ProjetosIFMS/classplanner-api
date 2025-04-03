import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsUUID, ValidateNested } from 'class-validator';
import { ClassgradeModality } from 'src/modules/class-grade/types/classgrade-modalities';

export class ClassgradeDiscipline {
  @ApiProperty()
  @IsUUID()
  discipline_id: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMaxSize(3)
  @Type(() => ClassgradeModality)
  modalities_ids: string[];
}
