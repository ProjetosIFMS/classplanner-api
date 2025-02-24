import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

@Injectable()
export class UpdateProfessorClassgradeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @ApiProperty()
  @IsUUID()
  classGrade_id: string;

  @ApiProperty()
  @IsBoolean()
  priority: boolean;
}
