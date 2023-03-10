import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  bio: string;
}
