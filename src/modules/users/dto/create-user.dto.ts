import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'name', example: 'Daniel Berg' })
  @IsNotEmpty({ message: 'O campo name não pode ser vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  name: string;

  @ApiPropertyOptional({
    name: 'bio',
    example: 'UX/UI, e desenvolvimento frontend',
  })
  @IsOptional()
  @IsString({ message: 'O campo name deve ser uma string' })
  bio?: string;

  @ApiProperty({
    name: 'email',
    example: 'bergholz.daniel@gmail.com',
  })
  @IsNotEmpty({ message: 'O campo email não pode ser vazio' })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    example: 'abcd1234',
    description: 'A senha precisa ter no mínimo 8 caracteres',
  })
  @MinLength(8, {
    message: 'O campo password precisa ter no mínimo 8 caracteres',
  })
  @IsString({ message: 'O campo password deve ser uma string' })
  @IsNotEmpty({ message: 'O campo password não pode ser vazio' })
  password: string;
}

// Senha com no mínimo 8 caracteres, letra maiuscula e minuscula, numero e caractere especial
// @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
