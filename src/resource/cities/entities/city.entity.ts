import { Country } from '../../countries/entities/country.entity';
import { Flight } from '../../flights/entities/flight.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 3 })
  code: string;

  @ManyToOne(() => Country, (country) => country.cities)
  country: Country;

  @OneToMany(() => Flight, (flight) => flight.departureCity)
  departureFlights: Flight[];

  @OneToMany(() => Flight, (flight) => flight.arrivalCity)
  arrivalFlights: Flight[];
}
