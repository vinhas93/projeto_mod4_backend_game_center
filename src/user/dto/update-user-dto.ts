import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches, MinLength } from 'class-validator';

class update {
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
}

export class UpdateUserDto extends PartialType(update) {}
