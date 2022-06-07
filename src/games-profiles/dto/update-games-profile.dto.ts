import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

class FavUpdate {
  @IsBoolean()
  @ApiProperty({
    description: 'Se o perfil é favorito.',
    example: true,
  })
  favorite: boolean;
}

export class UpdateGamesProfileDto extends PartialType(FavUpdate) {}
