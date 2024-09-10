import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'createdDate' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedDate' })
  updatedAt: Date;

  @Column({ name: 'createdBy', nullable: true })
  createdBy: string;

  @Column({ name: 'updatedBy', nullable: true })
  updatedBy: string;
}
