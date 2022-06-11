import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';
import { notFoundError } from '../utils/not-found.util';

@Injectable()
export class GamesProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async addGame(dto: CreateGamesProfileDto) {
    const data: Prisma.GamesFromProfileCreateInput = {
      game: { connect: { id: dto.gameId } },
      profile: { connect: { id: dto.profileId } },
      favorite: dto.favorite,
    };

    return await this.prisma.gamesFromProfile
      .create({
        data,
        select: {
          game: {
            select: {
              id: true,
              title: true,
            },
          },
          profile: {
            select: {
              id: true,
              title: true,
            },
          },
          favorite: true,
        },
      })
      .catch(handleError);
  }

  async findOneProfile(profileId: string) {
    const record = await this.prisma.gamesFromProfile.findMany({
      where: { profileId },
      select: {
        id: true,
        game: {
          select: {
            title: true,
            year: true,
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
        favorite: true,
      },
    });

    notFoundError(record, profileId);

    return record;
  }

  async updateFav(id, dto: UpdateGamesProfileDto) {
    const record = await this.prisma.gamesFromProfile.findUnique({
      where: { id },
    });

    notFoundError(record, id);

    const data: Prisma.GamesFromProfileUpdateInput = {
      favorite: dto.favorite,
    };

    return this.prisma.gamesFromProfile
      .update({
        where: { id },
        data,
      })
      .catch(handleError);
  }

  async delete(id) {
    const record = await this.prisma.gamesFromProfile.findUnique({
      where: { id },
    });

    notFoundError(record, id);

    await this.prisma.gamesFromProfile.delete({
      where: { id },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
}
