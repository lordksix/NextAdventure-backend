import { PartialType } from '@nestjs/mapped-types';
import { CreateFlightDto } from './create-flight.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFlightDto extends PartialType(CreateFlightDto) {
  @IsNotEmpty({ message: 'Flight number is required' })
  @IsString({ message: 'Flight number must be a string' })
  flightId: string;
  @IsNotEmpty({ message: 'Arrival city ID is required' })
  @IsString({ message: 'Arrival city ID must be a string' })
  arrivalCityId: string;
  @IsNotEmpty({ message: 'Depature city ID is required' })
  @IsString({ message: 'Depature city ID must be a string' })
  depatureCityId: string;
}
