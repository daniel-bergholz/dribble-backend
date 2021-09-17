import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdDto } from '../../shared/dto/id.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthMiddlewareRequest } from '../../shared/dto/auth-middleware.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(idDto: IdDto): Promise<User> {
    const { id } = idDto;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`Usuário não encontrado`);
    }

    return user;
  }

  async showProfile(req: AuthMiddlewareRequest): Promise<User> {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    return user;
  }

  async updateProfile(
    req: AuthMiddlewareRequest,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { user: userFromJwt } = req;
    const { id } = userFromJwt;

    // check if user exists
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new BadRequestException(`O usuário com ID = ${id} não existe`);
    }

    // enable only name or password update
    const { name, password } = updateUserDto;

    // error if new fields are empty
    if (!name && !password) {
      throw new BadRequestException(
        `Os campos: name ou password precisam ser enviados no corpo da requisição`,
      );
    }

    // update user
    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, password, bio } = createUserDto;
    const email = createUserDto.email.toLowerCase();

    // check if user exists by the lowercase email
    const userExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestException(`O email ${email} não está disponível`);
    }

    // create new user
    const user = this.usersRepository.create({
      email,
      name,
      password,
      bio,
    });

    await this.usersRepository.save(user);

    return this.removeUnwantedFields(user);
  }

  async remove(req: AuthMiddlewareRequest): Promise<void> {
    const { user: userFromJwt } = req;

    // check if user exists
    const user = await this.findOne({ id: userFromJwt.id });

    await this.usersRepository.delete(user.id);
  }

  // CAUTION: this function returns the user WITH PASSWORD
  // it is used by the AuthService login
  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException(`O campo email é obrigatório`);
    }

    email = email.toLowerCase();

    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  removeUnwantedFields(user: User): User {
    delete user.password;
    delete user.created_at;
    delete user.updated_at;

    return user;
  }
}
