import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  manufacturer: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  description: string;
}
