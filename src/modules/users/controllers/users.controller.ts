import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { IdDto } from 'src/shared/dto/id.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOneUserSwagger } from '../swagger/find-one-user.swagger';
import { UsersService } from '../users.service';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Cria um usuário',
    description:
      'Cria uma conta no twitter a partir de nome, email, senha e username',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Mostra o perfil de um usuário',
    description:
      'Pesquisa um usuário por ID e retorna o perfil dele com os posts',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: FindOneUserSwagger })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.usersService.findOne(idDto);
  }
}
