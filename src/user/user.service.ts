import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './entities/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-uset-dto';
import * as bcrypt from 'bcrypt';

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
      .catch(this.handleError);
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: this.userSelect,
    });
  }

  async findOne(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado. `);
    }

    return record;
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findOne(id);

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
        where: { id },
        data,
        select: this.userSelect,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();

    if (!lastErrorLine) {
      console.log(error);
    }

    throw new BadRequestException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação.',
    );
  }
}
