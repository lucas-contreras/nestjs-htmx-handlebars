import { IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  readonly manufacturer: string;

  @IsString()
  readonly year: number;

  @IsString()
  readonly description: string;
}
