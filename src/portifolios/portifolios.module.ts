import { Module } from '@nestjs/common';
import { PortifoliosService } from './portifolios.service';
import { PortifoliosController } from './portifolios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PortifoliosController],
  providers: [PortifoliosService, PrismaService],
  imports: [PrismaModule],
})
export class PortifoliosModule {}
