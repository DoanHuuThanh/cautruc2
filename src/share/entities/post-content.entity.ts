import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { PostImage } from './post-image.entity';
import { PostCategory } from './post-category.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('post_content')
export class PostContent extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  status: boolean;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @OneToMany(() => PostImage, (postImage) => postImage.postContent, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  images: PostImage[];

  @ManyToOne(() => PostCategory, (postCategory) => postCategory.posts, { nullable: true })
  @JoinColumn({ name: 'post_category_id' })
  category: PostCategory;
}
