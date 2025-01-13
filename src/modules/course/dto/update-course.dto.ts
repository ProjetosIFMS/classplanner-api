import { IsNumber, IsString } from 'class-validator';

export class UpdateCourseDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity_semester: number;

  @IsNumber()
  workload: number;
}
