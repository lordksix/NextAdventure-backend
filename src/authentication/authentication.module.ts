import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [AuthenticationService, GoogleStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
