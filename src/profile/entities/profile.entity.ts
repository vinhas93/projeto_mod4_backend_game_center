import { User } from '../../user/entities/user.entity';
export class Profile {
  id?: string;
  title: string;
  imageUrl: string;
  userId: User;
  createdAt?: Date;
  updatedAt?: Date;
}
