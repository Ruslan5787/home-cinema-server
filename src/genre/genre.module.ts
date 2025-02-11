import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Genre } from './entities/genre.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreFilm } from 'src/genre-films/entities/genre-film.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, GenreFilm])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
