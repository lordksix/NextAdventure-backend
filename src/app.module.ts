import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import entities from './typeorm/entities';
import { AuthenticationController } from './authentication/authentication.controller';
import { DecryptTokenMiddleware } from './middleware/decrypt-token.middleware';

@Module({
  imports: [
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_PG_HOST'),
        port: +configService.get<number>('DATABASE_PG_PORT'),
        username: configService.get('DATABASE_PG_USERNAME'),
        password: configService.get('DATABASE_PG_PASSWORD'),
        database: configService.get('DATABASE_PG_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ session: true }),
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
