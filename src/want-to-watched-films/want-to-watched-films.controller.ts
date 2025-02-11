import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { WantToWatchedFilmsService } from './want-to-watched-films.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorGuard } from 'src/guard/author.guard';

@Controller('want-to-watched-films')
export class WantToWatchedFilmsController {
  constructor(
    private readonly wantToWatchedFilmsService: WantToWatchedFilmsService,
  ) {}

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    return this.wantToWatchedFilmsService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.wantToWatchedFilmsService.findAll(+req.user.id);
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.wantToWatchedFilmsService.findOne(+req.user.id, +id);
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.wantToWatchedFilmsService.remove(+req.user.id, +id);
  }
}
