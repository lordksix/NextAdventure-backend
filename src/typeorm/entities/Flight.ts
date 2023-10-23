import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '.';

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

  /*   @ManyToMany(() => User, (user) => user.reservations)
  @JoinTable()
  users: User[]; */

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'integer' })
  totalSeats: number;

  @Column({ type: 'integer' })
  seatsAvailable: number;
}
