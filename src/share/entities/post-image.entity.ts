import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PostContent } from './post-content.entity';

@Entity('post_image')
export class PostImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'varchar', length: 255 })
  alt: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => PostContent, (postContent) => postContent.images, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'post_content_id' })
  postContent: PostContent | null;
}
