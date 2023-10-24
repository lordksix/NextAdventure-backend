import { Controller, Get, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  async findAll() {
    return await this.citiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.citiesService.findOne(+id);
  }
}
