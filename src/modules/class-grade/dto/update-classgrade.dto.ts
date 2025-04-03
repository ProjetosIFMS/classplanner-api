import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { ClassgradeDiscipline } from 'src/modules/class-grade/types/classgrade-disciplines';

export class UpdateClassGradeDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  year: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  semester: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  course_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pedagogical_project_id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  period_id: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ClassgradeDiscipline)
  disciplines: ClassgradeDiscipline[];
}
