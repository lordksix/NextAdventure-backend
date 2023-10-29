import { Module, forwardRef } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from '../countries/entities/country.entity';
import { FlightsModule } from '../flights/flights.module';
import { User } from '../users/entities/user.entity';
import { Flight } from '../flights/entities/flight.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([City, Country, User, Flight]),
    forwardRef(() => FlightsModule),
  ],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService],
})
export class CitiesModule {}
