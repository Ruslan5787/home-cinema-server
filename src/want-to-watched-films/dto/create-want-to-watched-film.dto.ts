import { IsNumber } from 'class-validator';

export class CreateWantToWatchedFilmDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  filmId: number;
}
