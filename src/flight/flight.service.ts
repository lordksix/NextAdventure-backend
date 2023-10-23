import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}
}
