import { Module } from '@nestjs/common';
import { CareersService } from './careers.service';
import { CareersController } from './careers.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CareersController],
  providers: [CareersService, PrismaService],
  imports: [PrismaModule],
})
export class CareersModule {}
