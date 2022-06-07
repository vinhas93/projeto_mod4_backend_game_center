import { Module } from '@nestjs/common';
import { GamesProfilesService } from './games-profiles.service';
import { GamesProfilesController } from './games-profiles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GamesProfilesController],
  providers: [GamesProfilesService],
})
export class GamesProfilesModule {}
