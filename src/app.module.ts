import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { PortifoliosModule } from './portifolios/portifolios.module';
import { ContactsModule } from './contacts/contacts.module';
import { TeamsModule } from './teams/teams.module';
import { EventsModule } from './events/events.module';
import { CareersModule } from './careers/careers.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ArticlesModule,
    PortifoliosModule,
    ContactsModule,
    TeamsModule,
    EventsModule,
    CareersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
