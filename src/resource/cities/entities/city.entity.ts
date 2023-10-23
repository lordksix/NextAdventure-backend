import { Country } from 'src/resource/countries/entities/country.entity';
import { Flight } from 'src/resource/flights/entities/flight.entity';
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

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 3 })
  code: string;

  @ManyToOne(() => Country, (country) => country.cities)
  country: Country;

  @Column()
  countryId: number;

  @OneToMany(() => Flight, (flight) => flight.departureCity)
  departureFlights: Flight[];

  @OneToMany(() => Flight, (flight) => flight.arrivalCity)
  arrivalFlights: Flight[];
}
