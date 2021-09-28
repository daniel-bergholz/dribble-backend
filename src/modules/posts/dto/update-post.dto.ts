import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends OmitType(CreatePostDto, ['file']) {
  @ApiPropertyOptional({ example: 'Meu portfolio de dev frontend' })
  @IsString({ message: 'O campo title deve ser uma string' })
  @IsOptional()
  title: string;
}
