import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Make } from 'src/make/entity/make.entity';

export enum VehicleColor {
  Black = 'black',
  Red = 'red',
  Beige = 'beige',
  Gray = 'gray',
  White = 'white',
  Green = 'green',
}

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Make, (make) => make.id)
  make: Make;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({
    type: 'enum',
    enum: VehicleColor,
    default: VehicleColor.Black,
    nullable: true,
  })
  color?: VehicleColor;

  @Column({ nullable: true })
  mileage?: number;

  @Column({ default: true })
  available: boolean;
}
