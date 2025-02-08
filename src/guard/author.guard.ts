import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FavoriteFilmsService } from 'src/favorite-films/favorite-films.service';
import { WantToWatchedFilmsService } from 'src/want-to-watched-films/want-to-watched-films.service';
import { WatchedFilmsService } from 'src/watched-films/watched-films.service';

import { Request, Response } from 'express';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly watchedFilms: WatchedFilmsService,
    private readonly favoriteFilms: FavoriteFilmsService,
    private readonly wantToWatchedFilms: WantToWatchedFilmsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { id, type } = request.params;

    let entity;
    const user: any = request.user;

    switch (type) {
      case 'watched-film':
        entity = await this.watchedFilms.findOne(user.id, +id);
        break;

      case 'favorite-film':
        entity = await this.favoriteFilms.findOne(user.id, +id);
        break;

      case 'want-to-watched-film':
        entity = await this.wantToWatchedFilms.findOne(user.id, +id);
        break;

      default:
        throw new NotFoundException('Что-то пошло не так...');
    }

    if (entity && user && entity.userId == user.id) {
      return true;
    }

    return false;
  }
}
