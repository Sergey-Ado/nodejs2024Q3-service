import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);
    const user = await this.prisma.user.create({
      data: { login: signUpDto.login, password: hash },
    });
    const { id, login } = user;
    const tokens = await this.signToken(id, login);
    return { id, ...tokens };
  }

  async login(logInDto: LogInDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: logInDto.login },
    });
    if (!user || !(await argon.verify(user.password, logInDto.password))) {
      throw new HttpException('Wrong login or password', HttpStatus.FORBIDDEN);
    }

    return await this.signToken(user.id, user.login);
  }

  async signToken(userId: string, login: string) {
    const payload = { userId, login };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
    };
  }
}
