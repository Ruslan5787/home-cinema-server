import { IsNumber } from 'class-validator';

export class CreateFavoriteFilmDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  filmId: number;
}
