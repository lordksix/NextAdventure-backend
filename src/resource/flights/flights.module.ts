import { Module, forwardRef } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Flight } from './entities/flight.entity';
import { CitiesModule } from '../cities/cities.module';
import { City } from '../cities/entities/city.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, City, User]),
    forwardRef(() => UsersModule),
    forwardRef(() => CitiesModule),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
