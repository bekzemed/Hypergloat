import { ApiProperty } from '@nestjs/swagger';
import { Contact } from '@prisma/client';

export class ContactEntity implements Contact {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
