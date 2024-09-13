import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PostImage } from './post-image.entity';
import { PostCategory } from './post-category.entity';
import { Admin } from './admin.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('post_content')
export class PostContent extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => PostImage, (postImage) => postImage.postContent, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  images: PostImage[];

  @ManyToOne(() => Admin, (admin) => admin.posts)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @ManyToOne(() => PostCategory, (postCategory) => postCategory.posts)
  @JoinColumn({ name: 'post_category_id' })
  category: PostCategory;
}
