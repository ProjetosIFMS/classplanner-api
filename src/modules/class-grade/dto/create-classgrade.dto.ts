import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import type { ClassgradeDisciplines } from 'src/modules/class-grade/types/classgrade-disciplines';

export class CreateClassGradeDto {
  @ApiProperty()
  @IsString()
  year: number;

  @ApiProperty()
  @IsString()
  semester: number;

  @ApiProperty()
  @IsString()
  course_id: string;

  @ApiProperty()
  @IsString()
  pedagogical_project_id: string;

  @ApiProperty()
  @IsString()
  period_id: string;

  @ApiProperty()
  @IsArray()
  disciplines: ClassgradeDisciplines[];
}
