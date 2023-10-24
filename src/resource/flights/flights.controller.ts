import { Controller, Get, Patch, Param } from '@nestjs/common';
import { FlightsService } from './flights.service';
@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get(':arrivalId/:depatureId')
  findAll(
    @Param('arrivalId') arrivalId: string,
    @Param('depatureId') depatureId: string,
  ) {
    return this.flightsService.findAll(+arrivalId, +depatureId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightsService.findOne(+id);
  }

  @Patch('book/:id/:refreshToken')
  update(@Param('id') id: string, @Param('refreshToken') refreshToken: string) {
    return this.flightsService.update(+id, refreshToken);
  }
}
