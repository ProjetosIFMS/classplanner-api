import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateClassGradeDto {
  @ApiProperty()
  @IsUUID()
  id: string;

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
}
