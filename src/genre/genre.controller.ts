import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';

@ApiTags('game-genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Criar novo Gênero.',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genreService.create(user, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros.',
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':name')
  @ApiOperation({
    summary: 'Visualizar um gênero pelo nome.',
  })
  findOne(@Param('name') name: string): Promise<Genre> {
    return this.genreService.findOne(name);
  }

  @Delete(':name')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Deletar gênero pelo nome.',
  })
  delete(@LoggedUser() user: User, @Param('name') name: string) {
    return this.genreService.delete(user, name);
  }
}
