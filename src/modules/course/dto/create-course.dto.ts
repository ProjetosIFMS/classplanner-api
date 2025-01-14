import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  quantity_semester: number;

  @ApiProperty()
  @IsNumber()
  workload: number;
}
