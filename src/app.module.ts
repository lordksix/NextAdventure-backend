import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication/authentication.controller';
import { DecryptTokenMiddleware } from './middleware/decrypt-token.middleware';
import { DbModule } from './db/db.module';
import { UsersModule } from './resource/users/users.module';
import { FlightsModule } from './resource/flights/flights.module';
import { CitiesModule } from './resource/cities/cities.module';
import { CountriesModule } from './resource/countries/countries.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AuthenticationModule,
    PassportModule.register({ session: true }),
    DbModule,
    UsersModule,
    FlightsModule,
    CitiesModule,
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DecryptTokenMiddleware)
      .exclude(
        { path: 'authentication/google', method: RequestMethod.GET },
        { path: 'authentication/google/callback', method: RequestMethod.GET },
        { path: 'authentication/facebook', method: RequestMethod.GET },
        { path: 'authentication/facebook/callback', method: RequestMethod.GET },
      )
      .forRoutes(AuthenticationController);
  }
}
