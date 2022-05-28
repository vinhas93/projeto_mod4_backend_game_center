import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateGameDto): Promise<Game> {
    const data: Game = { ...dto };

    return this.prisma.game.create({ data }).catch(this.handleError);
  }

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async findOne(id: string) {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado. `);
    }

    return record;
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findById(id);

    const data: Partial<Game> = { ...dto };

    try {
      return this.prisma.game.update({
        where: { id },
        data,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string) {
    await this.findById(id);

    await this.prisma.game.delete({
      where: { id },
    });
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado. `);
    }

    return record;
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('/n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação.',
    );
  }
}
