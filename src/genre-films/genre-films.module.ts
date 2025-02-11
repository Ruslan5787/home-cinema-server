import { Module } from '@nestjs/common';
import { GenreFilmsService } from './genre-films.service';
import { GenreFilmsController } from './genre-films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreFilm } from './entities/genre-film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenreFilm])],

  controllers: [GenreFilmsController],
  providers: [GenreFilmsService],
})
export class GenreFilmsModule {}
