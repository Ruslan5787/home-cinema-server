import { IsNotEmpty, IsUrl, Max, Min } from 'class-validator';
import { Genre } from 'src/genre/entities/genre.entity';
import { RestrictionAge } from 'src/restriction-age/entities/restriction-age.entity';

export class CreateFilmDto {
  @IsNotEmpty({ message: 'Поле Название не может быть пустым.' })
  name: string;

  @IsNotEmpty({ message: 'Поле Постер не может быть пустым' })
  @IsUrl(undefined, {
    message: 'Поле Постер должно содержать ссылку на изображение.',
  })
  poster: string;

  @IsNotEmpty({ message: 'Поле Жанр не может быть пустым.' })
  genre: Genre;

  @IsNotEmpty({ message: 'Поле Возраст не может быть пустым.' })
  restrictionAge: RestrictionAge;

  @IsNotEmpty({ message: 'Поле Страна не может быть пустым.' })
  production: string;

  @IsNotEmpty({ message: 'Поле Год производства не может быть пустым.' })
  @Min(1895, { message: 'Год производсвта не может быть меньше 1895 года' })
  @Max(new Date().getFullYear(), {
    message: `Год производсвта не может быть больше ${new Date().getFullYear()} года`,
  })
  yearRelease: number;

  @IsNotEmpty({ message: 'Поле Время не может быть пустым.' })
  duration: string;

  @IsNotEmpty({ message: 'Поле Описание не может быть пустым.' })
  description: string;
}
