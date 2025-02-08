import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { FavoriteFilmsService } from './favorite-films.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('favorite-films')
export class FavoriteFilmsController {
  constructor(private readonly favoriteFilmsService: FavoriteFilmsService) {}

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    return this.favoriteFilmsService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  findAll(@Req() req) {
    return this.favoriteFilmsService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.favoriteFilmsService.findOne(+req.user.id, +id);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.favoriteFilmsService.remove(+req.user.id, +id);
  }
}
