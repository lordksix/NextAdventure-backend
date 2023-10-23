import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './authentication/authentication.controller';
import { DecryptTokenMiddleware } from './middleware/decrypt-token.middleware';
import { DbModule } from './db/db.module';
import { UsersModule } from './resource/users/users.module';
import { FlightsModule } from './resource/flights/flights.module';

@Module({
  imports: [
    AuthenticationModule,
    PassportModule.register({ session: true }),
    DbModule,
    UsersModule,
    FlightsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
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
