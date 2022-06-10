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
    summary: 'Criar novo perfil de usuário.',
  })
  create(@Body() dto: CreateProfileDto) {
    return this.profileService.create(dto);
  }

  @Get('/list/:userId')
  @ApiOperation({
    summary: 'Listar todos os perfis de determinado usuário.',
  })
  findAll(@Param('userId') id: string) {
    return this.profileService.findAll(id);
  }

  @Get(':profileId')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID.',
  })
  findOne(@Param('profileId') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':profileId')
  @ApiOperation({
    summary:
      'Editar um perfil pelo ID. Apenas o título e a foto do perfil são editáveis.',
  })
  update(@Param('profileId') id: string, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(id, dto);
  }

  @Delete(':profileId')
  @ApiOperation({
    summary: 'Deletar um perfil pelo ID.',
  })
  delete(@Param('profileId') id: string) {
    return this.profileService.delete(id);
  }
}
