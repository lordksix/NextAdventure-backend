import { Country } from '../../resource/countries/entities/country.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Country, (faker) => {
  const country = new Country();

  country.name = faker.location.country();
  country.code = faker.location.countryCode('alpha-3');
  return country;
});
