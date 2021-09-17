import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ShowProfileSwagger extends OmitType(User, ['password']) {}
