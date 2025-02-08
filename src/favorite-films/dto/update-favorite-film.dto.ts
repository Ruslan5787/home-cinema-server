import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoriteFilmDto } from './create-favorite-film.dto';

export class UpdateFavoriteFilmDto extends PartialType(CreateFavoriteFilmDto) {}
