import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  users: User[] = [];

  findAll() {
    return this.users;
  }

  create(createUserDto: CreateUserDto) {
    const user: User = { id: this.users.length + 1, ...createUserDto };

    this.users.push(user);

    return user;
  }
}
