import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @ApiProperty({
    description: 'Nome do jogo.',
    example: 'Assasins Creed: Brotherhood',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Capa do jogo.',
    example:
      'https://upload.wikimedia.org/wikipedia/pt/2/2d/Assassins_Creed_Brotherhood_capa.png',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo.',
    example:
      'Assassins Creed: Brotherhood é um jogo de ação-aventura, sendo o terceiro da franquia e sequência direta de Assassins Creed II',
  })
  description: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Ano de lançamento do jogo.',
    example: 2011,
  })
  year: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Score no IMDB',
    example: 8.7,
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Trailer do Jogo.',
    example: 'https://youtu.be/zzNs4-kRLaE',
  })
  trailerYouTubeUrl: string;

  @IsUrl()
  @ApiProperty({
    description: 'Gameplay do Jogo.',
    example: 'https://www.youtube.com/watch?v=P2tfSh0cw8E',
  })
  gameplayYouTubeUrl: string;
}
