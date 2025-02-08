import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Неверный формат почты.' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Поле Пароль должно содержать не менее 6 символов.',
  })
  password: string;
}
