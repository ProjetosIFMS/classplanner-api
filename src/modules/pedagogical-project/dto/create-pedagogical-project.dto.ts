import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePedagogicalProjectDto {
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  course_id: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
