import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
  @IsString()
  title: string;

  @IsUrl()
  coverImageUrl: string;

  @IsString()
  description: string;

  @IsNumber()
  year: number;

  @IsNumber()
  imdbScore: number;

  @IsUrl()
  trailerYouTubeUrl: string;

  @IsUrl()
  gameplayYouTubeUrl: string;
}
