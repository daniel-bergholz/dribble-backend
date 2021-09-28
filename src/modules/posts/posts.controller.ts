import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { CreatePostSwagger } from './swagger/create-post.swagger';
import { FindAllPostsSwagger } from './swagger/find-all-posts.swagger';
import { UpdatePostSwagger } from './swagger/update-post.swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Cria um post',
    description: 'Cria um post com imagem, título e descrição',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, type: CreatePostSwagger })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: AuthMiddlewareRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postsService.create(createPostDto, req, file);
  }

  @ApiOperation({
    summary: 'Lista os posts',
    description: 'Lista todos os posts junto com o usuário',
  })
  @ApiResponse({ status: 200, type: FindAllPostsSwagger, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Pesquisa um post',
    description: 'Pesquisa um post através do ID',
  })
  @ApiResponse({ status: 200, type: FindAllPostsSwagger })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param() idDto: IdDto) {
    return this.postsService.findOne(idDto);
  }

  @ApiOperation({
    summary: 'Atualiza um post',
    description: 'Atualiza um dos seus posts através do ID',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: UpdatePostSwagger })
  @ApiParam({ name: 'id', type: String })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() idDto: IdDto,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: AuthMiddlewareRequest,
  ) {
    return this.postsService.update(idDto, updatePostDto, req);
  }

  @ApiOperation({
    summary: 'Deleta um post',
    description: 'Deleta um dos seus posts através do ID',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() idDto: IdDto, @Request() req: AuthMiddlewareRequest) {
    return this.postsService.remove(idDto, req);
  }
}
