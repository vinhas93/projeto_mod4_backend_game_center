import { Module } from '@nestjs/common';
import { GamesProfilesService } from './games-profiles.service';
import { GamesProfilesController } from './games-profiles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GamesProfilesController],
  providers: [GamesProfilesService],
})
export class GamesProfilesModule {}
