import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthenticationService,
  ) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      passReqToCallback: true,
      scope: 'email',
      profileFields: ['id', 'name', 'emails'],
    });
  }
  async validate(
    req: any,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { name, emails, id } = profile;
    const tokens = await this.authService.validateUser({
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      provider: 'google',
    });
    return tokens || null;
  }
}
