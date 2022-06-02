import { User } from '../../user/entities/user.entity';
import { Game } from '../../game/entities/game.entity';
export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  userId: User;
  createdAt?: Date;
  updatedAt?: Date;
  gameProfiles?: Game[];
}
