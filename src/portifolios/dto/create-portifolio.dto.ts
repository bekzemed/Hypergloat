import { ApiProperty } from '@nestjs/swagger';

export class CreatePortifolioDto {
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
}
