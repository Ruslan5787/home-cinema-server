import { Film } from 'src/film/entities/film.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

export class GenreFilm {
  @PrimaryColumn({ name: 'filmId' })
  filmId: number;

  @PrimaryColumn({ name: 'genreId' })
  genreId: number;
}
