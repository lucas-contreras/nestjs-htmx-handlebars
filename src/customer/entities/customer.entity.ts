import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum IdentificationType {
  DNI = 'DNI',
  SSN = 'SSN',
  CPF = 'CPF',
  RUT = 'RUT',
}

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  identificationNumber?: string; // DNI, SSN, CPF, etc.

  @Column({ nullable: true })
  identificationType?: IdentificationType; // 'DNI', 'SSN', 'CPF', 'RUT', etc.

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ default: false })
  deleted: boolean;
}
