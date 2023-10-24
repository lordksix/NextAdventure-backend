import { Injectable } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async findAll() {
    const countries = await this.countryRepository.find();
    return { data: countries };
  }

  async findOne(id: number) {
    const country = await this.countryRepository.findOneBy({ id });
    return { data: [country] };
  }
}
