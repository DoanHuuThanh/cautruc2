import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PostImage } from './post-image.entity';
import { PostCategory } from './post-category.entity';
import { Admin } from './admin.entity';

@Entity('post_content')
export class PostContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean',  default: true })
  status: boolean

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => PostImage, (postImage) => postImage.postContent)
  images: PostImage[];

  @ManyToOne(() => Admin, (admin) => admin.posts)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(() => PostCategory, (postCategory) => postCategory.posts)
  @JoinColumn({ name: 'post_category_id' })
  category: PostCategory;
}
