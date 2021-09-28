import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from 'src/modules/users/entities/user.entity';
import { Post } from '../entities/post.entity';

export class FindAllPostsSwagger extends Post {
  @ApiProperty({ type: OmitType(User, ['posts', 'password']) })
  user: User;
}
