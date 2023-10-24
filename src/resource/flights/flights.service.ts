import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { City } from '../cities/entities/city.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(arrivalId: number, depatureId: number) {
    const flights = await this.flightRepository.find({
      where: {
        arrivalCity: await this.cityRepository.findOneBy({ id: arrivalId }),
        departureCity: await this.cityRepository.findOneBy({ id: depatureId }),
      },
    });
    return { data: flights };
  }

  async findOne(id: number) {
    const flight = await this.flightRepository.findOneBy({ id });
    return { data: [flight] };
  }

  async update(id: number, refreshToken: string) {
    try{
      const flight = await this.flightRepository.findOneBy({ id });
      const user = await this.userRepository.findOneBy({ refreshToken });
       await this.flightRepository.update(
        { id },
        { users: [...flight.users, user] },
      );
      return `Boooking completed for flight #${id}`;
    } catch {
      return `Boooking COULDN'T BE completed for flight #${id}`;
    }

  }
}
