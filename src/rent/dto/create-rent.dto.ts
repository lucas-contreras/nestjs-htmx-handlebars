import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsString,
  IsDateString,
  Min,
} from 'class-validator';
import { RentStatus } from '../entities/rent.entity';

export class CreateRentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly vehicleId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly customerId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly dailyRate: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  readonly totalPrice: number;

  @IsEnum(RentStatus)
  @IsOptional()
  readonly status?: RentStatus;

  @IsString()
  @IsOptional()
  readonly notes?: string;

  @IsDateString()
  @IsOptional()
  readonly rentedAt?: string;

  @IsDateString()
  @IsOptional()
  readonly returnedAt?: string;
}
