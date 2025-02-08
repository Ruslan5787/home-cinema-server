import { Module } from '@nestjs/common';
import { WantToWatchedFilmsService } from './want-to-watched-films.service';
import { WantToWatchedFilmsController } from './want-to-watched-films.controller';
import { WantToWatchedFilm } from './entities/want-to-watched-film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteFilm } from 'src/favorite-films/entities/favorite-film.entity';
import { FavoriteFilmsService } from 'src/favorite-films/favorite-films.service';
import { WatchedFilmsService } from 'src/watched-films/watched-films.service';
import { WatchedFilm } from 'src/watched-films/entities/watched-film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WantToWatchedFilm, FavoriteFilm, WatchedFilm]),
  ],
  controllers: [WantToWatchedFilmsController],
  providers: [
    WantToWatchedFilmsService,
    WantToWatchedFilm,
    FavoriteFilmsService,
    WatchedFilmsService,
  ],
})
export class WantToWatchedFilmsModule {}
