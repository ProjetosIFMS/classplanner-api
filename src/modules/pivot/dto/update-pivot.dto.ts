import { IsString } from 'class-validator';

export class UpdatePivotDto {
  @IsString()
  name: string;
}
