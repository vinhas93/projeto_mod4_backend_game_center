import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/is-admin.util';
import { notFoundError } from 'src/utils/not-found.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.user
      .create({ data, select: this.userSelect })
      .catch(handleError);
  }

  async findAll(user: User): Promise<User[]> {
    isAdmin(user);

    const list = await this.prisma.user.findMany({
      select: this.userSelect,
    });

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async findOne(user: User, id: string): Promise<User> {
    isAdmin(user);

    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    notFoundError(record, id);

    return record;
  }

  async myAccount(userId: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id: userId },
      select: this.userSelect,
    });

    return record;
  }

  async update(userId: string, dto: UpdateUserDto): Promise<User> {
    await this.myAccount(userId);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.user
      .update({
        where: { id: userId },
        data,
        select: this.userSelect,
      })
      .catch(handleError);
  }

  async delete(userId: string) {
    await this.myAccount(userId);

    await this.prisma.user.delete({
      where: { id: userId },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
}
