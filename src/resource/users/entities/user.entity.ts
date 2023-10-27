import { Flight } from '../../flights/entities/flight.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 128 })
  email: string;

  @Column({ type: 'varchar', length: 128 })
  firstName: string;

  @Column({ type: 'varchar', length: 128 })
  lastName: string;

  @Column({ type: 'varchar', length: 128 })
  provider: string;

  @Column({ type: 'varchar', length: 100 })
  providerId: string;

  @Column({ type: 'varchar', length: 512, default: '' })
  refreshToken: string;

  @ManyToMany(() => Flight, (flight) => flight.users)
  @JoinTable()
  flights: Flight[];
}
