import { City } from '../../resource/cities/entities/city.entity';
import { setSeederFactory, useSeederFactory } from 'typeorm-extension';
import { Country } from '../../resource/countries/entities/country.entity';

export default setSeederFactory(City, async (faker) => {
  const city = new City();

  city.name = faker.location.city();
  city.code = faker.location.countryCode('alpha-3');
  const country = await useSeederFactory(Country).save();
  city.country = country;
  console.log(country);
  console.log(city);
  return city;
});
