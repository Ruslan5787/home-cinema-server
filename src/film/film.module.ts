import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Genre } from 'src/genre/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Genre])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
