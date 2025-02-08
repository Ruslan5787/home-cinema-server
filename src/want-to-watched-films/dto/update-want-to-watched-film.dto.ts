import { PartialType } from '@nestjs/mapped-types';
import { CreateWantToWatchedFilmDto } from './create-want-to-watched-film.dto';

export class UpdateWantToWatchedFilmDto extends PartialType(CreateWantToWatchedFilmDto) {}
