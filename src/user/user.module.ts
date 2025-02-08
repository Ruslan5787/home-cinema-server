import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WatchedFilm } from 'src/watched-films/entities/watched-film.entity';
import { WantToWatchedFilm } from 'src/want-to-watched-films/entities/want-to-watched-film.entity';
import { FavoriteFilm } from 'src/favorite-films/entities/favorite-film.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([WatchedFilm]),
    TypeOrmModule.forFeature([WantToWatchedFilm]),
    TypeOrmModule.forFeature([FavoriteFilm]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
