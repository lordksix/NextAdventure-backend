import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class DecryptTokenMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    if (request.headers.authorization === undefined) return next();

    const encryptedAccessToken = request.headers.authorization.split(' ')[1]; // You may need to adjust this depending on how your tokens are sent.

    if (!encryptedAccessToken) {
      return next();
    }

    try {
      const decryptedAccessToken = CryptoJS.AES.decrypt(
        encryptedAccessToken,
        process.env.ACCESS_TOKEN_SECRET,
      ).toString(CryptoJS.enc.Utf8);

      request.headers.authorization = 'Bearer ' + decryptedAccessToken;

      const secretKey = process.env.ACCESS_TOKEN_SECRET;
      jwt.verify(decryptedAccessToken, secretKey, (err, decoded) => {
        if (err) {
          console.error('Token verification failed ', err);
          throw new UnauthorizedException('Invalid token provided');
        }
        console.log({ decoded });
        request.user = decoded;

        next();
      });

      next();
    } catch (error) {
      console.error('Token decryption failed ', error);
      next();
    }
  }
}
