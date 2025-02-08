import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WantToWatchedFilm } from './entities/want-to-watched-film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WantToWatchedFilmsService {
  constructor(
    @InjectRepository(WantToWatchedFilm)
    private readonly wantToWatchedFilmRepository: Repository<WantToWatchedFilm>,
  ) {}

  async findAllWithPagination(userId, page, limit) {
    const wantToWatchedFilms = await this.wantToWatchedFilmRepository.find({
      where: {
        userId,
      },
      relations: {
        users: true,
        films: true,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return wantToWatchedFilms;
  }

  async findAll(userId: number) {
    const wantToWatchedFilms = await this.wantToWatchedFilmRepository.find({
      where: {
        userId,
      },
      relations: {
        users: true,
        films: true,
      },
    });

    return wantToWatchedFilms;
  }

  async findOne(userId: number, filmId: number) {
    const wantToWatchedFilm = await this.wantToWatchedFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    if (!wantToWatchedFilm) {
      throw new NotFoundException('В желанных нет такого фильма!');
    }

    return wantToWatchedFilm;
  }

  async remove(userId: number, filmId: number) {
    const wantToWatchedFilm = await this.wantToWatchedFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    if (!wantToWatchedFilm)
      throw new NotFoundException('Такого фильма нет для удаления!');

    return await this.wantToWatchedFilmRepository.remove(wantToWatchedFilm);
  }
}
