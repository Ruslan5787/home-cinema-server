import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';
import { FavoriteFilmsModule } from './favorite-films/favorite-films.module';
import { WatchedFilmsModule } from './watched-films/watched-films.module';
import { WantToWatchedFilmsModule } from './want-to-watched-films/want-to-watched-films.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenreModule } from './genre/genre.module';
import { RestrictionAgeModule } from './restriction-age/restriction-age.module';
import { GenreFilmsModule } from './genre-films/genre-films.module';

@Module({
  imports: [
    UserModule,
    GenreModule,
    FilmModule,
    AuthModule,
    FavoriteFilmsModule,
    WatchedFilmsModule,
    WantToWatchedFilmsModule,
    RestrictionAgeModule,
    GenreFilmsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true,
        // autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
