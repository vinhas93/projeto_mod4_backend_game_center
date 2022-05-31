import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'Crie um novo gênero',
    example: 'Acao',
  })
  name: string;
}
