import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { Country } from './entities/country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../cities/entities/city.entity';
import { Flight } from '../flights/entities/flight.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Country, Flight, User])],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
