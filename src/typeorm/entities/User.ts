import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flight } from './Flight';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50 })
  provider: string;

  @Column({ type: 'varchar', length: 100 })
  providerId: string;

  @Column({ type: 'varchar', length: 512, default: '' })
  refreshToken: string;

  @ManyToMany(() => Flight, (flight) => flight.users)
  reservations: Flight[];
}
