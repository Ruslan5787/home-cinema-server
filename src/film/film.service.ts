import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ILike, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
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

    await this.filmRepository.save(film);
  }

  async findAll() {
    const films = await this.filmRepository.find();

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
        genre: {
          name: genre,
        },
      },
    });

    return films;
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({
      where: {
        id,
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
    });

    if (isFilmNameExist && id != isFilmNameExist.id)
      throw new NotFoundException('Фильм c таким названием уже существует.');

    return await this.filmRepository.update(id, updateFilmDto);
  }

  async findAllWithPagination(page: number, limit: number) {
    const films = this.filmRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      order: {
        createAt: 'DESC',
      },
    });

    return films;
  }
}
