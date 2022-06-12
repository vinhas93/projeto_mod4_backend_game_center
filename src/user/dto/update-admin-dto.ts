import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateAdminDto {
  @IsBoolean()
  @ApiProperty({
    description: 'Autorização de Administrador.',
    example: false,
  })
  isAdmin: boolean;
}
