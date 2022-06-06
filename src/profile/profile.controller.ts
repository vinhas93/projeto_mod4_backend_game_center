import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil de usuário.',
  })
  create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Get('/list/:userId')
  @ApiOperation({
    summary: 'Listar todos os perfis de determinado usuário.',
  })
  findAll(@Param('userId') userId: string) {
    return this.profileService.findAll(userId);
  }

  @Get(':profileId')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID.',
  })
  findOne(@Param('profileId') profileId: string) {
    return this.profileService.findOne(profileId);
  }

  @Patch(':profileId')
  @ApiOperation({
    summary:
      'Editar um perfil pelo ID. Apenas o título e a foto do perfil são editáveis.',
  })
  update(@Param('profileId') profileId: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(profileId, dto);
  }

  @Delete(':profileId')
  @ApiOperation({
    summary: 'Deletar um perfil pelo ID.',
  })
  delete(@Param('profileId') profileId: string) {
    return this.profileService.delete(profileId);
  }
}
