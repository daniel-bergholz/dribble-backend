import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class FindOneUserSwagger extends User {
  @ApiProperty({ type: OmitType(Post, ['user']), isArray: true })
  posts: Post[];
}
