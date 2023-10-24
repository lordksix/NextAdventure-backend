import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findAll() {
    const cities = await this.cityRepository.find();
    return { data: cities };
  }

  async findOne(id: number) {
    const city = await this.cityRepository.findOneBy({ id });
    return { data: [city] };
  }
}
