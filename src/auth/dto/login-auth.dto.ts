import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class LoginAuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginAuthResponseType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  role: Role;
}
