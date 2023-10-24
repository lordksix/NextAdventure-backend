import { Flight } from '../../resource/flights/entities/flight.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Flight, async (faker) => {
  const flight = new Flight();

  flight.airline = faker.location.countryCode();
  flight.code = faker.number.int(10000);
  flight.totalSeats = faker.number.int({ min: 25, max: 250 });
  flight.seatsAvailable = flight.totalSeats;
  flight.price = faker.number.float({ min: 100, max: 10000, precision: 2 });
  flight.departureTime = new Date('2024-03-25');
  flight.arrivalTime = new Date('2024-03-26');

  console.log(flight);

  return flight;
});
