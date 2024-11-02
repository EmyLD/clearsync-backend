import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  phone: string;

  @IsString()
  iban: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @Length(6, 20)
  password?: string;

  @IsPhoneNumber('FR') // Utiliser un préfixe régional approprié
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  iban?: string;
}
