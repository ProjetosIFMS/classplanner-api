import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateDisciplineDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  semester: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  pedagogical_project_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  area_id: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  modalities_ids: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  practicalHours: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  theoreticalHours: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  extensionHours: number;
}
