import { Injectable } from '@nestjs/common';
import { CreateGenreFilmDto } from './dto/create-genre-film.dto';
import { UpdateGenreFilmDto } from './dto/update-genre-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreFilm } from './entities/genre-film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GenreFilmsService {
  constructor(
    @InjectRepository(GenreFilm)
    private readonly genreFilmRepository: Repository<GenreFilm>,
  ) {}
  create(createGenreFilmDto: CreateGenreFilmDto) {
    return 'This action adds a new genreFilm';
  }

  findAll() {
    return `This action returns all genreFilms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genreFilm`;
  }

  update(id: number, updateGenreFilmDto: UpdateGenreFilmDto) {
    return `This action updates a #${id} genreFilm`;
  }

  remove(id: number) {
    return `This action removes a #${id} genreFilm`;
  }
}
