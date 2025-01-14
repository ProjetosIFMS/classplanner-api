import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsString()
  menu: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  workload: number;

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
}
