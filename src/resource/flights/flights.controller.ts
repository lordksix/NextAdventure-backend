import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get(':arrivalId/:departureId')
  findAll(
    @Param('arrivalId') arrivalId: string,
    @Param('departureId') departureId: string,
  ) {
    return this.flightsService.findAll(+arrivalId, +departureId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Patch('book/:id/:refreshToken')
  update(
    @Param('id') id: string,
    @Param('refreshToken') refreshToken: string,
    @Body() registerUserDto: CreateUserDto,
  ) {
    return this.flightsService.update(+id, refreshToken, registerUserDto);
  }
}
