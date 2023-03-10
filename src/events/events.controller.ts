import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, Role } from '@prisma/client';
import { EventEntity } from './entities/event.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

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
  @ApiOperation({ summary: 'Create event.' })
  @ApiOkResponse({ type: EventEntity })
  @ApiCreatedResponse({ description: 'Create event.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
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
  ): Promise<Event> {
    return this.eventsService.update(+id, updateEventDto);
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
