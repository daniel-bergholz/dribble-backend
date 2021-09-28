import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Post } from 'src/modules/posts/entities/post.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
