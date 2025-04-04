import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDisciplineDto {
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
  @IsArray()
  @IsUUID(4, { each: true })
  modalities_ids: string[];

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
