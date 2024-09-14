import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  hashedPassword: string;
}
