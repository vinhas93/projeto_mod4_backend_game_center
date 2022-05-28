import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';

@Module({
  controllers: [GenderController],
  providers: [GenderService]
})
export class GenderModule {}
