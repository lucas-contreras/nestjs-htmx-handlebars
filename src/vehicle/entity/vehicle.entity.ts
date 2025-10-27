import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Model } from 'src/model/entity/model.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Model, (model) => model.id)
  make: Model;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  color: string;
}
