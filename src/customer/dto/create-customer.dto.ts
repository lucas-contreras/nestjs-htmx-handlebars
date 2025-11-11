import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { IdentificationType } from '../entities/customer.entity';

export class CreateCustomerDto {
  @IsString()
  @IsOptional()
  readonly identificationNumber?: string;

  @IsEnum(IdentificationType)
  @IsOptional()
  readonly identificationType?: IdentificationType;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsOptional()
  readonly address?: string;
}
