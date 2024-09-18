import { Entity, Column, OneToMany } from 'typeorm';
import { PostContent } from './post-content.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('post_category')
export class PostCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => PostContent, (postContent) => postContent.category)
  posts: PostContent[];
}
