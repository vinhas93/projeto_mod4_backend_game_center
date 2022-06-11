import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { handleError } from 'src/utils/handle-error.util';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { notFoundError } from '../utils/not-found.util';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      title: dto.title,
      user: {
        connect: {
          id: userId,
        },
      },
      imageUrl: dto.imageUrl,
    };

    return await this.prisma.profile
      .create({
        data,
        select: {
          id: true,
          title: true,
          imageUrl: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .catch(handleError);
  }

  async findAll(userId: string) {
    const list = await this.prisma.profile.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        _count: { select: { games: true } },
      },
    });

    if (list.length === 0) {
      throw new NotFoundException('Não existem perfis cadastrados.');
    }
    return list;
  }

  async findOne(userId: string, profileId: string) {
    const list = await this.findAll(userId);

    const filtro = list.filter((profile) => profile.id === profileId);

    notFoundError(filtro, profileId);

    return filtro;
  }

  async update(
    userId: string,
    profileId: string,
    dto: UpdateProfileDto,
  ): Promise<Profile> {
    await this.findOne(userId, profileId);

    const data: Prisma.ProfileUpdateInput = {
      title: dto.title,
      imageUrl: dto.imageUrl,
    };

    return this.prisma.profile
      .update({
        where: { id: profileId },
        data,
      })
      .catch(handleError);
  }

  async delete(userId: string, profileId: string) {
    await this.findOne(userId, profileId);

    await this.prisma.profile.delete({
      where: { id: profileId },
    });
    throw new HttpException('Deletado com sucesso.', 204);
  }
}
