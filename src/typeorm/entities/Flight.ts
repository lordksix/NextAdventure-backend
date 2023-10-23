import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City';
import { User } from './User';

@Entity({ name: 'fligths' })
export class Flight {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(() => City)
  departureCity: number;

  @Column({ type: 'datetime' })
  departureTime: number;

  @OneToOne(() => City)
  arrivalCity: number;

  @Column({ type: 'datetime' })
  arrivalTime: number;

  @Column({ type: 'varchar', length: 3 })
  code: string;

  @ManyToMany(() => User, (user) => user.reservations)
  users: User[];

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'integer' })
  totalSeats: number;

  @Column({ type: 'integer' })
  seatsAvailable: number;
}
