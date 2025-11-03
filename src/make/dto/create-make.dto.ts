import { IsString } from 'class-validator';

export class CreateMakeDto {
  @IsString()
  readonly manufacturer: string;

  @IsString()
  readonly year: number;

  @IsString()
  readonly description: string;
}
