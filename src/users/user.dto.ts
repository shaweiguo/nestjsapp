import { IsNotEmpty, MinLength, IsEmail, IsEnum, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  firstName: string;
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  firstName: string;
  lastName: string;

  @IsNotEmpty()
  password1: string;

  @IsNotEmpty()
  password2: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  age: number;
}