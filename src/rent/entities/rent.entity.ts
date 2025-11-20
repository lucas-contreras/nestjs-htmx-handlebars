import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicle/entity/vehicle.entity';
import { Customer } from '../../customer/entities/customer.entity';

export enum RentStatus {
  Pending = 'pending',
  Active = 'active',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

@Entity('rents')
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, { eager: true })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column()
  vehicleId: number;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  customerId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  dailyRate: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: RentStatus,
    default: RentStatus.Pending,
  })
  status: RentStatus;

  @Column({ nullable: true })
  notes?: string;

  @Column({ type: 'timestamp', nullable: true })
  rentedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
