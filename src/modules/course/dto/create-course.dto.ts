import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  quantity_semester: number;

  @IsNumber()
  workload: number;
}
