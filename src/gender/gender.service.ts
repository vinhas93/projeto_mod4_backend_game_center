import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Gender } from './entities/gender.entity';

@Injectable()
export class GenderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGenderDto): Promise<Gender> {
    const data: Gender = { ...dto };

    data.name = await this.dataTreatment(data.name);

    return this.prisma.gender.create({ data }).catch(this.handleError);
  }

  async findAll(): Promise<Gender[]> {
    const list = await this.prisma.gender.findMany();

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async findOne(id: string) {
    const record = await this.prisma.gender.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(
        `Registro com o Id '${id}' não encontrado ou é inválido. `,
      );
    }

    return record;
  }

  async update(id: string, dto: UpdateGenderDto): Promise<Gender> {
    await this.findOne(id);

    const data: Partial<Gender> = { ...dto };

    data.name = await this.dataTreatment(data.name);

    return this.prisma.gender
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.gender.delete({
      where: { id },
    });
    throw new HttpException('', 204);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();

    throw new BadRequestException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação.',
    );
  }

  dataTreatment(data: string) {
    return data
      .normalize('NFD')
      .replace(/[^a-zA-Zs]/g, '')
      .toLowerCase();
  }
}
