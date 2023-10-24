import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/resource/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthenticationRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async updateUserTokens(userId: number, refreshToken: string): Promise<void> {
    console.log(userId);
    await this.userRepository.update(
      { id: userId },
      {
        refreshToken,
      },
    );
  }

  async findUserByRefreshToken(refreshToken: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ refreshToken });
  }
}
