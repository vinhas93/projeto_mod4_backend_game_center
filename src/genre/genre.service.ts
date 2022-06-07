import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from 'src/utils/handle-error.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { Prisma } from '@prisma/client';
import { notFoundError } from 'src/utils/not-found.util';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto): Promise<Genre> {
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

  async update(id: string, dto: UpdateGenreDto): Promise<Genre> {
    await this.findOne(id);

    const data: Partial<Genre> = { ...dto };

    data.name = await this.dataTreatment(data.name);

    return this.prisma.genre
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id: string) {
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
