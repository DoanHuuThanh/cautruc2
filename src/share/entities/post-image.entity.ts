import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PostContent } from './post-content.entity';
import { BaseEntity } from '../base/base.entity';

@Entity('post_image')
export class PostImage extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  alt: string;

  @ManyToOne(() => PostContent, (postContent) => postContent.images, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'post_content_id' })
  postContent: PostContent | null;
}
