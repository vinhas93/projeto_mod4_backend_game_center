import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Gender } from './entities/gender.entity';

@ApiTags('gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo Gênero.',
  })
  create(@Body() dto: CreateGenderDto): Promise<Gender> {
    return this.genderService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os Gêneros.',
  })
  findAll(): Promise<Gender[]> {
    return this.genderService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um gênero pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<Gender> {
    return this.genderService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar gênero pelo ID.',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateGenderDto,
  ): Promise<Gender> {
    return this.genderService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar gênero pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.genderService.delete(id);
  }
}
