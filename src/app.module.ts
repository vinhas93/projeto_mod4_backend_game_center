import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GameModule } from './game/game.module';
import { GenderModule } from './gender/gender.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, PrismaModule, GameModule, GenderModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
