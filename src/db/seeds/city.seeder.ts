import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { City } from '../../resource/cities/entities/city.entity';
import { Country } from '../../resource/countries/entities/country.entity';

export default class CitySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE "cities" RESTART IDENTITY CASCADE;');
    const repository = await dataSource.getRepository(Country).find();
    repository.forEach(async (country) => {
      const cityFactory = factoryManager.get(City);
      // save 5 factory generated entities, to the database
      await cityFactory.saveMany(2, { country });
    });
  }
}
