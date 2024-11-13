import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: { ...createUserDto },
    });
    return this.cutUser(user);
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map((user) =>
      this.cutUser(user),
    );
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    return this.cutUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new HttpException("user doesn't exit", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('old password invalid', HttpStatus.FORBIDDEN);
    const newUser = await this.prisma.user.update({
      where: { id },
      data: { password: updateUserDto.newPassword, version: ++user.version },
    });
    return this.cutUser(newUser);
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    await this.prisma.user.delete({
      where: { id },
    });
  }

  cutUser(user: User) {
    const cutUser = {
      ...user,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt,
    };
    delete cutUser.password;
    return cutUser;
  }
}
