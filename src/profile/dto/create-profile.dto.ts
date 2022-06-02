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
    example: '728e20de-e51c-4a0e-9dbf-bbb1c0c6136a',
  })
  userId: string;

  @IsUUID(undefined, { each: true })
  @ApiProperty({
    description: 'Lista com os IDs dos jogos favoritos do perfil',
    example:
      '["c08d2033-25f6-444d-9570-b92e0168e007", "e0673bf6-a645-418f-a91e-95a60c3bf9a9"]',
  })
  games: string[];
}
