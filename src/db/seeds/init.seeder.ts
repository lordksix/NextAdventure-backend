import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import countryFactory from '../factories/country.factory';
import cityFactory from '../factories/city.factory';
import flightFactory from '../factories/flight.factory';
import CountrySeeder from './country.seeder';
import CitySeeder from './city.seeder';
import FlightSeeder from './flight.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [CountrySeeder, CitySeeder, FlightSeeder],
      factories: [countryFactory, cityFactory, flightFactory],
    });
  }
}
