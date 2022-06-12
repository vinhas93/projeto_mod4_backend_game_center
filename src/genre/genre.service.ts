import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/is-admin.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateGenreDto): Promise<Genre> {
    isAdmin(user);

    const data: Prisma.GenreCreateInput = { name: dto.name };

    data.name = this.dataTreatment(data.name);

    return this.prisma.genre.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Genre[]> {
    const list = await this.prisma.genre.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            games: true,
          },
        },
      },
    });

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async findOne(name: string) {
    name = this.dataTreatment(name);
    const record = await this.prisma.genre.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        games: { include: { genres: { select: { name: true } } } },
      },
    });

    if (!record) {
      throw new NotFoundException(`Gênero ${name} não encontrado.`);
    }

    return record;
  }

  async delete(user: User, name: string) {
    isAdmin(user);

    await this.findOne(name);

    await this.prisma.genre.delete({
      where: { name },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
