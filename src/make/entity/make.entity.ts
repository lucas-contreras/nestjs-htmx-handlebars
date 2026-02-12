import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('makes')
export class Make {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturer: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  deleted: boolean;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
