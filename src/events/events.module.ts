import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaService],
  imports: [PrismaModule],
})
export class EventsModule {}
