import { IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../../game/entities/game.entity';
import { Profile } from '../../profile/entities/profile.entity';

export class CreateGamesProfileDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do jogo.',
    example: 'e0673bf6-a645-418f-a91e-95a60c3bf9a9',
  })
  gameId: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID do perfil.',
    example: '245531f7-3f72-4815-86f5-51a8d494578a',
  })
  profileId: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Se o perfil é favorito.',
    example: true,
  })
  favorite: boolean;
}
