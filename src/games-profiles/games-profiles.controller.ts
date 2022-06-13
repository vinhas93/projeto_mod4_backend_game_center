import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GamesProfilesService } from './games-profiles.service';
import { CreateGamesProfileDto } from './dto/create-games-profile.dto';
import { UpdateGamesProfileDto } from './dto/update-games-profile.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller()
export class GamesProfilesController {
  constructor(private readonly gamesProfilesService: GamesProfilesService) {}

  @ApiTags('games-from-profile')
  @Post('/my-account/profile/games')
  @ApiOperation({
    summary: 'Adicionar jogo a um determinado Perfil (addGame).',
  })
  create(@Body() dto: CreateGamesProfileDto) {
    return this.gamesProfilesService.addGame(dto);
  }

  @ApiTags('homepage')
  @Get('homepage/:profileId')
  @ApiOperation({
    summary: 'Lista de Jogos de determinado perfil com genero e favoritos.',
  })
  findOne(@LoggedUser() user: User, @Param('profileId') profileId: string) {
    return this.gamesProfilesService.findGamesProfile(user.id, profileId);
  }

  @ApiTags('games-from-profile')
  @Patch('/my-account/profile/games/:gamesProfileId')
  @ApiOperation({
    summary: 'Favoritar ou desfavoritar um jogo. Usar Id do addGame. ',
  })
  update(
    @Param('gamesProfileId') id: string,
    @Body() dto: UpdateGamesProfileDto,
  ) {
    return this.gamesProfilesService.updateFav(id, dto);
  }

  @ApiTags('games-from-profile')
  @Delete('/my-account/profile/games/:gamesProfileId')
  @ApiOperation({
    summary: 'Remover jogo de um determinado Perfil. Usar Id do addGame.',
  })
  delete(@Param('gamesProfileId') id: string) {
    return this.gamesProfilesService.delete(id);
  }
}
