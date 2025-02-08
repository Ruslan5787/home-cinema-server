import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateWatchedFilmDto } from 'src/watched-films/dto/create-watched-film.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFavoriteFilmDto } from 'src/favorite-films/dto/create-favorite-film.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('watched-film')
  @UseGuards(new JwtAuthGuard())
  createWatchedFilm(@Body() createWatchedFilm: CreateWatchedFilmDto) {
    return this.userService.createWatchedFilm(createWatchedFilm);
  }

  @Post('favorite-film')
  @UseGuards(new JwtAuthGuard())
  createFavoriteFilm(@Body() createFavoriteFilm: CreateFavoriteFilmDto) {
    return this.userService.createFavoriteFilm(createFavoriteFilm);
  }

  @Post('want-to-watched-film')
  @UseGuards(new JwtAuthGuard())
  createWantToWatchedFilm(
    @Body() createWantToWatchedFilm: CreateFavoriteFilmDto,
  ) {
    return this.userService.createWantToWatchedFilm(createWantToWatchedFilm);
  }
}
