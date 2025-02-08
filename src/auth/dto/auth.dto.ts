import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail({}, { message: 'Неверный формат почты.' })
  @IsNotEmpty({ message: 'Поле Почта не может быть пустой.' })
  email: string;

  @MinLength(6, {
    message: 'Поле Пароль должно содержать не менее 6 символов.',
  })
  @IsNotEmpty({ message: 'Поле Пароль не может быть пустым.' })
  password: string;
}
