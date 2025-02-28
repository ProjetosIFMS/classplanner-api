import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePedagogicalProjectDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  course_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  hasTCC: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  stageHours: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  complementaryHours: number;
}
