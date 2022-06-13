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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { UpdateAdminDto } from './dto/update-admin-dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('create-user')
  @Post('user')
  @ApiOperation({
    summary: 'Criar novo usuário.',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiTags('user-admin')
  @Get('user')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Listar todos os usuários.',
  })
  findAll(@LoggedUser() user: User) {
    return this.userService.findAll(user);
  }

  @ApiTags('user-admin')
  @Get('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Visualizar um usuário pelo ID.',
  })
  findOne(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.findOne(user, id);
  }

  @ApiTags('user-admin')
  @Delete('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Deletar conta de usuário por Id .',
  })
  remove(@LoggedUser() user: User, @Param('id') id: string) {
    return this.userService.remove(user, id);
  }

  @ApiTags('user-admin')
  @Patch('user/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: '(Admin) Ceder permissão de admin para usuário pelo Id.',
  })
  giveAuth(
    @LoggedUser() user: User,
    @Body() dto: UpdateAdminDto,
    @Param('id') id: string,
  ) {
    return this.userService.giveAuth(user, dto, id);
  }

  @ApiTags('user-my-account')
  @Get('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Visualizar informações da conta Logada.',
  })
  myAccount(@LoggedUser() user: User) {
    return this.userService.myAccount(user.id);
  }

  @ApiTags('user-my-account')
  @Patch('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar dados da conta logada.',
  })
  update(@LoggedUser() user: User, @Body() dto: UpdateUserDto) {
    return this.userService.update(user.id, dto);
  }

  @ApiTags('user-my-account')
  @Delete('/my-account')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar conta de usuário que está logada.',
  })
  delete(@LoggedUser() user: User) {
    return this.userService.delete(user.id);
  }
}
