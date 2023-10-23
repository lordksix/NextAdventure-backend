/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../typeorm/entities/User';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authenticationService: AuthenticationService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serializing User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authenticationService.findUser(payload.id);
    console.log('Deserializing User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
