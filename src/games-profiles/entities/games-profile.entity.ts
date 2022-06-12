import { Game } from '../../game/entities/game.entity';
import { Profile } from '../../profile/entities/profile.entity';
export class GamesProfile {
  gameId: Game;
  profileId: Profile;
  favorite: boolean;
}
