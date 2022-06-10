import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { isAdmin } from 'src/utils/is-admin.util';
import { notFoundError } from 'src/utils/not-found.util';
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
    const list = await this.prisma.genre.findMany();

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.genre.findUnique({ where: { id } });

    notFoundError(record, id);

    return record;
  }

  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findOne(id);

    await this.prisma.genre.delete({
      where: { id },
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
