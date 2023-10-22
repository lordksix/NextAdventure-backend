import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { FacebookStrategy } from './strategy/facebook.strategy';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AuthenticationService, GoogleStrategy, FacebookStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
