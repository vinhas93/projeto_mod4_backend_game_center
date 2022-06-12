import { Profile } from '../../profile/entities/profile.entity';
import { Genre } from '../../genre/entities/genre.entity';
export class Game {
  id?: string;
  title: string;
  coverImageUrl?: string;
  description?: string;
  year?: number;
  imdbScore?: number;
  trailerYouTubeUrl?: string;
  gameplayYouTubeUrl?: string;
  genres?: Genre[];
  profiles?: Profile[];
}
