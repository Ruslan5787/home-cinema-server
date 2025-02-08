import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { WatchedFilmsService } from './watched-films.service';
import { CreateWatchedFilmDto } from './dto/create-watched-film.dto';
import { UpdateWatchedFilmDto } from './dto/update-watched-film.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('watched-films')
export class WatchedFilmsController {
  constructor(private readonly watchedFilmsService: WatchedFilmsService) {}

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    return this.watchedFilmsService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createWatchedFilmDto: CreateWatchedFilmDto) {
    return this.watchedFilmsService.create(createWatchedFilmDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Req() req) {
    return this.watchedFilmsService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.watchedFilmsService.findOne(+req.user.id, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWatchedFilmDto: UpdateWatchedFilmDto,
  ) {
    return this.watchedFilmsService.update(+id, updateWatchedFilmDto);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.watchedFilmsService.remove(+req.user.id, +id);
  }
}
