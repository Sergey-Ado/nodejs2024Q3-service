import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { LogInDto } from './dto/login.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async signup(signUpDto: SignUpDto) {
    const hash = await argon.hash(signUpDto.password);
    const user = await this.prisma.user.create({
      data: { login: signUpDto.login, password: hash },
    });
    const { id, login } = user;
    const tokens = await this.genTokens(id, login);
    return { id, ...tokens };
  }

  async login(logInDto: LogInDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: logInDto.login },
    });
    if (!user || !(await argon.verify(user.password, logInDto.password))) {
      throw new HttpException('Wrong login or password', HttpStatus.FORBIDDEN);
    }

    return await this.genTokens(user.id, user.login);
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new HttpException(
        'No refreshToken in body',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const payload = await this.jwt.verifyAsync(refreshDto.refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const token = await this.genTokens(payload.userId, payload.login);
      return token;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
    }
  }

  async genTokens(userId: string, login: string) {
    const payload = { userId, login };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
