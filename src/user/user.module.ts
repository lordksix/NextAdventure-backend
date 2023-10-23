import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Flight, User } from 'src/typeorm/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightModule } from 'src/flight/flight.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Flight]),
    forwardRef(() => FlightModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
