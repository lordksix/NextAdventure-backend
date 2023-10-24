import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Flight } from '../../resource/flights/entities/flight.entity';
import { City } from '../../resource/cities/entities/city.entity';

export default class FlightSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE "flights" RESTART IDENTITY CASCADE;');
    const cities = await dataSource.getRepository(City).find();
    const flightFactory = factoryManager.get(Flight);
    for (let index = 0; index < cities.length; index++) {
      for (let index1 = 1; index1 < cities.length; index1++) {
        if (index !== index1)
          await flightFactory.saveMany(Math.ceil(Math.random() * 10), {
            arrivalCity: cities[index],
            departureCity: cities[index1],
          });
      }
    }
  }
}
