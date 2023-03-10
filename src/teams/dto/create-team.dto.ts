import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty({ type: String, format: 'binary' })
  image: Express.Multer.File;

  @ApiProperty()
  bio: string;
}
