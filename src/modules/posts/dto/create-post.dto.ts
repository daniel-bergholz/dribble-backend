import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBase64, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'Meu portfolio de dev frontend' })
  @IsNotEmpty({ message: 'O campo title não pode ser vazio' })
  @IsString({ message: 'O campo title deve ser uma string' })
  title: string;

  @ApiPropertyOptional({
    example: 'Esse projeto em fiz em 6 meses usando o reactjs e nextjs...',
  })
  @IsOptional()
  description: string;

  @ApiProperty({ format: 'binary' })
  @IsBase64({ message: 'O arquivo precisa estar no formato base64' })
  file: string;
}
