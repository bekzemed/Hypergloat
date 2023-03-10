import { ApiProperty } from '@nestjs/swagger';
import { TeamMember } from '@prisma/client';

export class TeamEntity implements TeamMember {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
