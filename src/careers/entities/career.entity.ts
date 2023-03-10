import { ApiProperty } from '@nestjs/swagger';
import { Career } from '@prisma/client';

export class CareerEntity implements Career {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [String] })
  requirments: string[];

  @ApiProperty()
  location: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
