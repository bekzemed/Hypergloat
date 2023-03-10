import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: String, format: 'binary' })
  image: Express.Multer.File;

  @ApiProperty()
  location: string;

  @ApiProperty()
  date: Date;
}
