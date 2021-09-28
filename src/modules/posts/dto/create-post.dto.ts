import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Meu portfolio de dev frontend' })
  @IsNotEmpty({ message: 'O campo title não pode ser vazio' })
  @IsString({ message: 'O campo title deve ser uma string' })
  title: string;

  @ApiPropertyOptional({
    example: 'Fiz esse projeto em 6 meses usando o nextjs...',
  })
  @IsString({ message: 'O campo title deve ser uma string' })
  @IsOptional()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
