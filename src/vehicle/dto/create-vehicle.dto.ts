import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { VehicleColor } from '../entity/vehicle.entity';

export class CreateVehicleDto {
  @IsNumber()
  @IsNotEmpty()
  readonly makeId: number;

  @IsString()
  @IsNotEmpty()
  readonly model: string;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly color?: VehicleColor;

  @IsNumber()
  @IsOptional()
  readonly mileage?: number;

  @IsOptional()
  readonly available: boolean;
}
