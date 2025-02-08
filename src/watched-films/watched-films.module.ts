import { Module } from '@nestjs/common';
import { WatchedFilmsService } from './watched-films.service';
import { WatchedFilmsController } from './watched-films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchedFilm } from './entities/watched-film.entity';
import { FavoriteFilm } from 'src/favorite-films/entities/favorite-film.entity';
import { FavoriteFilmsService } from 'src/favorite-films/favorite-films.service';
import { WantToWatchedFilmsService } from 'src/want-to-watched-films/want-to-watched-films.service';
import { WantToWatchedFilm } from 'src/want-to-watched-films/entities/want-to-watched-film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WatchedFilm, FavoriteFilm, WantToWatchedFilm]),
  ],
  controllers: [WatchedFilmsController],
  providers: [
    WatchedFilmsService,
    WatchedFilm,
    FavoriteFilmsService,
    WantToWatchedFilmsService,
  ],
})
export class WatchedFilmsModule {}
