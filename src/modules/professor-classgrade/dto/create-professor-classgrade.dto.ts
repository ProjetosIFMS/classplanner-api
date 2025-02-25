import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

@Injectable()
export class CreateProfessorClassGradeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  classGrade_id: string;

  @ApiProperty()
  @IsBoolean()
  priority: boolean;
}
