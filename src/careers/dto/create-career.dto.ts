import { ApiProperty } from '@nestjs/swagger';

export class CreateCareerDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  requirments: string[];

  @ApiProperty()
  location: string;
}
