import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  authLogin(req, provider: string) {
    if (!req.user) {
      return `No user from ${provider}`;
    }

    return {
      message: `User information from from ${provider}`,
      user: req.user,
    };
  }
}
