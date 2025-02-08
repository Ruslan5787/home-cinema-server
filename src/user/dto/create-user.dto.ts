import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2, {
    message: 'Поле Имя должно содержать не менее 2 символов.',
  })
  @Matches('^[а-яА-Я\\s]+$', undefined, {
    each: true,
    message: 'Поле Имя должно содержать только кириллицу.',
  })
  @IsNotEmpty({ message: 'Поле Имя не может быть пустым' })
  firstName: string;

  @MinLength(2, {
    message: 'Поле Фамилия должно содержать не менее 2 символов.',
  })
  @Matches('^[а-яА-Я\\s]+$', undefined, {
    each: true,
    message: 'Поле Фамилия должно содержать только кириллицу.',
  })
  @IsNotEmpty({ message: 'Поле Фамилия не может быть пустым' })
  lastName: string;

  @IsEmail({}, { message: 'Неверный формат почты.' })
  @IsNotEmpty({ message: 'Поле Почта не может быть пустым' })
  email: string;

  @MinLength(6, {
    message: 'Поле Пароль должно содержать не менее 6 символов.',
  })
  @Matches('^(?=.*[@$%^&#!*()]).+$', undefined, {
    message:
      'Поле Пароль должно содержать хотя бы один из специальных символов (@$%^&)',
  })
  @Matches('^(?=.*[A-Z])(?=.*[a-z]).+$', undefined, {
    message:
      'Поле Пароль должно содержать хотя бы одну заглавную и строчную латинскую букву',
  })
  @Matches('^(?=.*[0-9]).*$', undefined, {
    message: 'Поле Пароль должно содержать хотя бы одну цифру',
  })
  @IsNotEmpty({ message: 'Поле Пароль не может быть пустым' })
  password: string;
}
