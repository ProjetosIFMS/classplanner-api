import { IsString, IsUUID } from 'class-validator';

export class CreateAreaDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
