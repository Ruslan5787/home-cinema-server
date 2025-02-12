import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWatchedFilmDto } from './dto/create-watched-film.dto';
import { UpdateWatchedFilmDto } from './dto/update-watched-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WatchedFilm } from './entities/watched-film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WatchedFilmsService {
  constructor(
    @InjectRepository(WatchedFilm)
    private readonly watchedFilmRepository: Repository<WatchedFilm>,
  ) {}

  create(createWatchedFilmDto: CreateWatchedFilmDto) {
    return `This action create watchedFilm`;
  }

  async findAll(userId: number) {
    const watchedFilms = await this.watchedFilmRepository.find({
      where: {
        userId,
      },
      relations: {
        users: true,
        films: {
          genres: true,
        },
      },
    });

    if (!watchedFilms)
      throw new NotFoundException('Нет просмотренных фильмов!');

    return watchedFilms;
  }

  async findOne(userId: number, filmId: number) {
    const watchedFilm = await this.watchedFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    return watchedFilm;
  }

  update(id: number, updateWatchedFilmDto: UpdateWatchedFilmDto) {
    return `This action updates a #${id} watchedFilm`;
  }

  async remove(userId: number, filmId: number) {
    const watchedFilm = await this.watchedFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    if (!watchedFilm)
      throw new NotFoundException('Такого фильма нет для удаления!');

    return await this.watchedFilmRepository.remove(watchedFilm);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const watchedFilms = this.watchedFilmRepository.find({
      where: {
        userId: id,
      },
      relations: {
        users: true,
        films: {
          genres: true,
        },
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return watchedFilms;
  }
}
