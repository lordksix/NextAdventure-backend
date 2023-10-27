import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { City } from '../cities/entities/city.entity';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { randomUUID } from 'crypto';

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

  async findAll(arrivalId: number, departureId: number) {
    const flights = await this.flightRepository.find({
      where: {
        arrivalCity: await this.cityRepository.findOneBy({ id: arrivalId }),
        departureCity: await this.cityRepository.findOneBy({ id: departureId }),
      },
    });
    return { data: flights };
  }

  async findOne(id: number) {
    const flight = await this.flightRepository.findOneBy({ id });
    return { data: [flight] };
  }

  async update(
    id: number,
    _refreshToken: string,
    registerUserDto: CreateUserDto,
  ) {
    try {
      const flight = await this.flightRepository.findOneBy({ id });
      const { email, firstName, lastName } = registerUserDto;
      console.log('first');
      if (flight.seatsAvailable < 1)
        return `No seats available for flight #${id}`;
      /* const user = await this.userRepository.findOneBy({ refreshToken }); */
      const user = this.userRepository.create({
        email,
        firstName,
        lastName,
        provider: 'local',
        providerId: randomUUID(),
      });
      console.log(user);
      await this.flightRepository.update(
        { id },
        {
          users: [...flight.users, user],
          seatsAvailable: flight.seatsAvailable - 1,
        },
      );
      console.log('third');
      return `Boooking completed for flight #${id}`;
    } catch {
      return `Boooking COULDN'T BE completed for flight #${id}`;
    }
  }
}
