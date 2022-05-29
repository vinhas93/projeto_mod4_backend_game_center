import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @Length(3, 25)
  @IsString()
  @ApiProperty({
    description: 'Nome do usuário. Deve conter de 3 a 25 letras',
    example: 'Fulano da Silva',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Email do usuário. Utilizado no login. Deve ser único.',
    example: 'fulano@gmail.com',
  })
  email: string;

  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  @ApiProperty({
    description:
      'Senha do usuário para login. Necessário letras maiúsculas e minúsculas, número ou caracter especial.',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha.',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @Length(11, 11)
  @Matches(/^[0-9]*$/, {
    message: 'CPF inválido.',
  })
  @ApiProperty({
    description: 'CPF do usuário, somente números.',
    example: '12345678910',
  })
  cpf: string;

  @ApiProperty({
    description: 'Declaração de Adm.',
    example: false,
  })
  isAdmin: boolean;
}
