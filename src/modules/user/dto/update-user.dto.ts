import { IsEnum } from 'class-validator';
import { Role } from './Role';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsEnum(Role)
  role: Role;
}
