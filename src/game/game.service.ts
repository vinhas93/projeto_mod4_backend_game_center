import {
  HttpException,
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

  async findAll(): Promise<Game[]> {
    const list = await this.prisma.game.findMany();

    if (list.length === 0) {
      throw new NotFoundException('Não existem gêneros cadastrados.');
    }
    return list;
  }

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o Id '${id}' não encontrado. `);
    }

    return record;
  }

  async update(id: string, dto: UpdateGameDto): Promise<Game> {
    await this.findOne(id);

    const data: Partial<Game> = { ...dto };

    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.game.delete({
      where: { id },
    });
    throw new HttpException('', 204);
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1].trim();
    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação.',
    );
  }
}
