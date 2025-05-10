import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, users } from '../database/database';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    users.push(user);
    const cutUser = { ...user };
    delete cutUser.password;
    return cutUser;
  }

  findAll() {
    return users.map((user) => {
      const cutUser = { ...user };
      delete cutUser.password;
      return cutUser;
    });
  }

  findOne(id: string) {
    const user = users.find((user) => user.id == id);
    if (!user) {
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    }
    const cutUser = { ...user };
    delete cutUser.password;
    return cutUser;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = users.find((user) => user.id == id);
    if (!user)
      throw new HttpException("user doesn't exit", HttpStatus.NOT_FOUND);
    if (user.password !== updateUserDto.oldPassword)
      throw new HttpException('old password invalid', HttpStatus.FORBIDDEN);
    user.password = updateUserDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    const cutUser = { ...user };
    delete cutUser.password;
    return cutUser;
  }

  remove(id: string) {
    const indexUser = users.findIndex((user) => user.id == id);
    if (indexUser == -1)
      throw new HttpException("user doesn't exist", HttpStatus.NOT_FOUND);
    users.splice(indexUser, 1);
    return `User id=${id} deleted`;
  }
}
