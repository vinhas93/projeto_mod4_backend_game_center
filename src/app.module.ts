import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, PrismaModule, GameModule, GenreModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
