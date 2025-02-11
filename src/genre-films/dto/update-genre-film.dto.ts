import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreFilmDto } from './create-genre-film.dto';

export class UpdateGenreFilmDto extends PartialType(CreateGenreFilmDto) {}
