import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './Country';

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
}
