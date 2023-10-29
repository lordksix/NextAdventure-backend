import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FlightsModule } from '../flights/flights.module';
import { Country } from '../countries/entities/country.entity';
import { City } from '../cities/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, City, Country]),
    forwardRef(() => FlightsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
