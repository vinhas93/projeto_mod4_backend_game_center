import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-uset-dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário.',
  })
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os usuários.',
  })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um usuário pelo ID.',
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar dados do usuário pelo ID.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar Usuário pelo ID.',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
