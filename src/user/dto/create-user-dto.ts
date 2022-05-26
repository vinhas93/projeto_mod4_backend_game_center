import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 10)
  @ApiProperty({
    description: 'Nome do usuário. Deve conter de 3 a 10 letras',
    example: 'Fulano',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário.',
    example: 'fulano@gmail.com',
  })
  email: string;

  @Length(6, 15)
  @ApiProperty({
    description: 'Senha do usuário. Deve conter de 6 a 15 caracteres.',
    example: 'senhafraca',
  })
  password: string;

  @Length(11, 11)
  @IsNumber()
  @ApiProperty({
    description: 'CPF do usuário. Sem pontos e traços.',
    example: 12345678910,
  })
  cpf: number;

  @ApiProperty({
    description: 'Declaração de Adm.',
    example: false,
  })
  isAdmin: boolean;
}
