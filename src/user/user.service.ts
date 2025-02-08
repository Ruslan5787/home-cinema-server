import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { WatchedFilm } from 'src/watched-films/entities/watched-film.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateWatchedFilmDto } from 'src/watched-films/dto/create-watched-film.dto';
import { CreateFavoriteFilmDto } from 'src/favorite-films/dto/create-favorite-film.dto';
import { FavoriteFilm } from 'src/favorite-films/entities/favorite-film.entity';
import { WantToWatchedFilm } from 'src/want-to-watched-films/entities/want-to-watched-film.entity';
import { CreateWantToWatchedFilmDto } from 'src/want-to-watched-films/dto/create-want-to-watched-film.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(WatchedFilm)
    private readonly watchedFilm: Repository<WatchedFilm>,
    @InjectRepository(FavoriteFilm)
    private readonly favoriteFilm: Repository<FavoriteFilm>,
    @InjectRepository(WantToWatchedFilm)
    private readonly wantToWatchedFilmRepository: Repository<WantToWatchedFilm>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Данная почта занята.');
    }

    const user = new User();

    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;
    user.password = await argon2.hash(createUserDto.password);

    await this.userRepository.save(user);

    const token = this.jwtService.sign({ ...user });

    return { user, token };
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createWatchedFilm(createWatchedFilm: CreateWatchedFilmDto) {
    const isFilmWatched = await this.watchedFilm.findOne({
      where: {
        userId: createWatchedFilm.userId,
        filmId: createWatchedFilm.filmId,
      },
    });

    if (isFilmWatched) {
      throw new BadRequestException(
        'Фильм уже находится в списке просмотренных.',
      );
    }

    return await this.watchedFilm.save(createWatchedFilm);
  }

  async createFavoriteFilm(createFavoriteFilm: CreateFavoriteFilmDto) {
    const isFilmFavorite = await this.favoriteFilm.findOne({
      where: {
        userId: createFavoriteFilm.userId,
        filmId: createFavoriteFilm.filmId,
      },
    });

    if (isFilmFavorite) {
      throw new BadRequestException('Фильм уже находится в списке избранных.');
    }

    return await this.favoriteFilm.save(createFavoriteFilm);
  }

  async createWantToWatchedFilm(
    createWantToWatchedFilm: CreateWantToWatchedFilmDto,
  ) {
    const isFilm = await this.wantToWatchedFilmRepository.findOne({
      where: {
        userId: createWantToWatchedFilm.userId,
        filmId: createWantToWatchedFilm.filmId,
      },
    });

    if (isFilm) {
      throw new BadRequestException('Фильм уже находится в списке желанных.');
    }

    return await this.wantToWatchedFilmRepository.save(createWantToWatchedFilm);
  }
}
