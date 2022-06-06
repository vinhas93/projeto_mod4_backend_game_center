import { Injectable } from '@nestjs/common';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';

@Injectable()
export class GamesProfilesService {
  create(createGamesProfileDto: CreateGamesProfileDto) {
    return 'This action adds a new gamesProfile';
  }

  findAll() {
    return `This action returns all gamesProfiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gamesProfile`;
  }

  update(id: number, updateGamesProfileDto: UpdateGamesProfileDto) {
    return `This action updates a #${id} gamesProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} gamesProfile`;
  }
}
