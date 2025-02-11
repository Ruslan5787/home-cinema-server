import { IsNumber } from 'class-validator';

export class CreateGenreFilmDto {
  @IsNumber()
  filmId: number;

  @IsNumber()
  genreId: number;
}
