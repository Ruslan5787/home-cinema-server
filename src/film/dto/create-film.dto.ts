import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
} from 'class-validator';
import { log } from 'console';
import { Genre } from 'src/genre/entities/genre.entity';
import { RestrictionAge } from 'src/restriction-age/entities/restriction-age.entity';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty({ message: 'Поле Название не может быть пустым.' })
  @Length(2, 50, { message: 'Название должно быть от 1 до 50 символов' })
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty({ message: 'Поле Постер не может быть пустым' })
  @IsUrl(undefined, {
    message: 'Поле Постер должно содержать ссылку на изображение.',
  })
  @Transform(({ value }) => value.trim())
  poster: string;

  @IsNotEmpty({ message: 'Поле Жанр не может быть пустым.' })
  genre: Genre;

  @IsNotEmpty({ message: 'Поле Возраст не может быть пустым.' })
  restrictionAge: RestrictionAge;

  @IsString({ message: 'Поле Страна должна быть строкой.' })
  @IsNotEmpty({ message: 'Поле Страна не может быть пустым.' })
  @Transform(({ value }) => value.trim())
  production: string;

  @IsInt({ message: 'Поле Год производства должно содержать число.' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Поле Год производства не может быть пустым.' })
  @Min(1895, { message: 'Год производсвта не может быть меньше 1895 года' })
  @Max(new Date().getFullYear(), {
    message: `Год производсвта не может быть больше ${new Date().getFullYear()} года`,
  })
  yearRelease: number;

  @IsInt({ message: 'Поле Время должно содержать число.' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'Поле Время не может быть пустым.' })
  @Min(5, { message: 'Продолжительности фильма не может быть меньше 5 минут' })
  @Max(600, {
    message: `Продолжительности фильма не может быть больше 10 часов`,
  })
  duration: number;

  @IsString()
  @IsNotEmpty({ message: 'Поле Описание не может быть пустым.' })
  @Transform(({ value }) => value.trim())
  description: string;
}
