import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Country } from '../../resource/countries/entities/country.entity';

export default class CountrySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE "countries" RESTART IDENTITY CASCADE;');
    const countryFactory = factoryManager.get(Country);
    // save 5 factory generated entities, to the database
    await countryFactory.saveMany(10);
  }
}
