import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  menu: string;

  @IsOptional()
  @IsNumber()
  workload?: number;

  @IsNotEmpty()
  @IsNumber()
  semester: number;

  @IsNotEmpty()
  @IsString()
  pedagogical_project_id: string;
}
