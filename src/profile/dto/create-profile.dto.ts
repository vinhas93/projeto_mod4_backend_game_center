import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID, Length } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Length(3, 10)
  @ApiProperty({
    description: 'Nome do perfil. Deve conter de 3 a 10 letras',
    example: 'Fulano',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Foto do perfil. Deve ser uma URL.',
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMrqyW43W_KoTq_nsfBnwuPn0FXvcTe2Kgw&usqp=CAU',
  })
  imageUrl: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do Usuário detentor do perfil.',
    example: 'uuid',
  })
  userId: string;
}
