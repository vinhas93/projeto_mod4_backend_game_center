import { Module } from '@nestjs/common';
import { GamesProfilesService } from './games-profiles.service';
import { GamesProfilesController } from './games-profiles.controller';

@Module({
  controllers: [GamesProfilesController],
  providers: [GamesProfilesService]
})
export class GamesProfilesModule {}
