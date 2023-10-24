import { City } from '../../cities/entities/city.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'flights' })
export class Flight {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => City, (city) => city.departureFlights)
  departureCity: City;

  @Column({ type: 'timestamptz' })
  departureTime: Date;

  @ManyToOne(() => City, (city) => city.arrivalFlights)
  arrivalCity: City;

  @Column({ type: 'timestamptz' })
  arrivalTime: Date;

  @Column({ type: 'integer' })
  code: number;

  @Column({ type: 'varchar', length: 2 })
  airline: string;

  @ManyToMany(() => User, (user) => user.flights)
  users: User[];

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  totalSeats: number;

  @Column({ type: 'integer', default: 0 })
  seatsAvailable: number;
}
