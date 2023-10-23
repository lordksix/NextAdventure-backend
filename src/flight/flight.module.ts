import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight, User } from 'src/typeorm/entities';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flight, User]),
    forwardRef(() => UserModule),
  ],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
