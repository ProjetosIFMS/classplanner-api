import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  semester: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  pedagogical_project_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  area_id: string;

  @ApiProperty()
  @IsString()
  modality_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  practicalHours: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  theoreticalHours: number;

  @ApiProperty()
  @IsNumber()
  extensionHours: number;
}
