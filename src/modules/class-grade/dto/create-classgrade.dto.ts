import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer'; // Ensure this is imported
import { ClassgradeDiscipline } from 'src/modules/class-grade/types/classgrade-disciplines';
export class CreateClassGradeDto {
  @ApiProperty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsInt()
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
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ClassgradeDiscipline)
  disciplines: ClassgradeDiscipline[];
}
