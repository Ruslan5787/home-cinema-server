import { PartialType } from '@nestjs/mapped-types';
import { CreateWatchedFilmDto } from './create-watched-film.dto';

export class UpdateWatchedFilmDto extends PartialType(CreateWatchedFilmDto) {}
