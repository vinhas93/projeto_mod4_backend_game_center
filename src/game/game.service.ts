import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { handleError } from 'src/utils/handle-error.util';
import { notFoundError } from 'src/utils/not-found.util';
import { PrismaService } from '../prisma/prisma.service';
import { isAdmin } from '../utils/is-admin.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, dto: CreateGameDto) {
    isAdmin(user);

    const data: Prisma.GameCreateInput = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
      genres: {
        connect: {
          name: this.dataTreatment(dto.genres),
        },
      },
    };

    return await this.prisma.game.create({ data }).catch(handleError);
  }

  async findAll(): Promise<Game[]> {
    const gameList = await this.prisma.game.findMany({
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        genres: {
          select: {
            name: true,
          },
        },
        imdbScore: true,
      },
    });

    if (gameList.length === 0) {
      throw new NotFoundException('Não existem jogos cadastrados.');
    }
    return gameList;
  }

  async findOne(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        coverImageUrl: true,
        genres: {
          select: {
            name: true,
          },
        },
        imdbScore: true,
        description: true,
        year: true,
        trailerYouTubeUrl: true,
        gameplayYouTubeUrl: true,
        _count: {
          select: {
            profiles: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    notFoundError(record, id);

    return record;
  }

  async update(user: User, id: string, dto: UpdateGameDto): Promise<Game> {
    isAdmin(user);

    await this.findOne(id);

    const data = {
      title: dto.title,
      coverImageUrl: dto.coverImageUrl,
      description: dto.description,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYouTubeUrl: dto.trailerYouTubeUrl,
      gameplayYouTubeUrl: dto.gameplayYouTubeUrl,
      genres: {
        connect: {
          name: this.dataTreatment(dto.genres),
        },
      },
    };

    return this.prisma.game
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(user: User, id: string) {
    isAdmin(user);

    await this.findOne(id);

    await this.prisma.game.delete({
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
