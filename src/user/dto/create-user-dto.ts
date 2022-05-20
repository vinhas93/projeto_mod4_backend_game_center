import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Fulano',
  })
  name: string;
}
