import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    const { url, public_id } = await this.fileService.upload(uploadStr);

    const post = this.postsRepository.create({
      title,
      description,
      image_url: url,
      image_id: public_id,
    });

    return this.postsRepository.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
