import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/modules/posts/entities/post.entity';
import createSlug from 'src/utils/createSlug';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ default: null })
  @Column({ default: null })
  bio: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty({ isArray: true, type: () => Post })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  username: string;

  @BeforeUpdate()
  @BeforeInsert()
  async beforeSave() {
    if (this?.name) {
      this.name = this.name.trim();
    }

    if (this?.email) {
      this.email = this.email.toLowerCase().trim();
    }

    if (this?.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }

  @AfterLoad()
  getUsername() {
    if (this?.username && this?.name) {
      this.username = createSlug(this.name);
    }
  }
}
