import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationRepository } from './repository/authentication.repository';
import { SessionSerializer } from './utils/serializer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities';
import { FlightModule } from 'src/flight/flight.module';

const jwtPresets = [
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIMEOUT },
    }),
  }),
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.REFRESH_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIMEOUT },
    }),
  }),
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => FlightModule),
    ...jwtPresets,
  ],
  providers: [
    AuthenticationService,
    GoogleStrategy,
    FacebookStrategy,
    AuthenticationRepository,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthenticationService,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
