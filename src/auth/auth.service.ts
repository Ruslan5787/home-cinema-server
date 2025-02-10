import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('Пользователя с такой почтой нет.');
    }

    const passwordIsMatch: boolean = await argon2.verify(
      user?.password,
      password,
    );

    if (!passwordIsMatch) {
      throw new BadRequestException('Неверный пароль.');
    }

    return user;
  }

  async validate({ email, password }: AuthPayloadDto) {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('Пользователя с такой почтой нет.');
    }

    const passwordIsMatch: boolean = await argon2.verify(
      user?.password,
      password,
    );
    if (!passwordIsMatch) {
      throw new BadRequestException('Неверный пароль.');
    }

    return user;
  }

  async login(user: IUser) {
    const { id, firstName, lastName, email, role } = user;
    return {
      id,
      firstName,
      lastName,
      email,
      role,
      token: this.jwtService.sign({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      }),
    };
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
