import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthMiddlewareRequest } from 'src/shared/dto/auth-middleware.dto';
import { IdDto } from 'src/shared/dto/id.dto';
import { Repository } from 'typeorm';
import { FileService } from '../file/file.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private fileService: FileService,
  ) {}

  async create(createPostDto: CreatePostDto, file: Express.Multer.File) {
    const { description, title } = createPostDto;

    const base64Image = file.buffer.toString('base64');

    const uploadStr = 'data:image/jpeg;base64,' + base64Image;

    const { secure_url, public_id } = await this.fileService.upload(uploadStr);

    const post = this.postsRepository.create({
      title,
      description,
      image_url: secure_url,
      image_id: public_id,
    });

    return this.postsRepository.save(post);
  }

  async findAll() {
    return this.postsRepository.find({
      take: 100,
      order: { created_at: 'DESC' },
    });
  }

  async findOne(idDto: IdDto) {
    const { id } = idDto;

    const post = await this.postsRepository.findOne(id);

    if (!post) {
      throw new BadRequestException(`Post de ID = ${id} não encontrado`);
    }

    return post;
  }

  async findUserPost(idDto: IdDto, req: AuthMiddlewareRequest) {
    const { user } = req;
    const { id } = idDto;

    const post = await this.postsRepository.findOne(id, {
      where: { user: { id: user.id } },
    });

    if (!post) {
      throw new BadRequestException(`Post de ID = ${id} não encontrado`);
    }

    return post;
  }

  async update(
    idDto: IdDto,
    updatePostDto: UpdatePostDto,
    req: AuthMiddlewareRequest,
  ) {
    const { description, title } = updatePostDto;

    const post = await this.findUserPost(idDto, req);

    if (title) post.title = title;
    if (description) post.description = description;

    return this.postsRepository.save(post);
  }

  async remove(idDto: IdDto, req: AuthMiddlewareRequest) {
    const post = await this.findUserPost(idDto, req);

    await this.postsRepository.remove(post);
  }
}
