import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class FindAllUsersSwagger extends OmitType(User, [
  'posts',
  'password',
]) {}
