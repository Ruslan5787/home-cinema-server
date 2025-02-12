import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Any, ArrayContains, Equal, ILike, Like, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entities/genre.entity';
import { IGenre } from 'src/types/types';
import { log } from 'console';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const existingFilm = await this.filmRepository.findOne({
      where: {
        name: createFilmDto.name,
      },
    });

    if (existingFilm) {
      throw new BadRequestException('Фильм с таким названием уже существует.');
    }

    const film = new Film();

    film.name = createFilmDto.name;
    film.production = createFilmDto.production;
    film.yearRelease = createFilmDto.yearRelease;
    film.duration = createFilmDto.duration;
    film.poster = createFilmDto.poster;
    film.description = createFilmDto.description;
    film.restrictionAge = createFilmDto.restrictionAge;
    film.genre = createFilmDto.genre;
    film.genres = createFilmDto.genres;

    await this.filmRepository.save(film);
  }

  async findAll() {
    const films = await this.filmRepository.find({
      relations: {
        genres: true,
      },
    });

    if (!films) throw new NotFoundException('Библиотека пуста!');

    return films;
  }

  async searchFilms(string: string) {
    const foundFilms = await this.filmRepository.find({
      where: {
        name: ILike(`%${string}%`),
      },
      take: 6,
    });

    return foundFilms;
  }

  async getFilmsAboutGenre(genre: string) {
    const films = await this.filmRepository.find({
      where: {
        genres: {
          name: genre,
        },
      },
      relations: ['genres'],
      loadEagerRelations: true, // Убедитесь, что все связанные сущности загружаются
    });

    return films;
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({
      where: {
        id,
      },
      relations: {
        genres: true,
      },
    });

    if (!film) throw new NotFoundException('Такого фильма нет!');

    return film;
  }

  async remove(id: number) {
    const film = await this.filmRepository.find({
      where: {
        id,
      },
    });

    await this.filmRepository.remove(film);
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const isFilmNameExist = await this.filmRepository.findOne({
      where: {
        name: updateFilmDto.name,
      },
      relations: ['genres'],
    });

    if (isFilmNameExist && id != isFilmNameExist.id)
      throw new NotFoundException('Фильм c таким названием уже существует.');

    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['genres'], // загружаем существующие жанры фильма
    });

    if (!film) throw new NotFoundException('Фильм не найден');

    film.name = updateFilmDto.name;
    film.poster = updateFilmDto.poster;
    film.restrictionAge = updateFilmDto.restrictionAge;
    film.production = updateFilmDto.production;
    film.yearRelease = updateFilmDto.yearRelease;
    film.duration = updateFilmDto.duration;
    film.description = updateFilmDto.description;
    film.genres = updateFilmDto.genres;

    await this.filmRepository.save(film);
    return film;
  }

  async findAllWithPagination(page: number, limit: number) {
    const films = this.filmRepository.find({
      relations: {
        genres: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: {
        createAt: 'DESC',
      },
    });

    return films;
  }

  async findAllFilmGenres(filmId) {
    const films = this.filmRepository.find({
      where: {
        id: filmId,
      },
      relations: {
        genres: true,
      },
    });

    return films;
  }

  async addGenresToFilm(filmId: number, genres: IGenre[]) {
    const film = await this.filmRepository.findOne({
      where: { id: filmId },
      relations: ['genres'],
    });

    if (!film) throw new NotFoundException('Фильм не найден');

    const genreIds = genres.map((genre) => genre.id);

    const foundGenres = await this.genreRepository.findByIds(genreIds);

    if (foundGenres.length !== genreIds.length) {
      throw new NotFoundException('Один или несколько жанров не найдены');
    }

    film.genres = foundGenres;

    await this.filmRepository.save(film);

    return film;
  }
}
