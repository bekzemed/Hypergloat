import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
  imports: [PrismaModule],
})
export class TeamsModule {}
