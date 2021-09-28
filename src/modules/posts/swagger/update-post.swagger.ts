import { OmitType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class UpdatePostSwagger extends OmitType(Post, ['user']) {}
