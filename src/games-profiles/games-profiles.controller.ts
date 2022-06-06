import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GamesProfilesService } from './games-profiles.service';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';

@Controller('games-profiles')
export class GamesProfilesController {
  constructor(private readonly gamesProfilesService: GamesProfilesService) {}

  @Post()
  create(@Body() createGamesProfileDto: CreateGamesProfileDto) {
    return this.gamesProfilesService.create(createGamesProfileDto);
  }

  @Get()
  findAll() {
    return this.gamesProfilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gamesProfilesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGamesProfileDto: UpdateGamesProfileDto) {
    return this.gamesProfilesService.update(+id, updateGamesProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gamesProfilesService.remove(+id);
  }
}
