import { PartialType } from '@nestjs/swagger';
import { CreateGamesProfileDto } from './create-games-profile.dto';

export class UpdateGamesProfileDto extends PartialType(CreateGamesProfileDto) {}
