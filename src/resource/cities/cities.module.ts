import { Module, forwardRef } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from '../countries/entities/country.entity';
import { Flight } from '../flights/entities/flight.entity';
import { FlightsModule } from '../flights/flights.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, Country, Flight]),
    forwardRef(() => FlightsModule),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
