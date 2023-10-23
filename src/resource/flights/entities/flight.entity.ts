import { City } from 'src/resource/cities/entities/city.entity';
import { User } from 'src/resource/users/entities/user.entity';
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

  @Column()
  departureCityId: number;

  @Column({ type: 'timestamptz' })
  departureTime: Date;

  @ManyToOne(() => City, (city) => city.arrivalFlights)
  arrivalCity: City;

  @Column()
  arrivalCityId: number;

  @Column({ type: 'timestamptz' })
  arrivalTime: Date;

  @Column({ type: 'integer' })
  code: number;

  @ManyToMany(() => User, (user) => user.flights)
  users: User[];

  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  totalSeats: number;

  @Column({ type: 'integer', default: 0 })
  seatsAvailable: number;
}
