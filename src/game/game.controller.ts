import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/game.entity';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo Jogo.',
  })
  create(@Body() dto: CreateGameDto): Promise<Game> {
    return this.gameService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos.',
  })
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar dados de um jogo pelo ID.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGameDto): Promise<Game> {
    return this.gameService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um jogo pelo ID.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.gameService.delete(id);
  }
}
