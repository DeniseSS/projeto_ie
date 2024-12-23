import { IsNotEmpty, IsString, IsInt, IsOptional, MinLength, MaxLength, Min } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  image?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  email: string;
}
