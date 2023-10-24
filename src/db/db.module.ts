import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { Country } from '../resource/countries/entities/country.entity';
import { City } from '../resource/cities/entities/city.entity';
import { Flight } from '../resource/flights/entities/flight.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Country, City, Flight]),
  ],
})
export class DbModule {}
