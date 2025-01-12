import { IsString, IsUUID } from 'class-validator';

export class CreatePivotDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
