import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Event, Role } from '@prisma/client';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/event.entity';
import { EventsService } from './events.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { Express } from 'express';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /*
  *
  *
  create event
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create event.' })
  @ApiOkResponse({ type: EventEntity })
  @ApiCreatedResponse({ description: 'Create event.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.eventsService.create({
      ...createEventDto,
      image: files[0],
    });
  }

  /*
  *
  *
  get all event
  *
  *
  */
  @Get()
  @ApiOperation({ summary: 'Get event.' })
  @ApiOkResponse({ type: [EventEntity] })
  @ApiResponse({ status: 200, description: 'get event.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Event[]> {
    return this.eventsService.findAll();
  }

  /*
  *
  *
  get a single event
  *
  *
  */
  @Get(':id')
  @ApiOperation({ summary: 'Get event.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: EventEntity })
  @ApiResponse({ status: 200, description: 'get a single event.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findOne(+id);
  }

  /*
  *
  *
  update event
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update event.' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: EventEntity })
  @ApiResponse({ status: 200, description: 'update a single event.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.eventsService.update(+id, {
      ...updateEventDto,
      image: files[0],
    });
  }

  /*
  *
  *
  delete event
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete event.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: EventEntity })
  @ApiResponse({ status: 200, description: 'delete a single event.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<Event> {
    return this.eventsService.remove(+id);
  }
}
