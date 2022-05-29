import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo perfil de usuário.',
  })
  create(@Body() dto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis.',
  })
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um perfil pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<Profile> {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil pelo ID.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um perfil pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.profileService.delete(id);
  }
}
