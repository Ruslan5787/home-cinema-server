import { Module } from '@nestjs/common';
import { FavoriteFilmsService } from './favorite-films.service';
import { FavoriteFilmsController } from './favorite-films.controller';
import { FavoriteFilm } from './entities/favorite-film.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WatchedFilm } from 'src/watched-films/entities/watched-film.entity';
import { WatchedFilmsService } from 'src/watched-films/watched-films.service';
import { WantToWatchedFilm } from 'src/want-to-watched-films/entities/want-to-watched-film.entity';
import { WantToWatchedFilmsService } from 'src/want-to-watched-films/want-to-watched-films.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteFilm, WatchedFilm, WantToWatchedFilm]),
  ],
  controllers: [FavoriteFilmsController],
  providers: [
    FavoriteFilmsService,
    FavoriteFilm,
    WatchedFilmsService,
    WantToWatchedFilmsService,
  ],
})
export class FavoriteFilmsModule {}
