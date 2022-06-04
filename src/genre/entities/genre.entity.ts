import { Game } from '../../game/entities/game.entity';
export class Genre {
  id?: string;
  name: string;
  games?: Game[];
  createdAt?: Date;
  updatedAt?: Date;
}
