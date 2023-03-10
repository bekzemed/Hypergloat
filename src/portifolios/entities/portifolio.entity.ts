import { ApiProperty } from '@nestjs/swagger';
import { Portifolio } from '@prisma/client';

export class PortifolioEntity implements Portifolio {
  @ApiProperty()
  id: number;

  @ApiProperty()
  projectName: string;

  @ApiProperty()
  projectCategory: string;

  @ApiProperty({ type: [String] })
  projectTags: string[];

  @ApiProperty()
  projectDescription: string;

  @ApiProperty({ type: [String] })
  testimonies: string[];

  @ApiProperty()
  coverImage: string;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
