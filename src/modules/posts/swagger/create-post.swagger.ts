import { OmitType } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class CreatePostSwagger extends OmitType(Post, ['user']) {}
