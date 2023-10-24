import { Injectable } from '@nestjs/common';
import {
  EntryptedAccessTokens,
  UserDetails,
} from './interface/authentication.interface';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import { AuthenticationRepository } from './repository/authentication.repository';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundResponse } from 'src/utils/response/notFound.response';
import { User } from 'src/resource/users/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private authenticationRepository: AuthenticationRepository,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async generateTokens(
    user: User,
    both = true,
  ): Promise<EntryptedAccessTokens> {
    const payload = { sub: user.id };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_TIMEOUT,
    });

    // Encrypt Access Token before sending them to the frontend
    const encryptedAccessToken = CryptoJS.AES.encrypt(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    ).toString();

    if (!both) {
      return {
        encryptedAccessToken,
      };
    }

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_TIMEOUT,
    });

    //Encrypt Refresh Token before sending them to the frontend
    const encryptedRefreshToken = CryptoJS.AES.encrypt(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    ).toString();

    return {
      encryptedAccessToken,
      encryptedRefreshToken,
    };
  }

  async validateUser(userReq: UserDetails): Promise<EntryptedAccessTokens> {
    const user = await this.userRepository.findOneBy({
      email: userReq.email,
      provider: userReq.provider,
    });
    console.log(user);
    if (user) {
      const { encryptedAccessToken, encryptedRefreshToken } =
        await this.generateTokens(user);
      await this.authenticationRepository.updateUserTokens(
        user.id,
        encryptedAccessToken,
      );
      return { encryptedAccessToken, encryptedRefreshToken };
    } else {
      console.log('User not found. Creating...');
      const newUser = this.userRepository.create(userReq);
      const savedUser = await this.userRepository.save(newUser);
      const { encryptedAccessToken, encryptedRefreshToken } =
        await this.generateTokens(savedUser);
      await this.authenticationRepository.updateUserTokens(
        savedUser.id,
        encryptedAccessToken,
      );
      return { encryptedAccessToken, encryptedRefreshToken };
    }
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<EntryptedAccessTokens> {
    const user =
      await this.authenticationRepository.findUserByRefreshToken(refreshToken);
    if (!user) {
      throw NotFoundResponse.response('User not found');
    }

    const { encryptedRefreshToken, encryptedAccessToken } =
      await this.generateTokens(user);

    return {
      encryptedAccessToken,
      encryptedRefreshToken,
    };
  }

  async findUserByEmail(email: string, provider: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email,
      provider,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
