import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country, Flight } from '.';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 3 })
  code: string;

  @ManyToOne(() => Country, (country) => country.cities)
  country: Country;

  @Column()
  countryId: number;

  @OneToMany(() => Flight, (flight) => flight.departurecity)
  departureFlights: Flight[];

  @OneToMany(() => Flight, (flight) => flight.arrivalcity)
  arrivalFlights: Flight[];
}
