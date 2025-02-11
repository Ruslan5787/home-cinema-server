import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenreFilmsService } from './genre-films.service';
import { CreateGenreFilmDto } from './dto/create-genre-film.dto';
import { UpdateGenreFilmDto } from './dto/update-genre-film.dto';

@Controller('genre-films')
export class GenreFilmsController {
  constructor(private readonly genreFilmsService: GenreFilmsService) {}

  @Post()
  create(@Body() createGenreFilmDto: CreateGenreFilmDto) {
    return this.genreFilmsService.create(createGenreFilmDto);
  }

  @Get()
  findAll() {
    return this.genreFilmsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreFilmsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGenreFilmDto: UpdateGenreFilmDto,
  ) {
    return this.genreFilmsService.update(+id, updateGenreFilmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreFilmsService.remove(+id);
  }
}
