import { IsNumber } from 'class-validator';

export class CreateWatchedFilmDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  filmId: number;
}
