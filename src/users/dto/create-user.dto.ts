import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    type: String,
    enum: Role,
    default: Role.EDITOR,
  })
  role: Role;
}
