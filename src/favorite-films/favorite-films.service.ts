import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteFilm } from './entities/favorite-film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteFilmsService {
  constructor(
    @InjectRepository(FavoriteFilm)
    private readonly favoriteFilmRepository: Repository<FavoriteFilm>,
  ) {}

  async findAll(userId: number) {
    const favoriteFilms = await this.favoriteFilmRepository.find({
      where: {
        userId,
      },
      relations: {
        users: true,
        films: true,
      },
    });

    return favoriteFilms;
  }

  async findOne(userId: number, filmId: number) {
    const favoriteFilm = await this.favoriteFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    if (!favoriteFilm) {
      throw new NotFoundException('В избранных нет такого фильма!');
    }

    return favoriteFilm;
  }

  async remove(userId: number, filmId: number) {
    const favoriteFilm = await this.favoriteFilmRepository.findOne({
      where: {
        userId,
        filmId,
      },
    });

    if (!favoriteFilm)
      throw new NotFoundException('Такого фильма нет для удаления!');

    return await this.favoriteFilmRepository.remove(favoriteFilm);
  }

  async findAllWithPagination(userId, page, limit) {
    const favoriteFilms = await this.favoriteFilmRepository.find({
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

    return favoriteFilms;
  }
}
