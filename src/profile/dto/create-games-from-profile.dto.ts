import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class CreateGamesFromProfileDto {
  @IsUUID()
  @ApiProperty({
    description: 'Id do perfil a ser adicionado no perfil.',
    example: 'c08d2033-25f6-444d-9570-b92e0168e007',
  })
  profileId?: string;

  @IsUUID()
  @ApiProperty({
    description: 'Id do Jogo a ser adicionado no perfil.',
    example: 'c08d2033-25f6-444d-9570-b92e0168e007',
  })
  gameId?: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Adiciona o jogo aos favoritos do perfil',
    example: 'true',
  })
  favorite?: boolean;
}
