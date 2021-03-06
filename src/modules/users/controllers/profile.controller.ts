import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthMiddlewareRequest } from '../../../shared/dto/auth-middleware.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ShowProfileSwagger } from '../swagger/show-profile.swagger';
import { UpdateProfileSwagger } from '../swagger/update-profile.swagger';
import { UsersService } from '../users.service';

@ApiTags('Perfil')
@Controller('profile')
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Mostra o seu perfil',
    // description: 'Carrega o seu perfil',
  })
  @ApiBearerAuth()
  @ApiResponse({ type: ShowProfileSwagger, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get()
  showProfile(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.showProfile(req);
  }

  @ApiOperation({
    summary: 'Atualiza o seu perfil',
    description: 'Altera o seu nome, bio ou senha',
  })
  @ApiResponse({ type: UpdateProfileSwagger, status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.usersService.updateProfile(req, updateUserDto);
  }

  @ApiOperation({
    summary: 'Deleta a sua conta',
    description: 'CUIDADO: Deleta a sua conta, junto com os seus posts',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: AuthMiddlewareRequest) {
    return this.usersService.remove(req);
  }
}
