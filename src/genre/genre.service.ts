import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { handleError } from 'src/utils/handle-error.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenreDto): Promise<Genre> {
    const data: Genre = { ...dto };

    data.name = await this.dataTreatment(data.name);

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

    if (!record) {
      throw new NotFoundException(
        `Registro com o Id '${id}' não encontrado ou é inválido. `,
      );
    }

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
    throw new HttpException('', 204);
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}