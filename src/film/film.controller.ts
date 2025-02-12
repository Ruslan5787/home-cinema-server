import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
  Patch,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { FilmService } from './film.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateFilmDto } from './dto/update-film.dto';
import { IGenre } from 'src/types/types';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get('pagination')
  findAllWithPagination(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    return this.filmService.findAllWithPagination(+page, limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmService.create(createFilmDto);
  }

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get('/search')
  searchFilms(@Query('string') string: string) {
    return this.filmService.searchFilms(string);
  }

  @Get('/searchFilmsAboutGenre')
  getFilmsAboutGenre(@Query('genre') genre: string) {
    return this.filmService.getFilmsAboutGenre(genre);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmService.update(+id, updateFilmDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.filmService.remove(+id);
  }

  @Put(':filmId/genres')
  async addGenresToFilm(
    @Param('filmId') filmId: number,
    @Body() genres: IGenre[],
  ) {
    try {
      const updatedFilm = await this.filmService.addGenresToFilm(
        filmId,
        genres,
      );
      return updatedFilm;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('/films/:filmId/genres')
  findAllFilmGenres(@Param('filmId') filmId: number) {
    return this.filmService.findAllFilmGenres(filmId);
  }
}
