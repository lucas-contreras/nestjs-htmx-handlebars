import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  readonly make: string;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly color?: string;

  @IsNumber()
  @IsOptional()
  readonly mileage?: number;
}
