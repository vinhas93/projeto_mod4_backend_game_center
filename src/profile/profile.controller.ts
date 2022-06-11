import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil para o usuário logado.',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateProfileDto) {
    return this.profileService.create(user.id, dto);
  }

  @Get('/list')
  @ApiOperation({
    summary: 'Listar todos os perfis do usuário logado.',
  })
  findAll(@LoggedUser() user: User) {
    return this.profileService.findAll(user.id);
  }

  @Get(':profileId')
  @ApiOperation({
    summary: 'Visualizar um perfil do usuário logado pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('profileId') id: string) {
    return this.profileService.findOne(user.id, id);
  }

  @Patch(':profileId')
  @ApiOperation({
    summary: 'Editar um perfil do usuário logado pelo ID.',
  })
  update(
    @LoggedUser() user: User,
    @Param('profileId') profileId: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, profileId, dto);
  }

  @Delete(':profileId')
  @ApiOperation({
    summary: 'Deletar um perfil do usuário logado pelo ID.',
  })
  delete(@LoggedUser() user: User, @Param('profileId') profileId: string) {
    return this.profileService.delete(user.id, profileId);
  }
}
