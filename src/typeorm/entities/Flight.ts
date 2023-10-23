import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City, User } from '.';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => City, (city) => city.departureFlights)
  departurecity: string;

  @Column()
  departurecityId: number;

  @Column({ type: 'timestamptz' })
  departureTime: Date;

  @ManyToOne(() => City, (city) => city.arrivalFlights)
  arrivalcity: string;

  @Column()
  arrivalcityId: number;

  @Column({ type: 'timestamptz' })
  arrivalTime: Date;

  @Column({ type: 'varchar', length: 3 })
  code: string;

  @ManyToMany(() => User, (user) => user.reservations)
  @JoinTable()
  users: User[];

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  totalSeats: number;

  @Column({ type: 'integer', default: 0 })
  seatsAvailable: number;
}
